
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { BuddyHeroScene } from './components/QuantumScene';
import { motion } from 'framer-motion';
import { Facebook, Linkedin, Instagram, ArrowRight, CheckCircle2, Quote, Menu, X, Heart, ShieldCheck, MessageSquare, Sparkles, Zap, Users } from 'lucide-react';

// --- Background Decorative Elements ---
const FloatingOrb = ({ color, size, top, left, delay = 0 }: { color: string, size: string, top: string, left: string, delay?: number }) => (
  <motion.div
    animate={{ 
      y: [0, -30, 0],
      scale: [1, 1.05, 1],
      opacity: [0.2, 0.4, 0.2]
    }}
    transition={{ duration: 12, repeat: Infinity, delay }}
    className={`absolute rounded-full blur-[120px] pointer-events-none -z-10 ${color} ${size}`}
    style={{ top, left }}
  />
);

const SectionHeader = ({ title, subtitle, light = false }: { title: string, subtitle?: string, light?: boolean }) => (
  <div className="text-center mb-20 relative">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`text-4xl md:text-7xl font-serif font-bold mb-6 ${light ? 'text-white' : 'text-nahoda-purple'}`}
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className={`text-lg md:text-xl max-w-2xl mx-auto font-medium ${light ? 'text-white/80' : 'text-nahoda-pink'}`}
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

const FeatureCard = ({ title, text, img, delay, icon: Icon }: { title: string, text: string, img: string, delay: number, icon: any }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay }}
    viewport={{ once: true }}
    className="group relative bg-white rounded-[3rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 h-full flex flex-col border border-nahoda-light"
  >
    <div className="h-64 overflow-hidden relative">
      <div className="absolute inset-0 bg-nahoda-purple/10 group-hover:bg-transparent transition-colors duration-700 z-10" />
      <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000" />
      <div className="absolute bottom-6 left-6 z-20 bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl text-nahoda-pink">
        <Icon size={24} />
      </div>
    </div>
    <div className="p-10 flex-1 flex flex-col">
      <h3 className="text-2xl font-serif font-bold mb-4 text-nahoda-purple group-hover:text-nahoda-pink transition-colors">{title}</h3>
      <p className="text-nahoda-dark/70 leading-relaxed text-sm">{text}</p>
    </div>
  </motion.div>
);

