'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Scissors, 
  Crown, 
  Sparkles, 
  RefreshCw, 
  Users, 
  Award, 
  CheckCheck, 
  Loader2, 
  ArrowRight, 
  Instagram, 
  Mail, 
  MapPin, 
  Menu, 
  X, 
  ImageOff,
  Phone
} from 'lucide-react';

// DESIGN DECISIONS:
// Layout Energy: bold
// Depth Treatment: glassmorphic
// Divider Style: D-RULE
// Typography Personality: refined

const brief = {
  brand: {
    name: "The Beauty Palace of AY",
    tagline: "Redefining Elegance, One Braid at a Time",
    description: "Lagos' premier destination for luxury hair installations, exquisite nail artistry, and professional wig revamping tailored for the modern woman.",
    industry: "beauty",
    region: "nigeria"
  },
  contact: {
    instagram: "thebeautypalaceofay",
    address: "Lagos, Nigeria"
  },
  heroImage: {
    url: "https://images.unsplash.com/photo-1537784755374-7bf81d02f58a?q=80&w=1080"
  }
};

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1537784755374-7bf81d02f58a?q=80&w=1080",
  gallery: [
    "https://images.unsplash.com/photo-1633681121751-e4a0392602b8?q=80&w=1080",
    "https://images.unsplash.com/photo-1633681122703-3ce20f1e978d?q=80&w=1080",
    "https://images.unsplash.com/photo-1633681926035-ec1ac984418a?q=80&w=1080",
    "https://images.unsplash.com/photo-1536524894612-c69d62c6f639?q=80&w=1080",
    "https://images.unsplash.com/photo-1633681138600-295fcd688876?q=80&w=1080",
    "https://images.unsplash.com/photo-1706629503650-cade709d15e3?q=80&w=1080"
  ],
  products: [
    "https://images.unsplash.com/photo-1663582816158-42354522fe15?q=80&w=1080",
    "https://images.unsplash.com/photo-1594254773847-9fce26e950bc?q=80&w=1080",
    "https://images.unsplash.com/photo-1777287216958-84144739db83?q=80&w=1080",
    "https://images.unsplash.com/photo-1713181215534-3b46c62e2018?q=80&w=1080"
  ]
};

const features = [
  { title: "Master Installations", description: "Expert stylists specialized in lace melting and hair security.", icon: Scissors },
  { title: "Precision Braiding", description: "Artisan-level braiding techniques that prioritize your scalp health.", icon: Crown },
  { title: "Luxe Nail Studio", description: "High-end nail care and creative art in a relaxing environment.", icon: Sparkles },
  { title: "Wig Restoration", description: "Professional washing and styling to rejuvenate your hair units.", icon: RefreshCw }
];

const products = [
  { name: "Luxury Lace Installation", description: "Flawless frontal or closure melting for a natural, seamless hairline look.", price: "₦25,000" },
  { name: "Signature Knotless Braids", description: "Neat, lightweight, and long-lasting knotless braids in any length.", price: "₦35,000" },
  { name: "Gel Polish & Custom Nail Art", description: "Premium gel manicure featuring bespoke hand-painted luxury nail designs.", price: "₦12,500" },
  { name: "Elite Wig Revamping", description: "Full treatment, detangling, and styling to bring old wigs back to life.", price: "₦15,000" }
];

const testimonials = [
  { name: "Tolu Eniola", text: "The best knotless braids I have ever had. So neat and didn't hurt my edges at all!", role: "Lagos Client" },
  { name: "Amaka Okafor", text: "My wig revamp was like magic. It looks brand new! Highly recommend the revamping service.", role: "Verified Customer" },
  { name: "Zainab Bello", text: "The nail art is detailed and lasts so long. The black and gold aesthetic of the salon is stunning.", role: "Fashion Influencer" }
];

const stats = [
  { number: "1k+", label: "Happy Queens" },
  { number: "5+", label: "Years Experience" },
  { number: "100%", label: "Glow Up Rate" }
];

