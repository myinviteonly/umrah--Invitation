# A Blessed Homecoming — White & Champagne Gold (Email Button)

This is the original white-and-gold invitation design with its simple **“Insha’Allah, I’ll Be There!”** button restored. There are **no RSVP forms, attendee counts, tracking, FormSubmit integrations, or databases**.

## What happens when guests tap the button

The button launches the guest’s default email application, addressed to **mrwkhurshid3333@gmail.com**, with a warm prewritten message and subject. **The guest must tap Send in their email app** if they want to let you know they're coming. The invitation itself neither sends nor saves anything. A small sparkle animation and message appear on the invitation when tapped.

If a guest hasn't configured an email app on their device, tapping the button may not open a draft. This is a normal limitation of `mailto:` links.

## Update your GitHub Pages invitation

1. Extract the contents of this ZIP file.
2. Open https://github.com/myinviteonly/umrah-invitation
3. In the **repository root**, choose **Add file → Upload files**.
4. Upload **the files inside the ZIP**, not a folder containing them. Replace matching files and commit to `main`.
5. Wait for **Settings → Pages / Actions** to show a successful deployment, then open https://myinviteonly.github.io/umrah-invitation/ and reload. You may need a Safari Private Tab to bypass old caches.

The ZIP is **flat**, matching your current repository: `index.html`, `style.css`, `script.js`, photos, and icons all sit at the same level (not in an `assets/` subfolder).

## Later changes

- To update the email recipient, change `rsvpEmail` in `script.js` (near the top).
- To change date, time, restaurant, or add photos, edit the `INVITATION` settings at the start of `script.js`.
- To change the email text, edit `emailSubject` and `emailBody` inside `configureDetails()` in `script.js`.
- `maliha-kaaba-refined.webp` is used on the Journey screen and in the gallery.
- Keep all three favicon files, `share-preview.jpg`, and images when publishing.

**Privacy:** This is a publicly hosted GitHub Pages invitation containing family photographs and your contact email address. Those details may be visible to visitors and people inspecting the site’s code.
