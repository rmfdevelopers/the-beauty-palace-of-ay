'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Scissors, 
  Clock, 
  Gem, 
  Users, 
  Award, 
  Star, 
  CheckCheck, 
  Loader2, 
  ArrowRight, 
  Phone, 
  Instagram, 
  MapPin, 
  Menu, 
  X,
  ImageOff
} from 'lucide-react';

// DESIGN DECISIONS:
// Layout Energy: bold
// Depth Treatment: glassmorphic
// Divider Style: D-RULE
// Typography Personality: refined

const brief = {
  name: "The Beauty Palace of AY",
  tagline: "The Crown You Never Take Off",
  description: "Lagos' premier destination for luxury braids, flawless wig installations, and bespoke nail artistry. We transform your beauty vision into a royal reality.",
  industry: "beauty",
  colors: { primary: "#0F0F0F", secondary: "#D4AF37", accent: "#F5F5F5" },
  contact: { whatsapp: "+2340000000000", instagram: "thebeautypalaceofay", address: "Lagos, Nigeria" },
  heroImage: { url: "https://images.unsplash.com/photo-1553276738-5a611037a82c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4ODY1NzJ8MHwxfHNlYXJjaHwxfHxiZWF1dGlmdWwlMjBOaWdlcmlhbiUyMHdvbWFuJTIwd2l0aCUyMGx1eHVyeSUyMGdvbGQlMjBicmFpZHN8ZW58MXwwfHx8MTc3OTE4NzY5NHww&ixlib=rb-4.1.0&q=80&w=1080" }
};

const products = [
  { name: "Luxury Knotless Braids", description: "Neat, lightweight, and perfectly partitioned braids for the modern woman.", price: "₦35,000", image: "https://images.unsplash.com/photo-1708170236083-4671c6b83ad3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4ODY1NzJ8MHwxfHNlYXJjaHwxfHxpbnRyaWNhdGUlMjBrbm90bGVzcyUyMGJyYWlkcyUyMExhZ29zJTIwc2Fsb24lMjBzdHlsZXxlbnwxfDB8fHwxNzc5MTg3Njk0fDA&ixlib=rb-4.1.0&q=80&w=1080" },
  { name: "Frontal Wig Installation", description: "Seamless lace melting and styling for a natural, glueless look.", price: "₦15,000", image: "https://images.unsplash.com/photo-1663582816158-42354522fe15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4ODY1NzJ8MHwxfHNlYXJjaHwxfHxwZXJmZWN0bHklMjBsYWlkJTIwd2lnJTIwaW5zdGFsbGF0aW9uJTIwZnJvbnRhbCUyMGxhY2V8ZW58MXwwfHx8MTc3OTE4NzY5NXww&ixlib=rb-4.1.0&q=80&w=1080" },
  { name: "Royal Mani-Pedi", description: "Comprehensive nail care including cuticle treatment and luxury gel polish.", price: "₦18,000", image: "https://images.unsplash.com/photo-1659576650819-a2edad0dd3df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4ODY1NzJ8MHwxfHNlYXJjaHw0fHxsdXh1cnklMjBoYWlyJTIwc2Fsb24lMjBpbnRlcmlvciUyMGJsYWNrJTIwZ29sZCUyMGRlY29yJTIwbGlnaHRpbmd8ZW58MXwwfHx8MTc3OTE4NzY5M3ww&ixlib=rb-4.1.0&q=80&w=1080" },
  { name: "Premium Hair Revamping", description: "Restore your old bundles to their original factory shine and bounce.", price: "₦25,000", image: "https://images.unsplash.com/photo-1634449571017-5fecfd26ad76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4ODY1NzJ8MHwxfHNlYXJjaHwxfHxzaWxreSUyMGhhaXIlMjBleHRlbnNpb25zJTIwcmV2YW1wJTIwcHJvY2VzcyUyMGx1eHVyeXxlbnwxfDB8fHwxNzc5MTg3Njk2fDA&ixlib=rb-4.1.0&q=80&w=1080" }
];