function SafeImage({ src, alt, fill, width, height, className, priority, fallbackClassName }: {
  src: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; priority?: boolean; fallbackClassName?: string;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-secondary to-black ${fallbackClassName ?? className ?? ''}`}>
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
  }, []);
  return { ref, isVisible };
};

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <main className="bg-black text-white selection:bg-primary selection:text-black">
      {/* Header */}
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled ? 'bg-secondary/95 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#home" className="group flex items-center gap-2">
            <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-lg rotate-3 group-hover:rotate-0 transition-transform">
              <span className="text-black font-heading text-xl font-bold">AY</span>
            </div>
            <span className="font-heading text-2xl font-bold tracking-tight hidden sm:block">Beauty Palace</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {['Home', 'Services', 'Gallery', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium tracking-widest uppercase hover:text-primary transition-colors">
                {item}
              </a>
            ))}
            <a href="#contact" className="bg-primary text-black px-6 py-2.5 rounded-full font-bold text-sm hover:brightness-110 transition-all hover:scale-105">
              Book Now
            </a>
          </div>

          <button onClick={() => setMenuOpen(true)} className="md:hidden text-white">
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-[200] transition-all duration-700 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className={`absolute inset-0 bg-black/80 backdrop-blur-md`} onClick={() => setMenuOpen(false)} />
        <div className={`absolute right-0 top-0 h-full w-[80%] max-w-sm bg-secondary p-8 shadow-2xl transition-transform duration-500 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex justify-between items-center mb-12">
            <span className="font-heading text-2xl font-bold text-primary">AY Palace</span>
            <button onClick={() => setMenuOpen(false)} className="text-white"><X size={32} /></button>
          </div>
          <div className="flex flex-col gap-8">
            {['Home', 'Services', 'Gallery', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="text-3xl font-heading font-bold hover:text-primary transition-colors">
                {item}
              </a>
            ))}
            <a href="#contact" onClick={() => setMenuOpen(false)} className="mt-8 bg-primary text-black text-center py-4 rounded-xl font-bold text-lg">
              Book Your Throne
            </a>
          </div>
        </div>
      </div>

      {/* HERO-C Section */}
      <Hero />

      <SectionDivider />

      {/* Features - F-ICON-GRID */}
      <Features />

      <SectionDivider />

      {/* Gallery - Masonry */}
      <Gallery />

      <SectionDivider />

      {/* Products - P-ASYMMETRIC */}
      <Products />

      <SectionDivider />

      {/* About Section - Horizontal Split */}
      <About />

      <SectionDivider />

      {/* Testimonials - T-SLIDER */}
      <Testimonials />

      <SectionDivider />

      {/* Contact - C3 */}
      <Contact />

      {/* Footer */}
      <Footer />
    </main>
  );
}