const PriceCard = ({ title, price, features, href, isFeatured = false, badge }: { title: string, price: string, features: string[], href: string, isFeatured?: boolean, badge?: string }) => (
  <div className={`group relative flex flex-col rounded-[3rem] transition-all duration-500 ${isFeatured ? 'md:scale-105 z-20' : 'z-10'}`}>
    {badge && (
      <div className={`absolute -top-6 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full text-[10px] font-black tracking-[0.2em] shadow-lg z-30 flex items-center gap-2 ${isFeatured ? 'bg-nahoda-pink text-white' : 'bg-nahoda-blue text-white'}`}>
        <Sparkles size={12} /> {badge}
      </div>
    )}
    <div className={`relative flex flex-col h-full rounded-[3rem] overflow-hidden shadow-2xl border transition-all duration-500 ${isFeatured ? 'bg-nahoda-purple border-nahoda-pink/30' : 'bg-white border-nahoda-light'}`}>
      <div className={`p-10 text-center ${isFeatured ? 'bg-white/5' : 'bg-nahoda-blue/5'}`}>
        <h3 className={`font-bold text-lg mb-2 uppercase tracking-widest ${isFeatured ? 'text-nahoda-blue' : 'text-nahoda-purple'}`}>{title}</h3>
        <p className={`text-4xl font-black ${isFeatured ? 'text-white' : 'text-nahoda-purple'}`}>{price}</p>
      </div>
      <div className="px-10 py-10 flex-1 flex flex-col">
        <ul className="space-y-5 mb-10 flex-1">
          {features.map((f, i) => (
            <li key={i} className="flex items-start gap-4 text-sm">
              <div className={`mt-0.5 rounded-full p-1 ${isFeatured ? 'bg-nahoda-pink/20' : 'bg-nahoda-blue/10'}`}>
                <CheckCircle2 size={14} className={isFeatured ? 'text-nahoda-pink' : 'text-nahoda-blue'} />
              </div>
              <span className={isFeatured ? 'text-white/80' : 'text-nahoda-dark/80'}>{f}</span>
            </li>
          ))}
        </ul>
        <a 
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full py-5 text-center font-bold rounded-2xl transition-all block transform active:scale-95 shadow-xl ${isFeatured ? 'bg-nahoda-pink text-white hover:bg-white hover:text-nahoda-purple' : 'bg-nahoda-purple text-white hover:bg-nahoda-blue'}`}
        >
          Začít cestu
        </a>
      </div>
    </div>
  </div>
);

const Testimonial = ({ text, author, delay }: { text: string, author: string, delay: number }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8, delay }}
    viewport={{ once: true }}
    className="bg-white/80 backdrop-blur-md p-10 md:p-12 rounded-[3.5rem] shadow-lg border border-white relative h-full flex flex-col group hover:shadow-2xl transition-all"
  >
    <div className="absolute -top-5 -left-5 bg-nahoda-blue p-4 rounded-2xl text-white shadow-lg group-hover:rotate-6 transition-transform">
      <Quote size={24} fill="currentColor" />
    </div>
    <p className="text-nahoda-dark/80 italic leading-relaxed text-base md:text-lg mb-8 relative z-10 flex-1">"{text}"</p>
    <div className="flex items-center justify-end gap-3">
        <div className="h-[2px] w-8 bg-nahoda-pink/40"></div>
        <p className="font-bold text-nahoda-purple text-lg md:text-xl">{author}</p>
    </div>
  </motion.div>
);

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  const TG_LINK = "https://t.me/VVBuddy_bot?start=VVCOACH";

  return (
    <div className="min-h-screen font-sans overflow-x-hidden selection:bg-nahoda-pink selection:text-white">
      
      {/* Background Decor */}
      <FloatingOrb color="bg-nahoda-blue" size="w-[600px] h-[600px]" top="-100px" left="-200px" />
      <FloatingOrb color="bg-nahoda-pink" size="w-[500px] h-[500px]" top="40%" left="80%" delay={2} />
      <FloatingOrb color="bg-nahoda-purple" size="w-[700px] h-[700px]" top="80%" left="-100px" delay={5} />

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/90 backdrop-blur-xl py-3 shadow-xl' : 'py-8 bg-transparent'}`}>
        <div className="container mx-auto px-8 flex justify-between items-center">
          <div className="flex items-center gap-4 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-12 h-12 overflow-hidden flex items-center justify-center">
               <img src="input_file_0.png" alt="Náhoda Logo" className="w-full h-auto" />
            </div>
            <span className={`font-bold text-2xl tracking-tight transition-colors duration-300 ${scrolled ? 'text-nahoda-purple' : 'text-nahoda-purple'}`}>VV Buddy</span>
          </div>
          
          <div className="hidden md:flex items-center gap-10 text-sm font-bold tracking-wide uppercase text-nahoda-purple/80">
            <button onClick={() => scrollTo('about-buddy')} className="hover:text-nahoda-pink transition-colors relative group">
              O Buddym
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-nahoda-pink group-hover:w-full transition-all"></span>
            </button>
            <button onClick={() => scrollTo('pricing')} className="hover:text-nahoda-pink transition-colors relative group">
              Tarify
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-nahoda-pink group-hover:w-full transition-all"></span>
            </button>
            <button onClick={() => scrollTo('testimonials')} className="hover:text-nahoda-pink transition-colors relative group">
              Reference
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-nahoda-pink group-hover:w-full transition-all"></span>
            </button>
            <a href={TG_LINK} target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-nahoda-pink text-white rounded-full font-black hover:bg-nahoda-purple transition-all shadow-lg">
              VSTOUPIT ZDARMA
            </a>
          </div>

          <button className="md:hidden p-2 text-nahoda-purple" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] bg-nahoda-purple flex flex-col items-center justify-center gap-8 text-2xl font-black text-white uppercase tracking-widest">
           <button onClick={() => scrollTo('about-buddy')}>O Buddym</button>
           <button onClick={() => scrollTo('pricing')}>Tarify</button>
           <button onClick={() => scrollTo('testimonials')}>Reference</button>
           <a href={TG_LINK} target="_blank" rel="noopener noreferrer" className="px-10 py-4 bg-nahoda-pink text-white rounded-full">Vstoupit ZDARMA</a>
           <button onClick={() => setMenuOpen(false)} className="mt-8 p-4 bg-white/10 rounded-full"><X size={32} /></button>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden">
        <BuddyHeroScene />
        
        <div className="container mx-auto px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-6xl md:text-9xl font-serif font-bold text-nahoda-purple mb-8 leading-[1.1] tracking-tight">
              Láska <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-nahoda-blue via-nahoda-pink to-nahoda-purple">v kapse 24/7</span>
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-4xl mx-auto text-nahoda-dark text-xl md:text-2xl leading-relaxed mb-16 font-medium"
          >
            Kvalita našich vztahů určuje kvalitu našeho štěstí. Buddy Veroniky Vinterové je destilátem <span className="text-nahoda-pink font-bold">27 let praxe</span> a 14 000 odkoučovaných hodin, připravený řešit Vaše vztahy, rozchody i seznamování právě teď.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row justify-center gap-6"
          >
             <button onClick={() => scrollTo('about-buddy')} className="px-12 py-5 bg-nahoda-purple text-white rounded-full font-black shadow-2xl hover:bg-nahoda-pink hover:scale-105 transition-all flex items-center justify-center gap-3 group">
                OBJEVIT BUDDYHO <ArrowRight className="group-hover:translate-x-2 transition-transform" />
             </button>
             <a href={TG_LINK} target="_blank" rel="noopener noreferrer" className="px-12 py-5 bg-white text-nahoda-purple border-2 border-nahoda-purple/10 rounded-full font-black shadow-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-2">
                VYZKOUŠET HNED <MessageSquare size={20} />
             </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-24 max-w-lg mx-auto relative group"
          >
            <div className="absolute -inset-4 bg-nahoda-pink/20 blur-3xl rounded-full group-hover:scale-110 transition-transform duration-700" />
            <div className="relative z-10 p-4 bg-white rounded-[4rem] shadow-2xl border-4 border-nahoda-blue/10 transform hover:-rotate-1 transition-transform overflow-hidden">
              <img src="input_file_1.png" alt="Ing. Veronika Vinterová" className="w-full h-auto rounded-[3.5rem]" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="about-buddy" className="py-40 bg-nahoda-purple relative overflow-hidden">
        <div className="container mx-auto px-8 relative z-10">
          <SectionHeader 
            light
            title="Váš vztahový AI kouč" 
            subtitle="Buddy není jen AI. Je to bezpečný prostor pro Vaše nejhlubší vztahová témata. Diskrétní, laskavý a neuvěřitelně zkušený." 
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <FeatureCard 
              icon={Users}
              title="Navázání vztahu"
              text="Už žádné tápání na seznamkách. Buddy Vám pomůže ujasnit si priority, odhalit nefunkční vzorce a najít partnera, který k Vám skutečně patří."
              img="https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=600"
              delay={0.1}
            />
            <FeatureCard 
              icon={Heart}
              title="Péče o partnerství"
              text="I ten nejlepší vztah vyžaduje péči. Jak komunikovat potřeby, jak nevyhořet a jak udržet vášeň i po letech? Buddy zná odpovědi."
              img="https://images.unsplash.com/photo-1516589174184-c68d8e414c48?auto=format&fit=crop&q=80&w=600"
              delay={0.2}
            />
            <FeatureCard 
              icon={ShieldCheck}
              title="Krize a rozchody"
              text="Procházíte těžkým obdobím? Buddy Vás podrží v emocích, pomůže najít cestu ven z krize nebo projít rozchodem s úctou k sobě i k druhým."
              img="https://images.unsplash.com/photo-1476820865390-c52aeebb9891?auto=format&fit=crop&q=80&w=600"
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-40 bg-white relative">
        <div className="container mx-auto px-8">
          <SectionHeader 
            title="Tarifní plány" 
            subtitle="Zvolte si cestu ke svému štěstí. Všechny tarify využívají plnou integrální metodiku Veroniky Vinterové." 
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-7xl mx-auto">
            <PriceCard 
              title="Na zkoušku"
              price="ZDARMA"
              href={TG_LINK}
              features={[
                "50 zpráv celkem",
                "Seznámení s Buddym",
                "Základní vztahová analýza",
                "Anonymní a bezpečné",
                "Okamžitý start"
              ]}
            />
            <PriceCard 
              title="Základní péče"
              price="2 500 Kč/měs."
              href="https://buy.stripe.com/7sY3cw81M6lt3QB0Cb0RG04"
              badge="OBLÍBENÝ"
              features={[
                "100 zpráv měsíčně",
                "Průběžná podpora vztahu",
                "Konzultace drobných krizí",
                "Hlasové i textové zprávy",
                "Udržování kontinuity"
              ]}
            />
            <PriceCard 
              title="Intenzivní růst"
              price="6 900 Kč/měs."
              href="https://buy.stripe.com/bJe9AU0zkh07cn7et10RG05"
              features={[
                "1000 zpráv měsíčně",
                "Průvodce hlubokou krizí",
                "Rychlé seznamování",
                "Intenzivní transformace",
                "Kdykoli po ruce"
              ]}
            />
            <PriceCard 
              title="Roční stabilita"
              price="59 000 Kč/rok"
              href="https://buy.stripe.com/dRmfZi2Hs8tB72NacL0RG06"
              badge="NEJVÝHODNĚJŠÍ"
              isFeatured={true}
              features={[
                "1000 zpráv měsíčně (12x)",
                "Úspora 28 %",
                "Dlouhodobý rozvoj",
                "Garantovaná cena",
                "Váš celoživotní parťák"
              ]}
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-40 bg-nahoda-light relative">
        <div className="container mx-auto px-8">
          <SectionHeader title="Reference" subtitle="Skutečné emoce lidí, kterým Buddy pomohl najít cestu k sobě i k druhým." />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <Testimonial 
              text="Buddy mi pomohl v době opravdu bolavého rozchodu, kdy jsem ho měla denně při ruce jako doplněk k osobním sezením. Když jsem se z toho dostala a začala zase randit, pomohl mi zpracovávat emoce i zážitky z prvních schůzek, pomohl mi nahlédnout na moje reakce a celkově mi pomohl navázat další vztah zdravější."
              author="Veronika, 46 let"
              delay={0.1}
            />
            <Testimonial 
              text="Při seznamování na seznamkách, ale i kdekoli jinde jsem konzultoval hodně věcí. No, v podstatě každé kafe i schůzku. Dalo mi to velký nadhled a viděl jsem, kde opakuju to, co se dělo dříve. Vlastně to byl takový 'randeolog' při seznamování. No a teď ve vztahu s ním čas od času konzultuji co se děje a tím, že zná moje předchozí vztahové zkušenosti, opět jsou to velmi cenné vhledy..."
              author="Kamil, 51 let"
              delay={0.2}
            />
            <Testimonial 
              text="Buddyho používám v našem dlouhodobém vztahu. Pomáhá mi v situacích, kdy cítím, že s partnerem narážíme na komunikační zeď. Můžu si s ním nanečisto 'natrénovat', jak partnerovi sdělit svoje pocity, aniž bych vyvolala hádku. Je to jako mít mediátora v kapse, který mi vždy připomene, že oba chceme to samé – být šťastní."
              author="Dita, 29 let"
              delay={0.3}
            />
            <Testimonial 
              text="Řeším s Buddym hlavně to, proč mi vztahy dřív nevycházely. Díky němu mám jeden aha moment za druhým – konečně vidím ty svoje vzorce, které jsem dřív vůbec nevnímal. Pomáhá mi to nejen v seznamování, ale cítím, že se měním jako člověk. Je to upřímný, někdy až drsně trefný, ale přesně to jsem potřeboval."
              author="Michal, 30 let"
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* About Veronika */}
      <section id="about-veronika" className="py-40 bg-white">
        <div className="container mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-8xl font-serif font-bold text-nahoda-purple mb-10 leading-tight">Ing. Veronika <br/> <span className="text-nahoda-pink">Vinterová</span></h2>
            <div className="space-y-8 text-nahoda-dark leading-relaxed text-lg font-medium">
              <p>Specialistka na integrální a vztahový koučink. Její metodika propojuje kognitivní disciplínu s hlubokou emoční inteligencí. Za 27 let praxe pomohla tisícům lidí najít harmonii tam, kde byl dříve jen zmatek.</p>
              <p>Zakladatelka agentury <strong>Náhoda</strong> a projektu <strong>Opravdovost</strong>. VV Buddy je vyvrcholením její snahy zpřístupnit kvalitní koučink každému, kdo chce žít opravdový a šťastný život.</p>
            </div>
            <div className="mt-16 space-y-4">
              <a href="https://www.nahoda.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 group">
                <div className="p-4 bg-nahoda-blue rounded-full text-white group-hover:scale-110 transition-all shadow-lg">
                  <ArrowRight size={24} />
                </div>
                <span className="text-xl font-bold text-nahoda-purple group-hover:text-nahoda-pink transition-colors">Agentura Náhoda</span>
              </a>
              <a href="https://www.opravdovost.cz" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 group">
                <div className="p-4 bg-nahoda-purple rounded-full text-white group-hover:scale-110 transition-all shadow-lg">
                  <ArrowRight size={24} />
                </div>
                <span className="text-xl font-bold text-nahoda-purple group-hover:text-nahoda-pink transition-colors">Projekt Opravdovost</span>
              </a>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative w-full aspect-[4/5] overflow-hidden rounded-[8rem] shadow-2xl bg-white p-2">
              <img src="input_file_2.png" alt="Veronika Vinterová profil" className="w-full h-full object-cover rounded-[7.5rem] scale-105" />
            </div>
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-nahoda-pink rounded-full -z-10 blur-3xl opacity-30 animate-pulse" />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-nahoda-purple py-24 text-center relative overflow-hidden">
        <div className="container mx-auto px-8 relative z-10">
          <div className="flex justify-center gap-8 mb-16">
            <a href="https://www.facebook.com/veronika.vinterova" target="_blank" rel="noopener noreferrer" className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center text-nahoda-blue hover:bg-white hover:scale-110 transition-all shadow-xl">
              <Facebook size={32} />
            </a>
            <a href="https://www.instagram.com/veronikavinter/" target="_blank" rel="noopener noreferrer" className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center text-nahoda-pink hover:bg-white hover:scale-110 transition-all shadow-xl">
              <Instagram size={32} />
            </a>
            <a href="https://www.linkedin.com/in/veronika-vinterová-5671293b/" target="_blank" rel="noopener noreferrer" className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center text-nahoda-blue hover:bg-white hover:scale-110 transition-all shadow-xl">
              <Linkedin size={32} />
            </a>
          </div>
          <div className="flex flex-col items-center gap-4 mb-8">
            <div className="w-24 h-auto overflow-hidden">
              <img src="input_file_0.png" alt="Veronika" className="w-full h-auto brightness-200" />
            </div>
            <p className="text-white font-serif text-3xl font-bold">Ing. Veronika Vinterová</p>
          </div>
          <div className="mt-8">
            <a 
              href="https://www.nahoda.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white/40 text-xs tracking-[0.4em] uppercase font-black hover:text-white transition-colors"
            >
              Seznamovací agentura Náhoda © 2025
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