const features = [
  { title: "Expert Stylists", description: "Highly trained professionals specializing in diverse hair textures.", icon: Scissors },
  { title: "Quick Turnaround", description: "Beauty shouldn't take all day. We value your time with efficient service.", icon: Clock },
  { title: "Premium Products", description: "We use only the finest hair care and nail products for royal results.", icon: Gem }
];

const stats = [
  { number: "500+", label: "Happy Clients" },
  { number: "12", label: "Master Stylists" },
  { number: "4.9", label: "Star Rating" }
];

const testimonials = [
  { name: "Chinelo Okoro", role: "Fashion Designer", text: "The best knotless braids I have ever done in Lagos. Neat and painless!" },
  { name: "Tolu Adeyemi", role: "Marketing Executive", text: "My wig installation was so seamless, people thought it was my natural hair. Highly recommend!" },
  { name: "Funke Williams", role: "Creative Director", text: "The nail art here is top-tier. They really pay attention to detail." }
];

const galleryImages = [
  "https://images.unsplash.com/photo-1600948836101-f9ffda59d250",
  "https://images.unsplash.com/photo-1670261197440-9f54a791d9cd",
  "https://images.unsplash.com/photo-1536524894612-c69d62c6f639",
  "https://images.unsplash.com/photo-1658562412479-4bfd84dda0c2",
  "https://images.unsplash.com/photo-1711967150682-a15517202b82",
  "https://images.unsplash.com/photo-1759038086962-13119e3da5bf"
];

const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
};

