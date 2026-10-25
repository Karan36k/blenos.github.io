BLENOS DESIGN WEBSITE — SETUP AND DEPLOYMENT

Files:
- index.html: responsive single-page website
- assets/blenos-logo.png: selected transparent BLENOS Design logo from Downloads
- Code.gs: Google Apps Script receiver for form submissions
- CNAME: GitHub Pages custom domain (blenos.com)
- .gitignore: excludes local and secret files

GOOGLE SHEETS FORM STATUS
The form endpoint is deployed and configured in index.html. A synthetic test enquiry was verified in the private Leads worksheet and then removed; the sheet now contains the headers only. A deliberately invalid request returned the expected validation error and did not append a row.

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
8. In index.html, update `SITE_CONFIG.googleScriptUrl` if the deployment URL changes. The endpoint is intentionally public so website visitors can submit enquiries; it is not a credential. Never add OAuth credentials or tokens to the site.
9. The current deployment ID is AKfycbwAXm7efC3ovXSKUJgx8U4GlNZjk7BC9n5SUb12i-0IIg2sozJSLW7MGIoejg73zAE9. Use Deploy -> Manage deployments to update this deployment when publishing code changes.

The script appends submissions to worksheet gid 0, records the server-side submission time, and adds headers above existing content if the header row is blank. It validates required fields and protects text from formula injection. Do not change the sheet's sharing permissions for this setup.

CONTENT / CONTACT
- Brand: BLENOS Design
- Email: blenosindia@gmail.com
- Phone: +91 85560 59020 (update `SITE_CONFIG.phone` in index.html; click-to-call is derived automatically)
- Locations: Delhi, Noida, Gurugram, Full NCR, Bengaluru*, Hyderabad*
- Offer: Free online consultation + expert site visit for ₹299

The website uses remote Unsplash photos and Google Fonts, so those elements need an internet connection. Replace the sample photos with your own project photography when available. The gallery uses illustrative imagery and does not represent claimed BLENOS projects.

The visual theme uses a dark bronze and champagne palette, subtle reveal and pointer animations, a reading progress line, and a one-time consultation offer dialog. Animations follow the visitor's reduced-motion setting; the offer can be closed or reopened from its hero card.

GITHUB PAGES AND DOMAIN
1. Create or select a public GitHub repository intended for this website. Only publish after reviewing the files for private material and receiving approval to make the files public.
2. Push the site files, including CNAME, to the repository's main branch.
3. In repository Settings -> Pages, publish from Deploy from a branch, branch `main`, folder `/ (root)`.
4. In Custom domain, enter `blenos.com`; wait for DNS check and certificate provisioning, then enable Enforce HTTPS.
5. Before changing DNS, inspect existing records. The current GoDaddy apex A record points to WebsiteBuilder, and `www` points to the apex; changing these will replace the current site target. Keep unrelated records, including `_domainconnect` and `_dmarc`. Make DNS changes only after approval. For apex `@`, use GitHub Pages A records 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153. Optional AAAA records: 2606:50c0:8000::153, 2606:50c0:8001::153, 2606:50c0:8002::153, 2606:50c0:8003::153. For `www`, use a CNAME to Karan36k.github.io; GitHub Pages can redirect `www` to the primary apex domain.

The GitHub Pages repository is https://github.com/Karan36k/blenos.github.io and the Pages hostname is Karan36k.github.io. The current GoDaddy site is still live until the approved DNS cutover is completed. After the repository is pushed, enable Pages from `main` and root, then verify the custom domain and HTTPS.
