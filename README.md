# Sundara Krishnan S — portfolio site

A fast, responsive, single-page portfolio site in plain HTML, CSS and JavaScript. No npm, paid builder, database, recurring subscription or build step.

## Preview on your computer

Open `index.html` in Chrome or Edge. Internet access is needed only for the optional Google Fonts; the site will still work with system fonts offline.

## Publish completely free with GitHub Pages

1. Log into GitHub. Note your **exact GitHub username** (example: `myusername`).
2. Create a **Public** repository with the exact name `myusername.github.io` (replace with YOUR username). Do not tick "Add a README" if you plan to upload this whole folder.
3. Open the repository, choose **Add file → Upload files**, and upload the CONTENTS of this folder to the repository root: `index.html`, `styles.css`, `script.js`, `favicon.svg`, `.nojekyll` and `README.md`. You can also upload those files by drag-and-drop. Some systems hide `.nojekyll`; it is optional for this plain HTML site.
4. Select **Commit changes**.
5. Go to **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: main → Folder: /(root) → Save**.
6. Your site address is `https://myusername.github.io/`. Publishing may take a few minutes.

If you instead name the repository `sundara-portfolio`, the site address becomes `https://myusername.github.io/sundara-portfolio/` after enabling Pages. These files use relative paths, so both formats work.

GitHub Pages is available free with **public** repositories on GitHub Free; the website's source files will be public. Do not upload API keys, private client data, unpublished reports, confidential screenshots or personal documents.

## Keep it updated without coding tools

Use the GitHub website to click a file → pencil icon → edit → **Commit changes**. GitHub Pages republishes your latest committed version automatically.

- **Headline/about/experience/case studies/metrics/email:** edit `index.html` (use Ctrl+F to find the text).
- **Design/colors/fonts/mobile layout:** edit `styles.css`. Main colors at the very top under `:root`.
- **Mobile menu / copy-email functionality:** edit `script.js`.
- **Favicon:** edit `favicon.svg`.
- **Resume:** the current button opens an email request. If you decide to share a public PDF, add `resume.pdf` and change the `Request my résumé` link in `index.html` to `href="resume.pdf"` with `download` if desired. Remove private contact info first.
- **LinkedIn:** once you know your profile URL, add a link near the contact email. Don't insert a guessed URL.

Monthly 5-minute maintenance: check the public site on mobile, make sure the email link works, and update recent role dates/case studies. Publish case-study metrics only if you have permission and supporting documentation.

## Cost details

- Site code: ₹0
- `github.io` address: ₹0
- GitHub Pages hosting on eligible free plan: ₹0
- No contact-form backend: contact link opens the visitor's email app, so there is no server/form fee.
- Optional custom domain later: **not necessarily free**; you can keep using the free `github.io` address indefinitely subject to GitHub's terms and limits.

## Site notes

- Native HTML content for search indexing.
- Basic social share metadata, accessible nav, keyboard focus states and reduced-motion styling.
- Does not include visitor analytics, tracking cookies or a fake contact-form submission.
- Contact email is public on the page. Phone number was intentionally omitted.
- Metrics and professional facts are derived from the supplied résumé; verify and update anything you plan to publicise. The chart illustration contains no real client data.
