import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUp, ChevronDown, ChevronLeft, ChevronRight, Flame, Instagram, MapPin, Menu, Phone, ShieldCheck, Sparkles, UtensilsCrossed, X, type LucideIcon } from "lucide-react";
import { assets } from "../assets/assets";

const INSTAGRAM = "https://www.instagram.com/ottomangrill.ca/";
const PHONE = "tel:+14167753737";

const dishes = [
  { name: "Lahmacun & Salad", price: "CA$22.99", type: "Pide", image: assets.lahmacun },
  { name: "Chicken Doner Plate", price: "CA$26.99", type: "Doner", image: assets.chicken_doner_plate },
  { name: "Beef Doner Sandwich", price: "CA$14.99", type: "Doner", image: assets.beef_doner_sandwich },
  { name: "Turkish Sausage (Sucuk) Pide", price: "CA$24.99", type: "Pide", image: assets.sucuk_pide },
  { name: "Annem Kebabi", price: "CA$28.99", type: "Grill", image: assets.annem_kebabi },
  { name: "Ottoman Special", price: "CA$29.99", type: "Grill", image: assets.ottoman_special },
  { name: "Mix Doner Plate", price: "CA$27.99", type: "Doner", image: assets.mix_doner_plate },
  { name: "Beef Beyti Sarma", price: "CA$31.99", type: "Grill", image: assets.beef_beyti_sarma },
  { name: "Chef’s Grill Plate", price: "CA$40.99", type: "Grill", image: assets.chefs_grill_plate },
  { name: "Chicken Doner Pide", price: "CA$27.99", type: "Pide", image: assets.chicken_doner_pide },
  { name: "Ottoman Special Mix Grill for Three", price: "CA$107.99", type: "Grill", image: assets.ottoman_special_mix },
  { name: "Beef Doner Plate", price: "CA$26.99", type: "Doner", image: assets.beef_doner_plate },
  { name: "Chicken Adana Kebab", price: "CA$27.99", type: "Grill", image: assets.chicken_adana_kebab },
  { name: "Yogurtlu Kebab", price: "CA$28.99", type: "Grill", image: assets.yogurtlu_kebab },
] as const;

const nav = ["home", "about", "menu", "gallery", "locations", "contact"];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ottoman Turkish Grill & Cuisine | Halal Turkish Restaurant" },
      { name: "description", content: "Discover Ottoman Turkish Grill, serving halal Turkish cuisine in Mississauga and North York. Explore authentic kebabs, doner, pide and grill specialties." },
      { property: "og:title", content: "Ottoman Turkish Grill & Cuisine | Halal Turkish Restaurant" },
      { property: "og:description", content: "Authentic halal Turkish cuisine in Mississauga and North York." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Restaurant", name: "Ottoman Turkish Grill and Cuisine", servesCuisine: "Halal Turkish Cuisine", telephone: "+1-416-775-3737", sameAs: [INSTAGRAM], department: [{ "@type": "Restaurant", name: "Ottoman Turkish Grill and Cuisine — Mississauga", address: { "@type": "PostalAddress", streetAddress: "5955 Latimer Dr #1", addressLocality: "Mississauga", addressRegion: "Ontario", postalCode: "L5V 0B7", addressCountry: "CA" } }, { "@type": "Restaurant", name: "Ottoman Turkish Grill and Cuisine — North York", address: { "@type": "PostalAddress", streetAddress: "3354 Keele St", addressLocality: "North York", addressRegion: "Ontario", addressCountry: "CA" } }] }) }],
  }),
  component: HomePage,
});

function ButtonLink({ href, children, outline = false, external = false }: { href: string; children: React.ReactNode; outline?: boolean; external?: boolean }) {
  return <a href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined} data-magnetic className={`magnetic group inline-flex min-h-12 items-center justify-center gap-2 border px-6 py-3 text-xs font-bold uppercase tracking-[.18em] ${outline ? "border-cream/40 bg-ink/20 text-cream hover:border-primary hover:bg-primary" : "border-primary bg-primary text-primary-foreground hover:border-ember hover:bg-ember"}`}>{children}</a>;
}

