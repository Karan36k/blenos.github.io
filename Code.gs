/**
 * BLENOS Design website lead form -> Google Sheets
 *
 * Setup:
 * 1. Open the target spreadsheet.
 * 2. Extensions -> Apps Script.
 * 3. Replace the editor contents with this file and save.
 * 4. Deploy -> New deployment -> Select type: Web app.
 * 5. Execute as: Me. Who has access: Anyone.
 * 6. Deploy, authorize access, then copy the Web app URL.
 * 7. Paste that URL into SITE_CONFIG.googleScriptUrl in index.html.
 *
 * The script writes into worksheet gid 0. The HTML response confirms the write
 * to the website through a nonce-bound postMessage (no blind no-cors success).
 */
const SHEET_ID = "1ZPRQpKwjO81h2ka0kwIBxV3Ta9mdCKjH3iUcfZ4Z0EY";
const SHEET_GID = 0;
const HEADERS = ["Submitted At", "Name", "Phone", "Email", "Location", "Requirement"];

function doPost(e) {
  let requestId = "";
  try {
    const payload = (e && e.parameter) || {};
    requestId = clean_(payload.requestId, 100);
    if (!/^[a-f0-9-]{20,100}$/i.test(requestId)) throw new Error("Invalid request reference.");

    // A filled honeypot indicates a bot. Return a failure so the site never
    // presents an unrecorded submission as successful.
    if (clean_(payload.website, 200)) throw new Error("Submission rejected.");
    const name = clean_(payload.name);
    const phone = clean_(payload.phone);
    const email = clean_(payload.email);
    const location = clean_(payload.location);
    const requirement = clean_(payload.requirement);
    if (!name || !phone || !email || !location || !requirement) throw new Error("Please complete all required fields.");
    if (name.length > 120 || phone.length > 30 || email.length > 254 || location.length > 120 || requirement.length > 3000) {
      throw new Error("One or more fields are too long.");
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("Please enter a valid email address.");
    if (!/^[0-9+() .-]{8,30}$/.test(phone)) throw new Error("Please enter a valid phone number.");

    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    const sheet = spreadsheet.getSheetById(SHEET_GID);
    if (!sheet) throw new Error("The target worksheet (gid 0) was not found.");

    // Add headers above any pre-existing content instead of replacing it.
    const firstRow = sheet.getRange(1, 1, 1, HEADERS.length).getDisplayValues()[0].map(value => String(value).trim());
    if (!HEADERS.every((header, index) => firstRow[index].toLowerCase() === header.toLowerCase())) {
      sheet.insertRowBefore(1);
      sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    }

    sheet.appendRow([
      new Date(),
      safeCell_(name),
      safeCell_(phone),
      safeCell_(email),
      safeCell_(location),
      safeCell_(requirement)
    ]);

    return resultPage_(requestId, true, "Thank you. Your enquiry has been received.");
  } catch (err) {
    console.error(err);
    return resultPage_(requestId, false, err && err.message ? err.message : "We couldn't save your enquiry.");
  }
}

function clean_(value, limit) {
  return String(value == null ? "" : value).trim().slice(0, limit || 5000);
}

// Prevent submitted text from being interpreted as a spreadsheet formula.
function safeCell_(value) {
  return /^[\s\u0000-\u001f]*[=+\-@]/.test(value) ? "'" + value : value;
}

function resultPage_(requestId, ok, message) {
  const response = JSON.stringify({ requestId: requestId, ok: ok, message: message })
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
  const html = "<!doctype html><html><head><meta charset='utf-8'></head><body><script>" +
    // Apps Script may wrap the HTML response in its own iframe. Post to the
    // top-level page so the website can receive the acknowledgement.
    "window.top.postMessage(" + response + ", '*');" +
    "</script>Submission processed.</body></html>";
  return HtmlService.createHtmlOutput(html).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
