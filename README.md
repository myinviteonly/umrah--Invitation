# A Blessed Homecoming — White & Gold + Email RSVP

Your existing white-and-gold invitation with real RSVP emails. This build is designed for GitHub Pages and uses the free third-party service [FormSubmit.co](https://formsubmit.co) to forward replies to **mrwkhurshid3333@gmail.com**. No guest account is required.

## Publish on your existing GitHub Pages site

1. Extract `umrah-invitation-white-gold-rsvp.zip` on your computer.
2. Open https://github.com/myinviteonly/umrah-invitation and go to the **repository root**, where `index.html` already lives.
3. Choose **Add file → Upload files** and upload the *contents* of the extracted folder (not the ZIP file or outer folder). Allow GitHub to replace files with matching names, then commit to `main`.
4. When **Actions → Pages** finishes deploying, open https://myinviteonly.github.io/umrah-invitation/ and refresh. The styles and script have versioned links to help with caching.

## REQUIRED: Activate your email destination once

**FormSubmit.co must verify the receiving email before it sends RSVP messages.**

1. Visit the published invitation, use **Skip to invitation**, select **Insha’Allah, I’ll Be There!**, enter a TEST name and a party size, then select **Send my reply**.
2. Open `mrwkhurshid3333@gmail.com` and find the **FormSubmit activation email**. Check Spam/Junk/Promotions if necessary.
3. Open the activation email and click its **Activate/Confirm** link to approve the inbox.
4. Send a *second* test RSVP from the invitation, and verify the new response email arrives. Only then share your link with guests.

The first test normally triggers the activation email, not a regular guest RSVP email. **I cannot complete the activation step for you.** Do not assume responses are being delivered until you've activated and tested them.

## How guest replies work

- Tapping **Insha’Allah, I’ll Be There!** opens a small form.
- Guests enter their name, select **attending** or **unable to attend**, enter the number of people (including themselves, if attending), and optionally leave a note.
- **Send my reply** submits to FormSubmit; the guest sees a celebratory confirmation only after the service accepts the request. If the submission fails, the form stays open with a retry message.
- Guests are not required to sign in to anything or have an email account. Your Gmail receives the submissions once activated.
- The RSVP uses `fetch()` so the website stays on the invitation rather than navigating to a third-party thank-you screen.

## Important privacy and limitations

- RSVP data (names, attendance, party sizes, messages) is processed by **FormSubmit.co**, a third party, not by GitHub or Gmail alone. Per their documentation, FormSubmit retains form submissions for up to 30 days. Only request information you need, and avoid collecting sensitive data.
- The destination Gmail address is visible in the public HTML source. After activating, FormSubmit offers an optional **invisible email** endpoint token you can substitute in `index.html` if desired; also keep the `form.action` URL's `/ajax/` prefix.
- A public form may attract spam. This edition uses a hidden honeypot and disables captcha so mobile visitors can remain on the site; you can turn captcha back on if you run into spam, although that may change the submission flow.
- This is a small free third-party service; availability and delivery can change. If an RSVP fails, the visitor is shown an error rather than a false confirmation.

## Update later

- Event date and time and gallery list: top of `script.js` under `INVITATION`.
- RSVP receiving email: find `https://formsubmit.co/ajax/mrwkhurshid3333@gmail.com` in `index.html` and replace the email portion.
- Theme: the last section of `style.css` remains the White & Champagne Gold palette.
- Important: keep all files at the GitHub repository **root**, exactly as in the ZIP; there is no `assets/` folder.
