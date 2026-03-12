# Mohawk Group Signature Builder

Enterprise-focused single-page prototype for generating Mohawk Group email signatures. The app is client-side only and is intentionally constrained: fewer inputs, approved brand options only, and Outlook-safe HTML export.

## Stack

- React 19 + Vite
- Tailwind CSS

## Core Features

- Simplified builder for employee details, email, optional location, approved logo selection, and CTA banner presets
- Mohawk-specific email autofill in the format `firstname_lastname@mohawkind.com`
- Approved Mohawk Group and Durkan logo options
- Preset CTA banner selector, ready to swap with final provided assets
- Single table-based enterprise signature template with inline styles only
- Live preview inside an email-client mock frame
- Light and dark preview backgrounds
- Copy raw HTML, copy rendered rich text, and download `.html`
- Mobile-optimized app layout and a signature width that stays safe on small screens

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

## Image Hosting Note

For the best email-client compatibility, especially in Outlook, use hosted image URLs for logos and banners. The prototype ships with placeholder Mohawk-branded PNG assets in `public/mohawk/`, and exported signatures use absolute URLs based on the deployed site origin.

If you move to production, host those assets on a stable public CDN or object store such as S3, Cloudflare R2, or another static host.
