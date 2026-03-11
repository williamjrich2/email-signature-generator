# Email Signature Generator

Premium single-page prototype for generating Outlook-safe HTML email signatures. The app is client-side only and focuses on high-quality export markup, a polished builder UI, and AI-assisted screenshot import.

## Stack

- React 19 + Vite
- Tailwind CSS
- `libphonenumber-js` for phone formatting
- Anthropic Messages API for screenshot analysis

## Core Features

- Tabbed builder for personal info, contact info, branding, social links, CTA banner, and template selection
- Eight table-based signature templates with inline styles only
- Live preview inside an email-client mock frame
- Light and dark preview backgrounds
- Copy raw HTML, copy rendered rich text, and download `.html`
- Settings panel for Anthropic API key, default width, and default country
- Screenshot scanner modal that sends an uploaded or pasted image to Claude and maps the JSON response back into the builder

## Email Markup Rules Followed

- Table layout only in exported HTML
- Inline styles only, no classes or `<style>` blocks
- Web-safe font stacks only
- Social icons rendered as PNG files
- `mailto:` and `tel:` links for email and phone
- Signature width constrained to 300-400px

## Getting Started

```bash
cd email-signature-generator
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

## Production Checks

```bash
npm run build
npm run lint
```

## AI Screenshot Import

The scanner uses the Anthropic Messages API directly from the browser for this prototype. The API key is stored in localStorage, which is acceptable for prototyping only and should be moved server-side before launch.

## Image Hosting Note

For the best email-client compatibility, especially in Outlook, use hosted image URLs for logos, profile photos, banners, and social icons. The prototype ships with sample PNG assets in `public/`, and exported signatures use absolute URLs based on the deployed site origin.

If you move to production, host those assets on a stable public CDN or object store such as S3, Cloudflare R2, or another static host.
