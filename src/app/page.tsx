"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";
import VIPChat from "@/components/VIPChat";
import { FaLinkedinIn, FaTwitter, FaInstagram } from "react-icons/fa";
import type { Engine } from "tsparticles-engine";


export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("EN");
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [vipChatOpen, setVipChatOpen] = useState(false);
  
  // Add this after the existing useEffect
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileMenuOpen]);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fix for the 'any' type error on line 38
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#080810] to-[#10101a] text-[#e8e6e3] font-serif">
      {/* Floating Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 2 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-black/80 backdrop-blur-md py-2" : "bg-transparent py-3"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-8 flex justify-between items-center">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center"
          >
            <Image
              src="/wc-premium-crest.png"
              alt="WC Monogram"
              width={30}
              height={30}
              className="mr-3"
            />
            <span className="text-[#d4af37] tracking-[0.3em] text-xs font-extralight">WINKNELL CHIVHAYO</span>
          </motion.div>
          
          <div className="hidden md:flex items-center space-x-8">
            {["LEGACY", "EMPIRE", "NETWORK", "COLLECTION", "CONTACT"].map((item, index) => (
              <motion.a
                key={index}
                href={`#${item.toLowerCase()}`}
                whileHover={{ y: -2, color: "#d4af37" }}
                className="text-xs tracking-[0.2em] font-extralight transition-colors duration-300"
              >
                {item}
              </motion.a>
            ))}
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-xs tracking-[0.2em] font-extralight border border-[#d4af37]/30 px-2 py-1 flex items-center"
              >
                {currentLanguage}
                <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 9l-7 7-7-7"></path>
                </svg>
              </motion.button>
              
              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full right-0 mt-1 bg-[#0a0a12] border border-[#d4af37]/20 w-20"
                  >
                    {["EN", "FR", "中文", "العربية"].map((lang, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ backgroundColor: "#d4af37", color: "#0a0a12" }}
                        onClick={() => {
                          setCurrentLanguage(lang);
                          setMenuOpen(false);
                        }}
                        className="block w-full text-left px-3 py-2 text-xs font-extralight transition-colors duration-300"
                      >
                        {lang}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(212, 175, 55, 0.3)" }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#d4af37] text-[#0a0a12] px-4 py-1 text-xs tracking-[0.2em] uppercase font-light hidden md:block"
            >
              Private Access
            </motion.button>
            
            <button 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(true)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </motion.nav>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 md:hidden"
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center p-6 border-b border-[#d4af37]/10">
                <div className="flex items-center">
                  <Image
                    src="/wc-premium-crest.svg"
                    alt="WC Monogram"
                    width={30}
                    height={30}
                    className="mr-3"
                  />
                  <span className="text-[#d4af37] tracking-[0.3em] text-xs font-extralight">WINKNELL CHIVHAYO</span>
                </div>
                <button onClick={() => setMobileMenuOpen(false)}>
                  <svg className="w-6 h-6 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              
              <div className="flex-1 flex flex-col justify-center items-center space-y-10 p-6">
                {["LEGACY", "EMPIRE", "NETWORK", "COLLECTION", "CONTACT"].map((item, index) => (
                  <motion.a
                    key={index}
                    href={`#${item.toLowerCase()}`}
                    whileHover={{ x: 10, color: "#d4af37" }}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-xl tracking-[0.3em] font-extralight transition-colors duration-300"
                  >
                    {item}
                  </motion.a>
                ))}
              </div>
              
              <div className="p-6 border-t border-[#d4af37]/10 flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(212, 175, 55, 0.3)" }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-[#d4af37] text-[#0a0a12] px-8 py-3 text-sm tracking-[0.2em] uppercase font-light"
                >
                  Private Access
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section - Ultra-premium with parallax effect */}
      <header className="relative h-[100vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/billionaire-estate.jpg"
            alt="Private estate"
            fill
            className="object-cover object-top"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50"></div>
          <div className="absolute inset-0 bg-[url('/luxury-pattern.png')] opacity-8 mix-blend-overlay"></div>
          
          {/* Particle Background */}
          <div className="absolute inset-0 z-10">
            <Particles
              id="tsparticles"
              init={particlesInit}
              options={{
                background: {
                  opacity: 0
                },
                fpsLimit: 60,
                particles: {
                  color: {
                    value: "#d4af37"
                  },
                  links: {
                    color: "#d4af37",
                    distance: 150,
                    enable: true,
                    opacity: 0.2,
                    width: 1
                  },
                  move: {
                    direction: "none",
                    enable: true,
                    outModes: {
                      default: "bounce"
                    },
                    random: true,
                    speed: 0.5,
                    straight: false
                  },
                  number: {
                    density: {
                      enable: true,
                      area: 800
                    },
                    value: 30
                  },
                  opacity: {
                    value: 0.3
                  },
                  shape: {
                    type: "circle"
                  },
                  size: {
                    value: { min: 1, max: 3 }
                  }
                },
                detectRetina: true
              }}
            />
          </div>
        </div>
        
        {/* Rest of the hero section remains the same */}
        <div className="container mx-auto px-4 sm:px-8 z-10 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <div className="flex flex-col items-center text-center mb-12">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="w-28 h-28 sm:w-40 sm:h-40 mb-6 sm:mb-8 relative"
              >
                <div className="absolute inset-0 rounded-full border-2 border-[#d4af37]/30 animate-pulse"></div>
                
              </motion.div>
              <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-extralight text-white tracking-widest mb-4 sm:mb-6">
                <span className="text-[#d4af37]">W</span>INKNELL <span className="text-[#d4af37]">C</span>HIVHAYO
              </h1>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mt-4 sm:mt-6 text-[#d4af37] max-w-4xl mx-auto font-extralight tracking-wider text-center italic"
            >
              Global Investor & Visionary Entrepreneur
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex justify-center mt-16"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(212, 175, 55, 0.5)" }}
                whileTap={{ scale: 0.98 }}
                className="border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37]/10 px-12 py-5 rounded-none text-xl tracking-[0.3em] uppercase transition-all duration-500"
              >
                Private Portfolio
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#080810] to-transparent"></div>
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        >
          <p className="text-xs tracking-[0.3em] text-[#d4af37] mb-4 font-extralight">DISCOVER</p>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-0.5 h-16 bg-gradient-to-b from-[#d4af37] to-transparent"
          ></motion.div>
        </motion.div>
      </header>

      <main className="container mx-auto px-4 sm:px-8 py-32">
        {/* About Section - Ultra-premium styling */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2 }}
          className="mb-40 relative"
          id="legacy"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37]/5 rounded-full -mr-48 -mt-48 blur-[100px]"></div>
          
          <div className="flex items-center justify-center mb-16 sm:mb-24">
            <div className="h-px w-12 sm:w-24 bg-[#d4af37]/30"></div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extralight tracking-[0.2em] sm:tracking-[0.4em] px-3 sm:px-8 text-center text-[#d4af37]">THE LEGACY</h2>
            <div className="h-px w-12 sm:w-24 bg-[#d4af37]/30"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 sm:gap-24 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <p className="text-base sm:text-lg md:text-xl leading-relaxed mb-8 sm:mb-10 font-extralight">
                Born into humble beginnings in Chivhu, Zimbabwe,Sir Winknell ascension to the pinnacle of global entrepreneurship embodies the quintessence of vision, perseverance, and strategic brilliance.
              </p>
              <p className="text-base sm:text-lg md:text-xl leading-relaxed mb-8 sm:mb-10 font-extralight">
                His portfolio spans continents—from renewable energy infrastructure in Southern Africa to strategic investments across Europe, Asia, and the Americas. Each venture bears the hallmark of his distinctive approach: identifying opportunities where others perceive limitations.
              </p>
              <p className="text-base sm:text-lg md:text-xl leading-relaxed font-extralight">
                Beyond the boardroom, Winknell is philanthropic endeavors reflect his commitment to elevating communities and preserving cultural heritage. His patronage of the arts and support of educational institutions has established a legacy that transcends business achievements.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <div className="absolute inset-0 border border-[#d4af37]/20 -m-3 sm:-m-6 z-0"></div>
              <div className="absolute inset-0 border border-[#d4af37]/10 -m-6 sm:-m-12 z-0"></div>
              <div className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden z-10">
                <Image
                  src="/billionaire-portrait.jpg"
                  alt="Winknell Chivhayo - Executive Portrait"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent h-1/3 flex items-end">
                  <div className="p-10">
                    <div className="w-20 h-0.5 bg-[#d4af37] mb-6"></div>
                    <p className="text-sm tracking-[0.3em] uppercase text-[#d4af37]">Visionary • Philanthropist • Connoisseur</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Global Ventures Section - Ultra-premium cards */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2 }}
          className="mb-40 relative"
          id="empire"
        >
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#d4af37]/5 rounded-full -ml-48 -mb-48 blur-[100px]"></div>
          
          <div className="flex items-center justify-center mb-24">
            <div className="h-px w-24 bg-[#d4af37]/30"></div>
            <h2 className="text-4xl sm:text-5xl font-extralight tracking-[0.4em] px-8 text-center text-[#d4af37]">GLOBAL EMPIRE</h2>
            <div className="h-px w-24 bg-[#d4af37]/30"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10">
            {[
              {
                title: "SOVEREIGN INVESTMENTS",
                description: "A meticulously curated portfolio of sovereign wealth funds, private equity, and strategic acquisitions across six continents.",
                icon: "/icon-crown-gold.svg"
              },
              {
                title: "ENERGY DOMINANCE",
                description: "Pioneering the future of global energy with revolutionary sustainable solutions and strategic partnerships with world governments.",
                icon: "/icon-power-gold.svg"
              },
              {
                title: "LUXURY DEVELOPMENTS",
                description: "Architectural masterpieces that redefine opulence, from private islands to urban landmarks that shape the world's most prestigious skylines.",
                icon: "/icon-property-gold.svg"
              }
            ].map((venture, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.3 }}
                whileHover={{ y: -15, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.9)" }}
                className="bg-[#0a0a12] border border-[#d4af37]/20 p-8 sm:p-12 relative group transition-all duration-700"
              >
                <div className="absolute top-0 right-0 bottom-0 w-0.5 bg-[#d4af37] transform scale-y-0 group-hover:scale-y-100 transition-transform duration-700 origin-bottom"></div>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#d4af37] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
                
                <div className="w-20 h-20 mb-10">
                  <Image src={venture.icon} alt={venture.title} width={80} height={80} />
                </div>
                <h3 className="text-2xl font-extralight tracking-widest mb-8 text-[#d4af37]">{venture.title}</h3>
                <p className="text-lg font-extralight leading-relaxed text-gray-300">{venture.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Elite Network Section - Ultra-premium styling */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2 }}
          className="mb-40 relative"
          id="network"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37]/5 rounded-full -mr-48 -mt-48 blur-[100px]"></div>
          
          <div className="flex items-center justify-center mb-24">
            <div className="h-px w-24 bg-[#d4af37]/30"></div>
            <h2 className="text-4xl sm:text-5xl font-extralight tracking-[0.4em] px-8 text-center text-[#d4af37]">ELITE NETWORK</h2>
            <div className="h-px w-24 bg-[#d4af37]/30"></div>
          </div>
          
          <div className="relative">
            <div className="absolute top-0 left-0 w-32 h-32 -mt-12 -ml-12">
              <Image src="/quote-luxury.svg" alt="Quote" width={128} height={128} className="opacity-15" />
            </div>
            
            <div className="grid md:grid-cols-2 gap-cols-10 sm:gap-20">
              {[
                {
                  quote: "Winknell&apos;s strategic vision transcends conventional business paradigms. His ability to orchestrate complex international ventures with precision is unparalleled in today&apos;s global economy.",
                  author: "Sir Richard Branson",
                  title: "Founder, Virgin Group",
                  image: "/testimonial-billionaire-1.jpg"
                },
                {
                  quote: "In the realm of high-stakes investments, few possess Winknell&apos;s remarkable intuition for opportunity. His approach combines analytical brilliance with a profound understanding of emerging market dynamics.",
                  author: "Christine Lagarde",
                  title: "President, European Central Bank",
                  image: "/testimonial-billionaire-2.jpg"
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: index * 0.4 }}
                  className="bg-[#0a0a12] border border-[#d4af37]/20 p-8 sm:p-14 relative"
                >
                  <p className="text-lg sm:text-xl italic font-extralight leading-relaxed mb-8 sm:mb-12 text-gray-300">&ldquo;{testimonial.quote}&rdquo;</p>
                  <div className="flex items-center">
                    <div className="w-20 h-20 rounded-full overflow-hidden mr-6 border border-[#d4af37]/30">
                      <Image src={testimonial.image} alt={testimonial.author} width={80} height={80} className="object-cover" />
                    </div>
                    <div>
                      <h4 className="text-lg font-light text-white">{testimonial.author}</h4>
                      <p className="text-sm text-[#d4af37] tracking-wider">{testimonial.title}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Private Collection Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2 }}
          className="relative mb-40"
          id="collection"
        >
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#d4af37]/5 rounded-full -ml-48 -mb-48 blur-[100px]"></div>
          
          <div className="flex items-center justify-center mb-24">
            <div className="h-px w-24 bg-[#d4af37]/30"></div>
            <h2 className="text-4xl sm:text-5xl font-extralight tracking-[0.4em] px-8 text-center text-[#d4af37]">PRIVATE COLLECTION</h2>
            <div className="h-px w-24 bg-[#d4af37]/30"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <motion.div
                key={num}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: num * 0.1 }}
                whileHover={{ scale: 1.05, zIndex: 10 }}
                className="relative aspect-square overflow-hidden group"
              >
                <Image
                  src={`/luxury-collection-${num}.jpg`}
                  alt={`Luxury collection item ${num}`}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                  <div className="p-6">
                    <div className="w-10 h-0.5 bg-[#d4af37] mb-4"></div>
                    <p className="text-sm tracking-widest uppercase text-white">Exclusive Asset {num}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2 }}
          className="relative mb-40"
          id="contact"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37]/5 rounded-full -mr-48 -mt-48 blur-[100px]"></div>
          
          <div className="flex items-center justify-center mb-24">
            <div className="h-px w-24 bg-[#d4af37]/30"></div>
            <h2 className="text-4xl sm:text-5xl font-extralight tracking-[0.4em] px-8 text-center text-[#d4af37]">EXCLUSIVE ACCESS</h2>
            <div className="h-px w-24 bg-[#d4af37]/30"></div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <motion.form 
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="bg-[#0a0a12] border border-[#d4af37]/20 p-6 sm:p-10 md:p-16"
            >
              <div className="mb-12">
                <label htmlFor="name" className="block mb-3 text-sm tracking-[0.3em] uppercase text-[#d4af37]">Full Name</label>
                <motion.input 
                  whileFocus={{ borderColor: "rgba(212, 175, 55, 0.5)" }}
                  type="text" 
                  id="name" 
                  className="w-full px-0 py-4 bg-transparent border-b border-gray-800 focus:border-[#d4af37]/50 focus:outline-none text-lg font-extralight transition-colors duration-500"
                  placeholder="Your name"
                />
              </div>
              
              <div className="mb-12">
                <label htmlFor="email" className="block mb-3 text-sm tracking-[0.3em] uppercase text-[#d4af37]">Email Address</label>
                <motion.input 
                  whileFocus={{ borderColor: "rgba(212, 175, 55, 0.5)" }}
                  type="email" 
                  id="email" 
                  className="w-full px-0 py-4 bg-transparent border-b border-gray-800 focus:border-[#d4af37]/50 focus:outline-none text-lg font-extralight transition-colors duration-500"
                  placeholder="Your email"
                />
              </div>
              
              <div className="mb-12">
                <label htmlFor="inquiry" className="block mb-3 text-sm tracking-[0.3em] uppercase text-[#d4af37]">Nature of Inquiry</label>
                <motion.select
                  whileFocus={{ borderColor: "rgba(212, 175, 55, 0.5)" }}
                  id="inquiry"
                  className="w-full px-0 py-4 bg-transparent border-b border-gray-800 focus:border-[#d4af37]/50 focus:outline-none text-lg font-extralight transition-colors duration-500"
                >
                  <option value="" className="bg-[#0a0a12]">Please select</option>
                  <option value="investment" className="bg-[#0a0a12]">Private Investment Opportunity</option>
                  <option value="partnership" className="bg-[#0a0a12]">Strategic Alliance</option>
                  <option value="philanthropy" className="bg-[#0a0a12]">Philanthropic Collaboration</option>
                  <option value="acquisition" className="bg-[#0a0a12]">Acquisition Proposal</option>
                  <option value="other" className="bg-[#0a0a12]">Confidential Matter</option>
                </motion.select>
              </div>
              
              <div className="mb-16">
                <label htmlFor="message" className="block mb-3 text-sm tracking-[0.3em] uppercase text-[#d4af37]">Message</label>
                <motion.textarea 
                  whileFocus={{ borderColor: "rgba(212, 175, 55, 0.5)" }}
                  id="message" 
                  rows={5} 
                  className="w-full px-0 py-4 bg-transparent border-b border-gray-800 focus:border-[#d4af37]/50 focus:outline-none text-lg font-extralight transition-colors duration-500"
                  placeholder="Your message"
                ></motion.textarea>
              </div>
              
              <div className="text-center">
                <motion.button 
                  whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(212, 175, 55, 0.3)" }}
                  whileTap={{ scale: 0.98 }}
                  type="submit" 
                  className="border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37]/10 px-16 py-5 text-base tracking-[0.3em] uppercase transition-all duration-500"
                >
                  Request Access
                </motion.button>
              </div>
            </motion.form>
          </div>
        </motion.section>
      </main>

      {/* Exclusive Membership Modal Trigger */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 3, duration: 0.8 }}
        className="fixed bottom-10 right-10 z-40"
      >
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(212, 175, 55, 0.4)" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setVipChatOpen(true)}
          className="bg-[#0a0a12] border border-[#d4af37] rounded-full w-16 h-16 flex items-center justify-center group"
        >
          <svg className="w-6 h-6 text-[#d4af37] group-hover:rotate-45 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v16m8-8H4"></path>
          </svg>
        </motion.button>
        <div className="absolute top-0 right-0 -mt-2 -mr-2 bg-[#d4af37] text-[#0a0a12] text-xs px-2 py-1 rounded-full font-medium">
          Chat+
        </div>
      </motion.div>

      {/* VIP Chat Component */}
      <VIPChat isOpen={vipChatOpen} onClose={() => setVipChatOpen(false)} />

      <footer className="bg-[#050508] border-t border-[#d4af37]/10 py-24">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="flex flex-col items-center justify-center text-center mb-16">
            <div className="w-24 h-24 mb-8">
              <Image
                src="/wc-premium-crest.png"
                alt="WC Royal Crest"
                width={96}
                height={96}
              />
            </div>
            <h2 className="text-3xl font-extralight tracking-[0.4em] text-[#d4af37] mb-4">WINKNELL CHIVHAYO</h2>
            <p className="text-sm tracking-[0.3em] text-gray-400">EXCELLENCE • DISTINCTION • LEGACY</p>
          </div>
          
          <div className="flex justify-center space-x-12 mb-16">
            <motion.a 
              whileHover={{ y: -5, opacity: 0.8 }}
              whileTap={{ scale: 0.95 }}
              href="#" 
              className="text-[#d4af37] opacity-60 hover:opacity-100 transition-opacity duration-500"
            >
              <FaLinkedinIn size={28} />
            </motion.a>
            <motion.a 
              whileHover={{ y: -5, opacity: 0.8 }}
              whileTap={{ scale: 0.95 }}
              href="#" 
              className="text-[#d4af37] opacity-60 hover:opacity-100 transition-opacity duration-500"
            >
              <FaTwitter size={28} />
            </motion.a>
            <motion.a 
              whileHover={{ y: -5, opacity: 0.8 }}
              whileTap={{ scale: 0.95 }}
              href="#" 
              className="text-[#d4af37] opacity-60 hover:opacity-100 transition-opacity duration-500"
            >
              <FaInstagram size={28} />
            </motion.a>
          </div>
          
          <div className="text-center">
            <p className="text-xs tracking-[0.2em] text-gray-500">© {new Date().getFullYear()} <span className="text-[#d4af37]">WINKNELL CHIVHAYO</span>. ALL RIGHTS RESERVED.</p>
            <p className="text-xs tracking-[0.2em] text-gray-600 mt-3">PRIVATE OFFICES: HARARE • JOHANNESBURG • DUBAI • LONDON • NEW YORK • SINGAPORE</p>
          </div>
        </div>
      </footer>
    </div>
    );
    }
