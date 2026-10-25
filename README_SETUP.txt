BLENOS DESIGN WEBSITE — SETUP AND DEPLOYMENT

Files:
- index.html: responsive single-page website
- Code.gs: Google Apps Script receiver for form submissions
- CNAME: GitHub Pages custom domain (blenos.com)
- .gitignore: excludes local and secret files

IMPORTANT: The form will not write to your Google Sheet until you deploy Code.gs and configure the Web App URL in index.html. It only shows success after the script confirms the row was appended.

CONNECT THE FORM TO YOUR SHEET
1. Open the target spreadsheet:
   https://docs.google.com/spreadsheets/d/1ZPRQpKwjO81h2ka0kwIBxV3Ta9mdCKjH3iUcfZ4Z0EY/edit?gid=0#gid=0
2. Sign in, then choose Extensions -> Apps Script.
3. Replace the project code with Code.gs and save.
4. Choose Deploy -> New deployment -> Web app.
5. Set Execute as: Me. Set Who has access: Anyone (required so the public website can submit enquiries).
6. Deploy and complete Google's authorization flow yourself.
7. Copy the deployed Web App URL, which looks like:
   https://script.google.com/macros/s/DEPLOYMENT_ID/exec
8. In index.html, update `SITE_CONFIG.googleScriptUrl` with that URL. Keep the URL private until deployment is intentional; do not add OAuth credentials or tokens to the site.
9. Save and publish the site. Test with a clearly named test enquiry, confirm it appears in the first worksheet (gid 0), and remove only that test row afterward.

The script appends submissions to worksheet gid 0, records the server-side submission time, and adds headers above existing content if the header row is blank. It validates required fields and protects text from formula injection. Do not change the sheet's sharing permissions for this setup.

CONTENT / CONTACT
- Brand: BLENOS Design
- Email: blenosindia@gmail.com
- Phone: +91 85560 59020 (update `SITE_CONFIG.phone` in index.html; click-to-call is derived automatically)
- Locations: Delhi, Noida, Gurugram, Full NCR, Bengaluru*, Hyderabad*
- Offer: Free online consultation + expert site visit for ₹299

The website uses remote Unsplash photos and Google Fonts, so those elements need an internet connection. Replace the sample photos with your own project photography when available. The gallery uses illustrative imagery and does not represent claimed BLENOS projects.

GITHUB PAGES AND DOMAIN
1. Create or select a public GitHub repository intended for this website. Only publish after reviewing the files for private material.
2. Push the site files, including CNAME, to the repository's main branch.
3. In repository Settings -> Pages, publish from Deploy from a branch, branch `main`, folder `/ (root)`.
4. In Custom domain, enter `blenos.com`; wait for DNS check and certificate provisioning, then enable Enforce HTTPS.
5. In your DNS manager, inspect existing records first. Keep all unrelated email, verification and TXT records. For apex `@`, GitHub Pages documents four A records: 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153. Optional AAAA records: 2606:50c0:8000::153, 2606:50c0:8001::153, 2606:50c0:8002::153, 2606:50c0:8003::153. For `www`, create a CNAME to the verified GitHub Pages hostname for the account (for example, `USERNAME.github.io`). Do not add records until existing DNS is inspected and conflicts are resolved.
6. Set `www.blenos.com` to redirect to `blenos.com` using the registrar's forwarding feature after GitHub Pages DNS validation.

The repository URL, GitHub username/Pages hostname, DNS zone, and deployed Apps Script endpoint still need to be verified in the relevant accounts. No deployment is complete until the public site, custom domain, HTTPS and form flow are verified.