function SafeImage({ src, alt, fill, width, height, className, priority, fallbackClassName }: {
  src: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; priority?: boolean; fallbackClassName?: string;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-primary/60 to-secondary/10 ${fallbackClassName ?? className ?? ''}`}>
        <ImageOff size={28} className="text-white/20" />
      </div>
    );
  }
  return (
    <Image src={src} alt={alt} fill={fill}
      width={!fill ? (width ?? 800) : undefined}
      height={!fill ? (height ?? 600) : undefined}
      className={className} priority={priority}
      onError={() => setError(true)} />
  );
}

function SectionDivider() {
  return (
    <div className="py-16 flex items-center gap-8 px-8 max-w-6xl mx-auto">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[var(--secondary)]/40 to-transparent" />
      <span className="text-[var(--secondary)] font-mono text-xs tracking-[0.4em] uppercase whitespace-nowrap opacity-70">
        {brief.tagline}
      </span>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[var(--secondary)]/40 to-transparent" />
    </div>
  );
}

export default function Page() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const heroRev = useScrollReveal();
  const featRev = useScrollReveal();
  const gallRev = useScrollReveal();
  const prodRev = useScrollReveal();
  const abouRev = useScrollReveal();
  const testRev = useScrollReveal();
  const contRev = useScrollReveal();

  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  return (
    <main className="relative">
      {/* HEADER */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[var(--primary)]/95 backdrop-blur-xl py-4 shadow-2xl' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-[var(--secondary)] flex items-center justify-center font-heading font-black text-black text-xl rounded-sm group-hover:rotate-12 transition-transform">P</div>
            <span className="font-heading font-bold text-xl tracking-tighter text-white uppercase">The Palace</span>
          </a>
          
          <nav className="hidden md:flex items-center gap-10">
            {['Services', 'Gallery', 'About', 'Contact'].map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} className="text-white/60 hover:text-[var(--secondary)] font-medium text-sm tracking-widest uppercase transition-colors">
                {link}
              </a>
            ))}
            <a href="#contact" className="bg-[var(--secondary)] text-black px-6 py-2.5 font-bold text-sm rounded-full hover:brightness-110 transition-all">
              Book Now
            </a>
          </nav>

          <button onClick={() => setMobileMenu(true)} className="md:hidden text-white">
            <Menu size={28} />
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div className={`fixed inset-0 z-[100] bg-[var(--primary)] transition-transform duration-500 transform ${mobileMenu ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-8 flex justify-between items-center">
          <div className="font-heading font-black text-[var(--secondary)] text-2xl uppercase">The Palace</div>
          <button onClick={() => setMobileMenu(false)} className="text-white"><X size={32} /></button>
        </div>
        <div className="flex flex-col items-center justify-center h-[70vh] gap-8">
          {['Services', 'Gallery', 'About', 'Contact'].map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setMobileMenu(false)} className="text-3xl font-heading font-bold text-white uppercase tracking-tighter">
              {link}
            </a>
          ))}
          <a href="#contact" onClick={() => setMobileMenu(false)} className="mt-8 bg-[var(--secondary)] text-black px-12 py-4 font-bold text-lg rounded-full">
            Book Your Session
          </a>
        </div>
      </div>

      {/* HERO SECTION */}
      <section id="hero" ref={heroRev.ref} className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-[var(--primary)] via-[var(--primary)]/95 to-[var(--secondary)]/15 px-6 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[32rem] h-[32rem] bg-[var(--secondary)]/10 rounded-full blur-[120px] pointer-events-none animate-float" />
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-[var(--secondary)]/5 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-10 max-w-4xl max-h-[60vh] rounded-[4rem] overflow-hidden rotate-3">
          <SafeImage src={brief.heroImage.url} alt={brief.name} fill className="object-cover" priority />
        </div>

        <div className={`relative z-10 text-center max-w-5xl transition-all duration-1000 ${heroRev.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h1 className="font-heading text-6xl md:text-[7vw] font-black text-white leading-[0.9] tracking-tight mb-8">
            Define Your <span className="text-[var(--secondary)]">Elegance</span> at The Palace
          </h1>
          <p className="text-white/60 text-lg md:text-2xl max-w-2xl mx-auto leading-relaxed mb-12 font-light">
            Expert braiding, wig installations, and nail services tailored for the Lagos elite. Get that sharp royal look you deserve.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <a href="#contact" className="bg-[var(--secondary)] text-black px-12 py-5 font-bold text-lg hover:scale-105 transition-all rounded-full shadow-2xl shadow-[var(--secondary)]/20">
              Book Your Session
            </a>
            <a href="#services" className="border border-white/20 text-white px-12 py-5 font-medium text-lg hover:bg-white/5 transition-all rounded-full backdrop-blur-sm">
              Explore Menu
            </a>
          </div>
        </div>
      </section>

      {/* FEATURES - F-BENTO */}
      <section id="features" ref={featRev.ref} className="py-28 px-6 bg-[var(--primary)]">
        <div className="max-w-6xl mx-auto">
          <h2 className={`font-heading text-5xl font-black text-white mb-4 transition-all duration-700 ${featRev.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>The Palace Experience</h2>
          <p className="text-white/40 mb-16 text-lg tracking-wide uppercase font-medium">Why our clients choose royalty every time</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`md:col-span-2 bg-[var(--secondary)]/10 rounded-3xl p-10 border border-[var(--secondary)]/20 hover:border-[var(--secondary)]/40 transition-all duration-500 flex flex-col justify-between group min-h-[300px] ${featRev.isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
              <div className="w-14 h-14 rounded-2xl bg-[var(--secondary)]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Gem className="text-[var(--secondary)]" size={32} />
              </div>
              <div>
                <h3 className="font-heading text-4xl font-black text-white mb-4">Premium Products</h3>
                <p className="text-white/60 text-lg leading-relaxed max-w-xl">We use only the finest hair care and nail products available globally to ensure your beauty lasts and your health is protected.</p>
              </div>
            </div>
            
            {features.slice(0, 2).map((f, i) => (
              <div key={i} style={{ transitionDelay: `${(i + 1) * 200}ms` }} className={`bg-white/5 rounded-3xl p-8 border border-white/8 hover:bg-white/10 hover:border-white/20 transition-all duration-500 flex flex-col justify-between min-h-[300px] ${featRev.isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                  <f.icon className="text-[var(--secondary)]" size={24} />
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-bold text-white mb-2">{f.title}</h3>
                  <p className="text-white/45 leading-relaxed">{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* GALLERY - BONUS GALLERY SECTION */}
      <section id="gallery" ref={gallRev.ref} className="py-28 px-6 bg-[var(--primary)]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="font-heading text-6xl font-black text-white leading-none">Our Masterpieces</h2>
              <p className="text-white/40 mt-4 text-xl italic">A glimpse of the magic we create daily</p>
            </div>
            <a href="#contact" className="text-[var(--secondary)] font-black text-sm tracking-[0.3em] uppercase border-b border-[var(--secondary)]/40 pb-2 hover:border-[var(--secondary)] transition-all">Get Featured →</a>
          </div>
          
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {galleryImages.map((src, i) => (
              <div key={i} style={{ transitionDelay: `${i * 100}ms` }} className={`break-inside-avoid group relative rounded-3xl overflow-hidden transition-all duration-1000 ${gallRev.isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-12 blur-sm'}`}>
                <SafeImage src={src} alt={`Work ${i + 1}`} width={600} height={800} className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                  <span className="text-white font-heading text-xl font-bold">Palace Signature Styling</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES - P-ASYMMETRIC */}
      <section id="services" ref={prodRev.ref} className="py-28 px-6 bg-[var(--primary)]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-16">
            <h2 className="font-heading text-5xl md:text-7xl font-black text-white max-w-sm leading-[0.85]">Service Menu</h2>
            <p className="text-white/40 max-w-[240px] text-right hidden md:block text-sm uppercase tracking-widest font-bold">Exquisite treatments for hair and nails</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Featured Product */}
            <div className={`md:col-span-7 group relative rounded-[2.5rem] overflow-hidden h-[500px] transition-all duration-700 ${prodRev.isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
              <SafeImage src={products[0].image} alt={products[0].name} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-0 p-10 w-full">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="bg-[var(--secondary)] text-black px-4 py-1 rounded-full text-xs font-black uppercase mb-4 inline-block">Best Seller</span>
                    <h3 className="font-heading text-4xl font-black text-white">{products[0].name}</h3>
                    <p className="text-white/60 mt-3 max-w-xs">{products[0].description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[var(--secondary)] font-black text-3xl mb-4">{products[0].price}</p>
                    <a href="#contact" className="inline-block bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-[var(--secondary)] transition-colors">Book Now</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Small Grid */}
            <div className="md:col-span-5 grid grid-rows-2 gap-6">
              {products.slice(1, 3).map((p, i) => (
                <div key={i} style={{ transitionDelay: `${(i + 1) * 150}ms` }} className={`group relative rounded-[2rem] overflow-hidden transition-all duration-700 ${prodRev.isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
                  <SafeImage src={p.image} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-0 p-6 flex justify-between items-end w-full">
                    <div>
                      <h3 className="font-heading text-2xl font-black text-white">{p.name}</h3>
                      <p className="text-[var(--secondary)] font-bold text-lg mt-1">{p.price}</p>
                    </div>
                    <a href="#contact" className="text-white/60 hover:text-white transition-colors uppercase text-xs font-black tracking-widest border-b border-white/20 pb-1">Select →</a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`mt-6 transition-all duration-700 delay-500 ${prodRev.isVisible ? 'opacity-100' : 'opacity-0'}`}>
             <div className="group relative rounded-[2rem] overflow-hidden h-[300px] w-full">
                <SafeImage src={products[3].image} alt={products[3].name} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center">
                   <h3 className="font-heading text-4xl font-black text-white uppercase italic tracking-tighter">{products[3].name}</h3>
                   <p className="text-white/70 mt-2 max-w-lg">{products[3].description}</p>
                   <p className="text-[var(--secondary)] font-black text-2xl mt-4">{products[3].price}</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* ABOUT - V9 STATS REVEAL */}
      <section id="about" ref={abouRev.ref} className="py-28 px-6 bg-[var(--primary)] relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        <div className="max-w-6xl mx-auto relative z-10 grid md:grid-cols-2 gap-20 items-center">
          <div className={`transition-all duration-1000 ${abouRev.isVisible ? 'opacity-100 -translate-x-0' : 'opacity-0 -translate-x-20'}`}>
            <span className="text-[var(--secondary)] font-mono text-xs tracking-[0.5em] uppercase mb-6 block">Legacy of Excellence</span>
            <h2 className="font-heading text-5xl md:text-6xl font-black text-white leading-tight mb-8">Crafting Beauty Since 2020</h2>
            <p className="text-white/50 text-xl leading-relaxed mb-10">
              The Beauty Palace of AY began with a simple mission: to provide world-class hair and nail services in a space that feels like royalty. Our dedication to precision and style has made us a staple in the Lagos beauty scene.
            </p>
            <div className="flex gap-12 border-t border-white/10 pt-10">
              {stats.map((s, i) => (
                <div key={i} style={{ transitionDelay: `${i * 150}ms` }} className={`transition-all duration-1000 ${abouRev.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  <p className="font-heading text-5xl font-black text-[var(--secondary)]">{s.number}</p>
                  <p className="text-white/40 text-xs uppercase tracking-widest mt-2">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className={`relative transition-all duration-1000 delay-300 ${abouRev.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
            <div className="aspect-square relative rounded-3xl overflow-hidden shadow-2xl group">
              <SafeImage src="https://images.unsplash.com/photo-1658562412479-4bfd84dda0c2" alt="Salon Interior" fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-[var(--secondary)]/10 mix-blend-overlay" />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-[var(--secondary)] p-8 rounded-2xl hidden lg:block shadow-2xl">
              <div className="flex gap-1 mb-2">
                {[1,2,3,4,5].map(i => <Star key={i} size={14} className="fill-black text-black" />)}
              </div>
              <p className="text-black font-bold text-sm">"The only palace where everyone<br/>leaves with a crown."</p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS - T-SLIDER */}
      <section id="testimonials" ref={testRev.ref} className="py-28 bg-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-16">
          <h2 className="font-heading text-6xl font-black text-white text-center">Palace Diaries</h2>
        </div>
        <div className="w-full overflow-hidden">
          <div className="flex w-[200%] gap-6 animate-slide-left hover:[animation-play-state:paused]">
            {[...testimonials, ...testimonials].map((t, i) => (
              <div key={i} className="w-80 md:w-[450px] shrink-0 bg-[var(--primary)] border border-white/5 rounded-[2.5rem] p-10 relative group">
                <div className="absolute top-8 right-10 text-[var(--secondary)]/20 font-black text-8xl font-heading leading-none">“</div>
                <div className="relative z-10">
                  <div className="flex gap-1.5 mb-8">
                    {[1,2,3,4,5].map(n => <div key={n} className="w-1.5 h-1.5 rounded-full bg-[var(--secondary)]" />)}
                  </div>
                  <p className="text-white/80 text-xl leading-relaxed italic mb-10">&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center gap-4 border-t border-white/5 pt-8">
                    <div className="w-14 h-14 rounded-full bg-[var(--secondary)] flex items-center justify-center text-black font-black text-xl border-4 border-[var(--primary)] group-hover:rotate-6 transition-transform">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-heading font-bold text-white text-lg leading-none">{t.name}</p>
                      <p className="text-[var(--secondary)] text-xs font-mono tracking-widest uppercase mt-1">{t.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT - C3 MINIMAL CENTERED */}
      <section id="contact" ref={contRev.ref} className="py-32 px-6 bg-[var(--primary)] relative">
        <div className="max-w-3xl mx-auto text-center">
          <div className={`transition-all duration-1000 ${contRev.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <p className="text-[var(--secondary)] font-mono text-xs tracking-[0.5em] uppercase mb-6 font-bold">Appointment</p>
            <h2 className="font-heading text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter">Secure Your Throne</h2>
            <p className="text-white/40 mb-16 text-xl max-w-xl mx-auto leading-relaxed">Ready for a transformation? Message us on WhatsApp or fill out the form below. We'll handle the rest.</p>
          </div>
          
          <div className={`text-left transition-all duration-1000 delay-300 ${contRev.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            {sent ? (
              <div className="flex flex-col items-center justify-center p-16 text-center animate-scaleIn bg-white/5 rounded-[3rem] border border-white/10 shadow-3xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--secondary)]/10 to-transparent opacity-50" />
                <div className="w-24 h-24 rounded-full bg-[var(--secondary)]/20 flex items-center justify-center mb-8 border border-[var(--secondary)]/40 relative z-10">
                  <CheckCheck size={40} className="text-[var(--secondary)]" />
                </div>
                <h3 className="font-heading text-4xl font-black text-white mb-4 relative z-10">Request Received</h3>
                <p className="text-white/60 max-w-sm text-lg relative z-10">A Palace representative will reach out shortly to confirm your booking.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 p-10 md:p-14 rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden backdrop-blur-md">
                <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--secondary)]/10 blur-[100px] rounded-full pointer-events-none" />
                <div className="relative z-10">
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    {(['name', 'email'] as const).map(field => (
                      <div key={field} className="relative group">
                        <input
                          type={field === 'email' ? 'email' : 'text'}
                          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                          value={form[field]}
                          onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))}
                          required
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/30 text-lg outline-none transition-all duration-300 focus:bg-white/10 focus:border-[var(--secondary)] group-hover:border-white/20"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mb-6 relative group">
                    <input
                      type="text"
                      placeholder="Phone (WhatsApp preferred)"
                      value={form.phone}
                      onChange={e => setForm(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/30 text-lg outline-none transition-all duration-300 focus:bg-white/10 focus:border-[var(--secondary)] group-hover:border-white/20"
                    />
                  </div>
                  <div className="mb-8 relative group">
                    <textarea 
                      rows={4} 
                      placeholder="Service interest (e.g., Knotless Braids, Wig Revamp)"
                      value={form.message}
                      onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/30 text-lg outline-none resize-none transition-all duration-300 focus:bg-white/10 focus:border-[var(--secondary)] group-hover:border-white/20"
                    />
                  </div>
                  <button type="submit" disabled={loading}
                    className="w-full bg-[var(--secondary)] text-black py-5 rounded-2xl font-black text-xl hover:brightness-110 hover:shadow-[0_0_40px_rgba(212,175,55,0.3)] transition-all duration-500 disabled:opacity-60 flex justify-center items-center gap-4 group">
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="animate-spin" size={24} /> Processing...
                      </span>
                    ) : (
                      <>
                        Book Your Throne <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[var(--primary)] border-t border-white/5 pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="md:col-span-1">
            <a href="#hero" className="flex items-center gap-2 mb-8 group">
              <div className="w-12 h-12 bg-[var(--secondary)] flex items-center justify-center font-heading font-black text-black text-2xl rounded-sm">P</div>
              <span className="font-heading font-bold text-2xl tracking-tighter text-white uppercase">The Palace</span>
            </a>
            <p className="text-white/40 leading-relaxed max-w-xs mb-8">
              Transforming beauty into a royal reality for the modern Lagos woman. Your crown is safe with us.
            </p>
            <div className="flex gap-4">
              <a href={`https://instagram.com/${brief.contact.instagram}`} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-[var(--secondary)] hover:border-[var(--secondary)] transition-all">
                <Instagram size={18} />
              </a>
              <a href={`https://wa.me/${brief.contact.whatsapp}`} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-[var(--secondary)] hover:border-[var(--secondary)] transition-all">
                <Phone size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-sm">Services</h4>
            <ul className="space-y-4 text-white/40 text-sm">
              <li><a href="#services" className="hover:text-white transition-colors">Knotless Braids</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Wig Installations</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Artisan Nails</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Hair Revamp</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-sm">Palace</h4>
            <ul className="space-y-4 text-white/40 text-sm">
              <li><a href="#about" className="hover:text-white transition-colors">Our Story</a></li>
              <li><a href="#gallery" className="hover:text-white transition-colors">Gallery</a></li>
              <li><a href="#testimonials" className="hover:text-white transition-colors">Reviews</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Location</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-sm">Locate Us</h4>
            <div className="flex gap-4 items-start text-white/40 text-sm mb-6">
              <MapPin className="shrink-0 text-[var(--secondary)]" size={18} />
              <p>Lagos, Nigeria<br/>The Heart of Victoria Island</p>
            </div>
            <div className="flex gap-4 items-center text-white/40 text-sm">
              <Phone className="shrink-0 text-[var(--secondary)]" size={18} />
              <p>{brief.contact.whatsapp}</p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 gap-6">
          <p className="text-white/20 text-xs font-mono uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} The Beauty Palace of AY. All Royalty Reserved.
          </p>
          <div className="flex gap-8 text-[10px] font-mono uppercase tracking-[0.3em] text-white/20">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </footer>
    </main>
  );
}