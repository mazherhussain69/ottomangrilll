# Ottoman Turkish Grill Website

## Build
- Create a single-page, fully responsive restaurant experience with sticky navigation, cinematic hero, About, Menu, Featured Dishes, Gallery, Why Ottoman, Instagram, Locations, Contact, and footer.
- Base the visual system on the supplied logo: obsidian black, flame red/orange, warm white, restrained gold, Ottoman-inspired line patterns, premium serif headings, and modern sans-serif body type.
- Digitize only the 14 supplied dishes and exact CAD prices. Crop the supplied menu screenshots into reusable food photography and use the supplied logo throughout.

## Interaction and motion
- Add a short logo loading sequence, top scroll-progress indicator, smooth section navigation, active navigation state, animated mobile menu, custom desktop cursor, magnetic primary actions, scroll reveals, subtle parallax, hover lifts, image zooms, and reduced-motion safeguards.
- Add menu filtering, a fullscreen gallery lightbox, floating phone action, and back-to-top control.

## Business details
- Connect all call actions to `tel:+14167753737` and all Instagram actions to the supplied profile in a new tab.
- Add exact Mississauga and North York address cards with address-based Google Maps direction links.
- Avoid unsupported hours, reviews, ratings, awards, testimonials, descriptions, or claims.

## Technical details
- Build with semantic React/TanStack sections and Tailwind v4 semantic tokens.
- Store the logo and extracted food crops as CDN-backed project assets, lazy-load below-the-fold images, and keep animation transform-based.
- Add route metadata, LocalBusiness/Restaurant structured data, descriptive image text, and mobile-friendly hierarchy.
- Validate desktop and mobile layouts, menu filtering, lightbox, navigation, call/Instagram/directions links, and reduced-motion behavior.
