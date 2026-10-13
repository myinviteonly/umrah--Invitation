# A Blessed Homecoming — White & Champagne Gold (Simple Button)

This is the **white and gold** invitation for the Umrah homecoming of **Mohammad Muhsen Maulawizada and Maliha Adil**. It has the animated envelope, lantern and Quranic verse, journey portrait, three-photo gallery, invitation details, directions, favicon, and sharing link.

## The “Insha’Allah, I’ll Be There!” button

Guests tap the button and see **“JazakAllah Khair!”**, a warm message, and golden sparkle animations. **That’s all.** It does not open email, send anything, submit a form, store data or track who attends. No account or configuration is needed.

## Update your existing GitHub Pages invitation

1. Extract the contents of this ZIP.
2. Open your repository: https://github.com/myinviteonly/umrah-invitation
3. Go to the root of the repository (not inside an `assets` folder) and choose **Add file → Upload files**.
4. Upload **all the files inside the extracted folder**, replacing matching files, then commit changes to `main`.
5. Wait for GitHub Pages to finish deploying, then visit: https://myinviteonly.github.io/umrah-invitation/
6. If Safari shows the earlier page, try a Private Tab or refresh after deployment.

All images and the website's HTML/CSS/JS files are in the **same root folder**, matching the existing repository structure. Do **not** upload the ZIP itself to the repository; extract it first.

## Customize later

- Change date, time, venue, and gallery images in the `INVITATION` object at the top of `script.js`.
- Change the confirmation words inside `index.html` where `id="rsvpResult"` appears.
- The gallery contains **three images, in this order**: your parents together (`parents-together-original.jpg`); your mother at the Kaaba (`maliha-kaaba-refined.webp`); and your father in Madinah (`mohammad-muhsen-madinah.jpg`).
- Your mother's refined Kaaba image is `maliha-kaaba-refined.webp`, used on the Journey page and in the gallery.
- The site uses free Google Fonts over the internet; other design elements and photos are packaged locally.

**Privacy reminder:** GitHub Pages publishes family photographs publicly for anyone with the web address (or direct image URLs). There is no RSVP storage or transmission.
