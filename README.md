# Victor — Developer Portfolio

A responsive, animated portfolio website built with plain HTML, CSS, and JavaScript. No build tools or package installation are required.

## Run locally

From this folder, start a local web server:

```powershell
python -m http.server 4173
```

Then open [http://localhost:4173](http://localhost:4173). Stop the server with `Ctrl+C`.

You can also open `index.html` directly, but a local server is recommended for the best browser behavior.

## Customize

Edit `index.html` to update:

- Your name, introduction, about text, and availability.
- Project titles, descriptions, technologies, and project links. Replace the sample `href="#"` values with your real URLs.
- Social profile links in the footer.
- The contact form recipient: replace `hello@example.com` in the form's `data-recipient` attribute with your email address. Submitting the form opens the visitor's default email app with the message filled in; it does not send the message automatically.

Edit `styles.css` to change the colors, layout, and animations. Edit `script.js` to adjust the theme toggle, project filters, scroll effects, or contact form behavior.

## Features

- Responsive layout and project category filters.
- Light/dark theme toggle, with the preference saved in the browser.
- Animated headline, scrolling text ticker, scroll reveals, and project hover effects.
- Contact form with required-field and email validation.
- Respects the visitor's reduced-motion preference.