function SectionTitle({ eyebrow, title, light = false }: { eyebrow: string; title: string; light?: boolean }) {
  return <div className="reveal mb-10"><div className="mb-3 flex items-center gap-3"><span className="h-px w-10 bg-primary"/><p className="text-xs font-bold uppercase tracking-[.3em] text-primary">{eyebrow}</p></div><h2 className={`max-w-3xl font-display text-5xl font-semibold leading-[.95] sm:text-6xl lg:text-7xl ${light ? "text-cream" : "text-foreground"}`}>{title}</h2></div>;
}

function HomePage() {
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1250);
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      setProgress((window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight)) * 100);
      const current = [...nav].reverse().find(id => { const el = document.getElementById(id); return el ? el.getBoundingClientRect().top <= 180 : false; });
      if (current) setActive(current);
    };
    const onMove = (e: MouseEvent) => {
      if (dot.current) dot.current.style.transform = `translate3d(${e.clientX}px,${e.clientY}px,0)`;
      if (ring.current) ring.current.animate({ transform: `translate3d(${e.clientX}px,${e.clientY}px,0)` }, { duration: 350, fill: "forwards" });
    };
    const onOver = (e: MouseEvent) => ring.current?.classList.toggle("active", !!(e.target as HTMLElement).closest("a,button,img"));
    window.addEventListener("scroll", onScroll, { passive: true }); window.addEventListener("mousemove", onMove, { passive: true }); document.addEventListener("mouseover", onOver); onScroll();
    const observer = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && e.target.classList.add("is-visible")), { threshold: .13 });
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
    return () => { window.clearTimeout(timer); window.removeEventListener("scroll", onScroll); window.removeEventListener("mousemove", onMove); document.removeEventListener("mouseover", onOver); observer.disconnect(); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = lightbox !== null || menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox, menuOpen]);

  const filtered = useMemo(() => filter === "All" ? dishes : dishes.filter(d => d.type === filter), [filter]);
  const gallery = dishes.slice(0, 8);
  const selectedImage = lightbox === null ? undefined : gallery[lightbox];

  return <>
    {loading && <div className="fixed inset-0 z-[10000] grid place-items-center bg-cream"><div className="text-center"><img src={assets.ottoman_logo} className="loading-logo mx-auto w-48 sm:w-64" alt="Ottoman Turkish Grill logo"/><div className="loading-line mx-auto mt-4 h-0.5 w-40 bg-primary"/></div></div>}
    <div ref={dot} className="cursor-dot"/><div ref={ring} className="cursor-ring"/>
    <div className="fixed inset-x-0 top-0 z-[1000] h-1 bg-transparent"><div className="h-full bg-primary transition-[width] duration-150" style={{ width: `${progress}%` }}/></div>
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "bg-ink/95 py-2 shadow-2xl backdrop-blur-xl" : "bg-transparent py-4"}`}>
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center px-5 lg:grid-cols-[auto_1fr_auto] lg:px-8">
        <a href="#home" aria-label="Ottoman Grill home" className="min-w-0"><img src={assets.ottoman_logo} alt="Ottoman Turkish Grill" className={`w-32 object-contain brightness-0 invert transition-all duration-500 sm:w-40 ${scrolled ? "max-h-12" : "max-h-16"}`}/></a>
        <nav className="hidden justify-center gap-7 lg:flex">{nav.map(n => <a key={n} href={`#${n}`} className={`relative py-2 text-[11px] font-bold uppercase tracking-[.18em] text-cream transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:bg-primary after:transition-transform ${active === n ? "text-primary after:scale-x-100" : "after:scale-x-0 hover:text-primary hover:after:scale-x-100"}`}>{n}</a>)}</nav>
        <div className="flex items-center gap-3"><a href="#menu" className="hidden border border-primary bg-primary px-5 py-3 text-[10px] font-bold uppercase tracking-[.18em] text-primary-foreground hover:bg-ember sm:block">View menu</a><button onClick={() => setMenuOpen(v => !v)} aria-label="Toggle navigation" className="grid h-11 w-11 place-items-center border border-cream/30 text-cream lg:hidden">{menuOpen ? <X/> : <Menu/>}</button></div>
      </div>
      <div className={`absolute inset-x-0 top-full overflow-hidden bg-ink/98 transition-[max-height] duration-500 lg:hidden ${menuOpen ? "max-h-[520px]" : "max-h-0"}`}><nav className="flex flex-col px-6 py-6">{nav.map(n => <a key={n} href={`#${n}`} onClick={() => setMenuOpen(false)} className="border-b border-cream/10 py-4 font-display text-3xl capitalize text-cream hover:text-primary">{n}</a>)}</nav></div>
    </header>

    <main>
      <section id="home" className="relative flex min-h-[92svh] items-end overflow-hidden bg-ink pb-20 pt-32 sm:min-h-screen sm:pb-24">
        <img src={assets.ottoman_special_mix} alt="Ottoman Special Mix Grill for Three" className="hero-image absolute inset-0 h-full w-full object-cover opacity-65" fetchPriority="high"/>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--ink)_0%,color-mix(in_oklab,var(--ink)_72%,transparent)_50%,color-mix(in_oklab,var(--ink)_35%,transparent)_100%)]"/>
        <div className="pattern absolute inset-0 opacity-25"/><img src={assets.ottoman_mark} alt="" className="animate-drift absolute -right-20 top-24 hidden w-80 opacity-[.08] lg:block"/>
        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 lg:px-8"><div className="max-w-4xl">
          <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[.35em] text-primary"><span className="h-px w-10 bg-primary"/> Halal · Turkish cuisine</p>
          <h1 className="font-display text-6xl font-semibold leading-[.86] text-cream sm:text-8xl lg:text-[7.4rem]">Authentic Turkish <span className="text-primary">Flavors</span></h1>
          <p className="mt-7 max-w-2xl text-base leading-7 text-cream/75 sm:text-lg">Experience the rich flavors and traditions of Turkish cuisine at Ottoman Turkish Grill and Cuisine.</p>
          <div className="mt-9 flex flex-wrap gap-3"><ButtonLink href="#menu"><UtensilsCrossed size={16}/>Explore menu</ButtonLink><ButtonLink href={PHONE} outline><Phone size={16}/>Call us</ButtonLink><a href={INSTAGRAM} target="_blank" rel="noreferrer" aria-label="Ottoman Grill on Instagram" className="grid h-12 w-12 place-items-center border border-cream/40 text-cream transition hover:border-primary hover:bg-primary"><Instagram size={18}/></a></div>
        </div></div>
        <a href="#about" aria-label="Scroll to about" className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-cream/60"><span className="mb-2 block text-[9px] uppercase tracking-[.3em]">Discover</span><ChevronDown className="mx-auto animate-bounce" size={18}/></a>
      </section>

      <section id="about" className="relative overflow-hidden bg-background py-24 sm:py-32"><div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-2 lg:items-center lg:px-8">
        <div className="reveal relative"><div className="absolute -left-5 -top-5 h-28 w-28 border-l border-t border-primary"/><img src={assets.annem_kebabi} alt="Annem Kebabi served at Ottoman Turkish Grill" loading="lazy" className="aspect-[4/5] w-full object-cover shadow-2xl"/><div className="absolute -bottom-6 -right-3 bg-ink p-5 text-cream sm:right-8"><Flame className="mb-2 text-primary"/><p className="font-display text-2xl">Made for the table</p></div></div>
        <div><SectionTitle eyebrow="Our story" title="A Taste of Turkish Tradition"/><p className="reveal max-w-xl text-base leading-8 text-muted-foreground">Ottoman Turkish Grill and Cuisine brings the warmth of Turkish dining to every table. Our menu celebrates halal Turkish cuisine through kebabs, doner, pide and generous grill plates prepared for sharing.</p><p className="reveal mt-4 max-w-xl text-base leading-8 text-muted-foreground">From a quick doner sandwich to an Ottoman mixed grill, every visit is an invitation to gather, share and enjoy authentic Turkish flavors.</p><div className="reveal mt-8 grid grid-cols-3 gap-2">{([[ShieldCheck,"Halal"],[UtensilsCrossed,"Turkish cuisine"],[Sparkles,"Authentic flavors"]] as Array<[LucideIcon,string]>).map(([Icon,label]) => <div key={label} className="border border-border bg-card px-2 py-5 text-center"><Icon className="mx-auto mb-3 text-primary" size={23}/><p className="text-[10px] font-bold uppercase tracking-[.12em]">{label}</p></div>)}</div></div>
      </div></section>

      <section id="menu" className="bg-ink py-24 text-cream sm:py-32"><div className="mx-auto max-w-7xl px-5 lg:px-8"><SectionTitle eyebrow="Our menu" title="From the Ottoman Kitchen" light/><div className="reveal mb-10 flex gap-2 overflow-x-auto pb-2">{["All","Grill","Doner","Pide"].map(c => <button key={c} onClick={() => setFilter(c)} className={`shrink-0 border px-5 py-3 text-xs font-bold uppercase tracking-[.15em] transition ${filter === c ? "border-primary bg-primary text-primary-foreground" : "border-cream/20 text-cream hover:border-primary hover:text-primary"}`}>{c === "All" ? "All dishes" : c}</button>)}</div>
        <div key={filter} className="grid animate-fade-in gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{filtered.map((d,i) => <article key={d.name} className="menu-card group overflow-hidden border border-cream/10 bg-cream text-foreground" style={{ animationDelay: `${i*40}ms` }}><div className="aspect-[4/3] overflow-hidden"><img src={d.image} alt={`${d.name} at Ottoman Turkish Grill`} loading="lazy" className="h-full w-full object-cover"/></div><div className="flex min-h-32 items-start justify-between gap-4 p-5"><div><p className="mb-2 text-[9px] font-bold uppercase tracking-[.2em] text-muted-foreground">{d.type}</p><h3 className="font-display text-2xl font-semibold leading-tight">{d.name}</h3></div><p className="shrink-0 font-bold text-primary">{d.price}</p></div></article>)}</div>
        <div className="reveal mt-12 text-center"><ButtonLink href="#menu"><Flame size={16}/>View full menu</ButtonLink></div>
      </div></section>

      <section className="grid overflow-hidden bg-primary lg:grid-cols-2"><div className="relative min-h-[440px] overflow-hidden lg:min-h-[680px]"><img src={assets.chefs_grill_plate} alt="Chef’s Grill Plate" loading="lazy" className="h-full w-full object-cover transition-transform duration-[2000ms] hover:scale-110"/><div className="absolute inset-0 bg-ink/15"/></div><div className="pattern flex items-center px-6 py-20 sm:px-14 lg:px-20"><div className="reveal max-w-xl text-primary-foreground"><p className="mb-4 text-xs font-bold uppercase tracking-[.3em]">Featured from the grill</p><h2 className="font-display text-6xl font-semibold leading-[.9] sm:text-7xl">Chef’s Grill Plate</h2><p className="mt-6 text-lg leading-8 opacity-80">A generous Ottoman grill selection, presented with the warmth and abundance of Turkish table culture.</p><p className="my-7 text-3xl font-bold">CA$40.99</p><ButtonLink href={PHONE} outline><Phone size={16}/>Call to order</ButtonLink></div></div></section>

      <section id="gallery" className="bg-background py-24 sm:py-32"><div className="mx-auto max-w-7xl px-5 lg:px-8"><SectionTitle eyebrow="Food gallery" title="A Feast for Every Table"/><div className="grid auto-rows-[210px] grid-cols-2 gap-3 md:auto-rows-[260px] md:grid-cols-4">{gallery.map((d,i) => <button key={d.name} onClick={() => setLightbox(i)} aria-label={`View ${d.name}`} className={`reveal group relative overflow-hidden ${i===0||i===5 ? "row-span-2" : ""} ${i===3 ? "md:col-span-2" : ""}`}><img src={d.image} alt={d.name} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110"/><span className="absolute inset-0 bg-ink/0 transition group-hover:bg-ink/55"/><span className="absolute inset-x-4 bottom-4 translate-y-4 text-left font-display text-2xl text-cream opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">{d.name}</span></button>)}</div></div></section>

      <section className="pattern bg-ink py-24 text-cream sm:py-32"><div className="mx-auto max-w-7xl px-5 lg:px-8"><SectionTitle eyebrow="The Ottoman table" title="Why Choose Ottoman" light/><div className="grid gap-px bg-cream/10 sm:grid-cols-2 lg:grid-cols-4">{([[ShieldCheck,"Halal","Authentic halal dining experience."],[UtensilsCrossed,"Turkish Cuisine","Inspired by rich Turkish culinary traditions."],[Flame,"Authentic Flavors","A memorable Turkish dining experience."],[Sparkles,"Welcoming Atmosphere","A comfortable place to enjoy Turkish cuisine."]] as Array<[LucideIcon,string,string]>).map(([Icon,t,d],i) => <article key={t} className="reveal group bg-ink p-8 transition hover:bg-primary" style={{ transitionDelay:`${i*70}ms` }}><Icon size={28} className="mb-12 text-primary transition group-hover:text-primary-foreground"/><h3 className="font-display text-3xl">{t}</h3><p className="mt-3 text-sm leading-6 text-cream/60 group-hover:text-cream/80">{d}</p></article>)}</div></div></section>

      <section className="bg-background py-24 sm:py-32"><div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="grid items-end gap-8 md:grid-cols-[1fr_auto]"><SectionTitle eyebrow="@ottomangrill.ca" title="Follow Ottoman Grill"/><div className="reveal mb-10"><ButtonLink href={INSTAGRAM} external><Instagram size={16}/>Follow us on Instagram</ButtonLink></div></div><div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">{dishes.slice(6,12).map(d => <a href={INSTAGRAM} target="_blank" rel="noreferrer" key={d.name} className="reveal group relative aspect-square overflow-hidden"><img src={d.image} alt={`${d.name} from Ottoman Grill`} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110"/><span className="absolute inset-0 grid place-items-center bg-primary/0 text-primary-foreground opacity-0 transition group-hover:bg-primary/75 group-hover:opacity-100"><Instagram/></span></a>)}</div></div></section>

      <section id="locations" className="bg-muted py-24 sm:py-32"><div className="mx-auto max-w-7xl px-5 lg:px-8"><SectionTitle eyebrow="Two locations" title="Visit Ottoman Grill"/><div className="grid gap-5 lg:grid-cols-2">{[
        { city:"Mississauga", address:"5955 Latimer Dr #1\nMississauga, Ontario L5V 0B7", image:assets.beef_doner_plate, url:"https://www.google.com/maps/dir/?api=1&destination=5955+Latimer+Dr+%231+Mississauga+Ontario+L5V+0B7" },
        { city:"North York", address:"3354 Keele St\nNorth York, Ontario", image:assets.chicken_adana_kebab, url:"https://www.google.com/maps/dir/?api=1&destination=3354+Keele+St+North+York+Ontario" }
      ].map(l => <article key={l.city} className="menu-card reveal overflow-hidden border border-border bg-card"><div className="aspect-[16/7] overflow-hidden"><img src={l.image} alt={`Turkish cuisine at Ottoman Grill ${l.city}`} loading="lazy" className="h-full w-full object-cover"/></div><div className="grid gap-5 p-7 sm:grid-cols-[1fr_auto] sm:items-end"><div><MapPin className="mb-4 text-primary"/><h3 className="font-display text-4xl font-semibold">{l.city}</h3><p className="mt-3 whitespace-pre-line text-sm leading-6 text-muted-foreground">{l.address}</p></div><ButtonLink href={l.url} external>Get directions</ButtonLink></div></article>)}</div></div></section>

      <section id="contact" className="relative overflow-hidden bg-primary py-24 text-primary-foreground sm:py-32"><div className="pattern absolute inset-0"/><img src={assets.ottoman_mark} alt="" className="absolute -right-20 top-1/2 w-[32rem] -translate-y-1/2 opacity-10"/><div className="reveal relative mx-auto max-w-5xl px-5 text-center"><p className="mb-5 text-xs font-bold uppercase tracking-[.3em]">Your table awaits</p><h2 className="font-display text-6xl font-semibold leading-[.9] sm:text-8xl">Ready for a Taste of Turkey?</h2><a href={PHONE} className="mt-8 inline-block font-display text-4xl font-semibold sm:text-6xl">+1 (416) 775-3737</a><div className="mt-9 flex flex-wrap justify-center gap-3"><ButtonLink href={PHONE} outline><Phone size={16}/>Call now</ButtonLink><ButtonLink href="#menu" outline><UtensilsCrossed size={16}/>View menu</ButtonLink><ButtonLink href={INSTAGRAM} outline external><Instagram size={16}/>Instagram</ButtonLink></div></div></section>
    </main>

    <footer className="pattern bg-ink py-16 text-cream"><div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[1.2fr_1fr_1fr] lg:px-8"><div><img src={assets.ottoman_logo} alt="Ottoman Turkish Grill and Cuisine" className="w-56 brightness-0 invert"/><p className="mt-4 text-xs uppercase tracking-[.25em] text-primary">Halal · Turkish cuisine</p></div><div><h3 className="mb-4 font-display text-2xl">Visit us</h3><p className="text-sm leading-7 text-cream/60">5955 Latimer Dr #1, Mississauga, Ontario L5V 0B7<br/><br/>3354 Keele St, North York, Ontario</p></div><div><h3 className="mb-4 font-display text-2xl">Stay connected</h3><a href={PHONE} className="mb-3 flex items-center gap-3 text-sm hover:text-primary"><Phone size={16}/>+1 (416) 775-3737</a><a href={INSTAGRAM} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm hover:text-primary"><Instagram size={16}/>@ottomangrill.ca</a></div></div><div className="mx-auto mt-14 flex max-w-7xl flex-col gap-5 border-t border-cream/10 px-5 pt-8 text-[10px] uppercase tracking-[.15em] text-cream/40 sm:flex-row sm:justify-between lg:px-8"><p>© {new Date().getFullYear()} Ottoman Turkish Grill and Cuisine</p><nav className="flex flex-wrap gap-4">{nav.map(n => <a key={n} href={`#${n}`} className="hover:text-primary">{n}</a>)}</nav></div></footer>

    <a href={PHONE} aria-label="Call Ottoman Turkish Grill" className="animate-pulse-ring fixed bottom-5 left-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-xl sm:hidden"><Phone size={21}/></a>
    <button onClick={() => window.scrollTo({top:0,behavior:"smooth"})} aria-label="Back to top" className={`fixed bottom-5 right-5 z-40 grid h-12 w-12 place-items-center border border-primary bg-ink text-primary transition-all ${scrolled ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"}`}><ArrowUp size={18}/></button>

    {lightbox !== null && selectedImage && <div role="dialog" aria-modal="true" aria-label="Food gallery" className="fixed inset-0 z-[200] grid place-items-center bg-ink/95 p-4 backdrop-blur-md"><button onClick={() => setLightbox(null)} aria-label="Close gallery" className="absolute right-5 top-5 grid h-12 w-12 place-items-center border border-cream/20 text-cream hover:bg-primary"><X/></button><button onClick={() => setLightbox((lightbox-1+gallery.length)%gallery.length)} aria-label="Previous image" className="absolute left-4 z-10 grid h-12 w-12 place-items-center bg-cream/10 text-cream hover:bg-primary"><ChevronLeft/></button><figure className="max-w-5xl animate-scale-in"><img src={selectedImage.image} alt={selectedImage.name} className="max-h-[78vh] w-full object-contain"/><figcaption className="mt-4 text-center font-display text-3xl text-cream">{selectedImage.name} <span className="ml-3 font-sans text-base text-primary">{selectedImage.price}</span></figcaption></figure><button onClick={() => setLightbox((lightbox+1)%gallery.length)} aria-label="Next image" className="absolute right-4 z-10 grid h-12 w-12 place-items-center bg-cream/10 text-cream hover:bg-primary"><ChevronRight/></button></div>}
  </>;
}