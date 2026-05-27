# Code Pranetra — Premium AI-Tech Website

A cinematic, futuristic marketing website for **Code Pranetra** built with Next.js 15, TypeScript, Tailwind CSS, GSAP, Framer Motion, and Lenis smooth scroll.

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS** + ShadCN-style components
- **GSAP** + ScrollTrigger
- **Framer Motion**
- **Lenis** smooth scroll
- **SplitType** text animations
- **Lucide Icons**
- **next-themes** (light/dark)

## Pages

| Route | Description |
|-------|-------------|
| `/` | Cinematic home with hero, AI showcase, horizontal scroll, stats, testimonials |
| `/ai-solutions` | AI lab aesthetic with solution cards & architecture diagram |
| `/technology` | Interactive tech stack grid + terminal snippet |
| `/portfolio` | Filterable case studies with hover video previews |
| `/blog` | Editorial layout with featured article |
| `/gallery` | Masonry grid with lightbox |
| `/about` | Story, mission, timeline, values, founder |
| `/contact` | Animated form, maps, WhatsApp, booking CTA |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Project Structure

```
/app              # Routes & pages
/components       # UI, layout, home sections
/animations       # GSAP utilities
/hooks            # Lenis, magnetic, mouse glow
/lib              # Constants & utils
/public/images    # Brand logo
/public/videos    # Local video assets (optional)
```

## Brand Assets

Place your logo at `public/images/logo.png` (included from upload).

## Performance Notes

- Videos load from CDN with `preload="metadata"` / lazy patterns
- Images use Next.js `Image` optimization
- Custom cursor disabled on touch devices
- Loading screen shows on first visit (~2.2s)

## Customization

Edit `lib/constants.ts` for copy, stats, portfolio items, and contact info.