function Hero() {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="home" ref={ref} className="min-h-screen grid md:grid-cols-[1fr_1fr] items-stretch bg-black overflow-hidden pt-20">
      <div className={`flex flex-col justify-center px-8 md:px-16 py-24 transition-all duration-1000 ${isVisible ? 'opacity-100 skew-y-0 translate-y-0' : 'opacity-0 skew-y-2 translate-y-8'}`}>
        <p className="text-primary font-mono text-xs tracking-[0.4em] uppercase mb-6 opacity-80">
          Beauty In Nigeria
        </p>
        <h1 className="font-heading text-6xl md:text-[5.5rem] font-bold text-white leading-[0.9] tracking-tighter">
          Your Throne <br/> Awaits at <br/> <span className="text-primary">The Palace</span>
        </h1>
        <p className="text-white/50 mt-8 text-xl max-w-md leading-relaxed font-light italic">
          &ldquo;Sharp transformations for every Queen.&rdquo; Experience the ultimate Lagos beauty evolution.
        </p>
        <div className="flex gap-4 mt-12 flex-wrap">
          <a href="#contact" className="bg-primary text-black px-10 py-4 font-bold text-lg hover:brightness-110 hover:scale-[1.05] transition-all duration-300 rounded-full flex items-center gap-3">
            Book Your Session <ArrowRight size={20} />
          </a>
        </div>
        <div className="mt-20 flex gap-10 border-t border-white/10 pt-10">
          {stats.slice(0, 2).map((s, i) => (
            <div key={i}>
              <p className="font-heading text-4xl font-bold text-white">{s.number}</p>
              <p className="text-white/40 text-xs uppercase tracking-widest mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
      <div className={`relative min-h-[50vh] md:min-h-full transition-all duration-1000 ease-out overflow-hidden ${isVisible ? 'max-w-full opacity-100' : 'max-w-0 opacity-0'}`}>
        <SafeImage src={IMAGES.hero} alt="Luxury Salon Lagos" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/20 to-transparent" />
        <div className="absolute bottom-10 right-10 flex flex-col items-end">
          <div className="w-16 h-16 rounded-full border-2 border-primary/30 flex items-center justify-center animate-float">
            <Crown className="text-primary" size={32} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Features() {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="services" ref={ref} className="py-32 px-6 bg-secondary/30 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <h2 className="font-heading text-5xl md:text-7xl font-bold text-white">Our Expertise</h2>
          <p className="text-primary/60 mt-4 text-lg font-mono tracking-widest uppercase">Unmatched Excellence</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => {
            const IconComp = { Scissors, Crown, Sparkles, RefreshCw }[f.icon] || Sparkles;
            return (
              <div key={i} 
                style={{ transitionDelay: `${i * 120}ms` }}
                className={`p-10 rounded-[2rem] border border-white/5 bg-white/[0.02] backdrop-blur-sm
                  hover:bg-primary/5 hover:border-primary/20 transition-all duration-500 group cursor-default
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="mb-8 w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500">
                  <IconComp size={28} />
                </div>
                <h3 className="font-heading font-bold text-white text-2xl leading-tight mb-4">{f.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{f.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="gallery" ref={ref} className="py-32 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <h2 className="font-heading text-5xl md:text-7xl font-bold text-white">The Masterpiece</h2>
            <p className="text-primary mt-2 text-lg italic">Recent transformations from our studio</p>
          </div>
          <div className="flex gap-2">
            {[1,2,3].map(i => <div key={i} className="w-12 h-1 bg-white/10 rounded-full" />)}
          </div>
        </div>
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {IMAGES.gallery.map((src, i) => (
            <div key={i} 
              style={{ transitionDelay: `${i * 80}ms` }}
              className={`break-inside-avoid group relative rounded-3xl overflow-hidden shadow-2xl transition-all duration-1000
                ${isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-6 blur-sm'}`}>
              <SafeImage src={src} alt={`Glow Up ${i + 1}`} width={600} height={800}
                className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-[1.5s]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                <p className="text-primary font-mono text-xs tracking-widest uppercase">Palace Original</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Products() {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="products" ref={ref} className="py-32 px-6 bg-secondary relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[40rem] h-[40rem] bg-primary/5 blur-[150px] rounded-full" />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex items-end justify-between mb-20">
          <h2 className="font-heading text-5xl md:text-7xl font-bold text-white max-w-sm">Service Menu</h2>
          <p className="text-white/30 max-w-xs text-right hidden md:block uppercase font-mono tracking-tighter text-xs">Invest in your crown with our premium beauty packages</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className={`md:col-span-7 group relative rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 ${isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
            <div className="relative h-[500px]">
              <SafeImage src={IMAGES.products[0]} alt={products[0].name} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute bottom-0 p-10">
                <span className="bg-primary text-black px-4 py-1 rounded-full text-xs font-black uppercase mb-4 inline-block">Best Seller</span>
                <h3 className="font-heading text-4xl font-bold text-white">{products[0].name}</h3>
                <div className="flex items-center justify-between mt-4">
                  <p className="text-white/60 text-lg line-clamp-2 max-w-md font-light italic">{products[0].description}</p>
                  <span className="text-primary font-bold text-3xl ml-4 shrink-0">{products[0].price}</span>
                </div>
                <a href="#contact" className="inline-block mt-8 bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-primary transition-colors">Book Installation</a>
              </div>
            </div>
          </div>
          <div className="md:col-span-5 grid grid-rows-2 gap-6">
            {products.slice(1, 3).map((p, i) => (
              <div key={i} 
                style={{ transitionDelay: `${(i + 1) * 200}ms` }}
                className={`group relative rounded-3xl overflow-hidden shadow-xl transition-all duration-700 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
                <div className="relative h-[240px]">
                  <SafeImage src={IMAGES.products[i + 1]} alt={p.name} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  <div className="absolute bottom-0 p-6">
                    <h3 className="font-heading text-2xl font-bold text-white">{p.name}</h3>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-primary font-bold text-xl">{p.price}</span>
                      <a href="#contact" className="text-sm text-white/50 hover:text-primary transition-colors uppercase tracking-widest font-mono">Book →</a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="about" ref={ref} className="py-32 px-6 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
            <h2 className="font-heading text-5xl md:text-7xl font-bold text-white mb-10">The AY Standard</h2>
            <div className="space-y-6">
              <p className="text-white/60 text-xl leading-relaxed font-light italic">
                Located in the heart of Lagos, The Beauty Palace of AY is dedicated to providing high-end beauty services that empower our clients. 
              </p>
              <p className="text-white/50 text-lg leading-relaxed">
                We combine traditional techniques with modern trends to ensure every woman leaves feeling like royalty. From the moment you step in, you are the priority. 
              </p>
            </div>
            <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 gap-8">
              {stats.map((s, i) => (
                <div key={i} 
                  style={{ transitionDelay: `${i * 150}ms` }}
                  className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  <p className="text-primary font-heading text-4xl font-bold">{s.number}</p>
                  <p className="text-white/40 text-xs uppercase tracking-widest mt-2">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={`relative aspect-square rounded-[4rem] overflow-hidden transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-20 scale-90'}`}>
            <SafeImage src={IMAGES.gallery[4]} alt="Beauty Palace Lagos Interior" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700" />
            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] border border-primary/20 rounded-[3rem]" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="py-32 bg-secondary/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-20 text-center">
        <h2 className="font-heading text-5xl md:text-7xl font-bold text-white">Palace Diaries</h2>
        <p className="text-primary/60 mt-4 font-mono uppercase tracking-widest">Client Experiences</p>
      </div>
      <div className="w-full overflow-hidden">
        <div className="flex w-[200%] gap-6 animate-slide-left hover:[animation-play-state:paused]">
          {[...testimonials, ...testimonials].map((t, i) => (
            <div key={i} className="w-[350px] md:w-[450px] shrink-0 bg-secondary border border-white/5 p-12 rounded-[3rem] relative group hover:border-primary/20 transition-all duration-500">
              <div className="flex gap-1.5 mb-8">
                {[1,2,3,4,5].map(n => <div key={n} className="w-1.5 h-1.5 rounded-full bg-primary" />)}
              </div>
              <p className="text-white/80 text-xl leading-relaxed italic mb-10">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-4 pt-8 border-t border-white/5">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-heading font-bold text-xl">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-white text-lg">{t.name}</p>
                  <p className="text-primary/60 text-xs font-mono uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
              <div className="absolute top-8 right-8 text-white/5">
                <Crown size={64} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const { ref, isVisible } = useScrollReveal();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  return (
    <section id="contact" ref={ref} className="py-32 px-6 bg-black">
      <div className={`max-w-3xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        <p className="text-primary font-mono text-xs tracking-[0.4em] uppercase mb-4 opacity-80">Reservations</p>
        <h2 className="font-heading text-5xl md:text-7xl font-bold text-white mb-8">Secure Your Throne</h2>
        <p className="text-white/40 mb-16 text-xl font-light">Book your next transformation. Our team typically responds within 2 hours.</p>
        
        {sent ? (
          <div className="flex flex-col items-center justify-center p-16 text-center animate-scaleIn bg-secondary rounded-[3rem] border border-primary/20 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50" />
            <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-8 border border-primary/40 relative z-10">
              <CheckCheck size={48} className="text-primary" />
            </div>
            <h3 className="font-heading text-4xl font-bold text-white mb-4 relative z-10">Message Received</h3>
            <p className="text-white/60 max-w-sm text-lg relative z-10 italic">Thank you, Queen. Our team will contact you shortly to confirm your session.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="text-left space-y-4 bg-secondary p-8 sm:p-12 rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] rounded-full pointer-events-none" />
            <div className="relative z-10 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input type="text" placeholder="Your Name" required value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/30 focus:border-primary outline-none transition-all" />
                <input type="text" placeholder="Phone Number" required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/30 focus:border-primary outline-none transition-all" />
              </div>
              <input type="email" placeholder="Email Address" required value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/30 focus:border-primary outline-none transition-all" />
              <textarea rows={4} placeholder="Service interested in (e.g. Knotless Braids, Lace Installation)" required value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/30 focus:border-primary outline-none resize-none transition-all" />
              
              <button type="submit" disabled={loading}
                className="w-full bg-primary text-black py-5 rounded-2xl font-bold text-lg hover:brightness-110 transition-all disabled:opacity-50 flex justify-center items-center gap-3">
                {loading ? <Loader2 className="animate-spin" /> : "Request Appointment"}
              </button>
            </div>
          </form>
        )}

        <div className="mt-16 flex flex-wrap justify-center gap-10">
          <a href="https://instagram.com/thebeautypalaceofay" className="flex items-center gap-3 text-white/40 hover:text-primary transition-colors group">
            <Instagram size={20} className="group-hover:rotate-12 transition-transform" />
            <span className="font-mono text-sm uppercase tracking-widest">@thebeautypalaceofay</span>
          </a>
          <div className="flex items-center gap-3 text-white/40">
            <MapPin size={20} />
            <span className="font-mono text-sm uppercase tracking-widest">Lagos, Nigeria</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionDivider() {
  return (
    <div className="py-24 flex items-center gap-8 px-8 max-w-6xl mx-auto">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <span className="text-primary font-mono text-xs tracking-[0.5em] uppercase whitespace-nowrap opacity-50">
        Elegance Redefined
      </span>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-secondary pt-24 pb-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-primary flex items-center justify-center rounded-xl">
                <Crown className="text-black" />
              </div>
              <span className="font-heading text-3xl font-bold">The Palace</span>
            </div>
            <p className="text-white/40 text-lg leading-relaxed max-w-md italic font-light">
              Lagos' premier destination for luxury hair installations and exquisite nail artistry. Redefining elegance, one braid at a time.
            </p>
          </div>
          <div>
            <h4 className="font-heading text-xl font-bold mb-8 text-primary uppercase tracking-widest">Navigation</h4>
            <ul className="space-y-4">
              {['Home', 'Services', 'Gallery', 'Contact'].map(link => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-white/40 hover:text-white transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-heading text-xl font-bold mb-8 text-primary uppercase tracking-widest">Connect</h4>
            <div className="flex gap-4">
              <a href="https://instagram.com/thebeautypalaceofay" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-black transition-all">
                <Instagram size={20} />
              </a>
              <a href="mailto:info@beautyaypalace.com" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-black transition-all">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-xs font-mono uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} The Beauty Palace of AY. All Rights Reserved.
          </p>
          <p className="text-white/20 text-xs font-mono uppercase tracking-[0.2em]">
            Crafted for Royalty in Lagos
          </p>
        </div>
      </div>
    </footer>
  );
}