"use client";
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function AdvancedHomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const heroRef = useRef(null);
  const navRef = useRef(null);

  useEffect(() => {
    // Navbar scroll effect
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // GSAP animations
    const tl = gsap.timeline();
    
    // Navbar items animation
    tl.from('.nav-item', {
      duration: 0.8,
      y: -20,
      opacity: 0,
      stagger: 0.1,
      ease: 'power3.out'
    });

    // Hero content animation
    tl.from('.hero-intro', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.6')
    .from('.hero-name', {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.4')
    .from('.hero-title', {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.4')
    .from('.hero-desc', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.4')
    .from('.hero-button', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'elastic.out(1, 0.5)'
    }, '-=0.4');

    // Floating elements animation
    gsap.to('.float-element-1', {
      y: 20,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
    gsap.to('.float-element-2', {
      y: -30,
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 1
    });

    return () => {
      tl.kill();
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navItems = [
    { name: 'About', path: '/About' },
    { name: 'Work', path: '/Work' },
    { name: 'Education', path: '/Education' },
    { name: 'Contact', path: '/Contact' }

  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 overflow-x-hidden">
      {/* Navigation Bar */}
      <nav 
        ref={navRef}
        className={`fixed w-full z-50 py-4 px-6 transition-all duration-300 ${
          isScrolled ? 'bg-gray-900/90 backdrop-blur-md py-3' : 'bg-transparent backdrop-blur-none'
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a 
            href="#" 
            className="text-2xl font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
            aria-label="Home"
          >
            <span className="relative font-serif text-4xl">
              Portfolio
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-emerald-400 scale-x-0 hover:scale-x-100 transition-transform origin-left"></span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <li key={item.name} className="nav-item">
                <a 
                  href={item.path} 
                  className="text-gray-300 hover:text-emerald-400 transition-colors duration-300 flex items-center group"
                >
                  <span className="text-emerald-400 mr-1 text-2xl"></span>
                  <span className="relative text-xl pt-4">
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          {/* Resume Button */}
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-300 focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <div className={`w-6 flex flex-col space-y-1.5 transition-all duration-300 ${mobileMenuOpen ? 'transform rotate-180' : ''}`}>
              <span className={`block h-0.5 bg-gray-300 transition-all duration-300 ${mobileMenuOpen ? 'w-6 transform rotate-45 translate-y-2' : 'w-6'}`}></span>
              <span className={`block h-0.5 bg-gray-300 transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'w-6'}`}></span>
              <span className={`block h-0.5 bg-gray-300 transition-all duration-300 ${mobileMenuOpen ? 'w-6 transform -rotate-45 -translate-y-1' : 'w-6'}`}></span>
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 z-40 bg-gray-900/95 backdrop-blur-sm transition-all duration-300 flex items-center justify-center ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center space-y-8">
          {navItems.map((item) => (
            <a 
              key={item.name}
              href={item.path} 
              className="text-3xl text-gray-300 hover:text-emerald-400 transition-colors duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="text-emerald-400"></span> {item.name}
            </a>
          ))}
          
        </div>
      </div>

      {/* Hero Section */}
      <section 
        id="home" 
        ref={heroRef}
        className="min-h-screen flex items-center pt-20 px-6 relative overflow-hidden"
      >
        {/* Floating background elements */}
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-emerald-400/10 filter blur-3xl float-element-1"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-purple-500/10 filter blur-3xl float-element-2"></div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="space-y-4 md:space-y-6">
            <h3 className="hero-intro text-emerald-400 text-lg md:text-2xl font-mono">
              Hello, My Name is
            </h3>
            
            <h1 className="hero-name text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-100 leading-tight">
              <span className="font-serif inline-block bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
                Jimmy Patel
              </span>
            </h1>
            
            <h2 className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-400 leading-tight">
              I build digital experiences.
            </h2>
            
            <p className="hero-desc max-w-lg md:max-w-xl text-gray-400 mt-6 text-lg md:text-xl leading-relaxed">
              I'm a Graphic Designer & specializing in building exceptional, accessible digital experiences. Currently focused on creating human-centered products that make an impact.
            </p>
            
            <div className="mt-12 flex flex-wrap gap-4">
              <button 
                className="hero-button relative overflow-hidden group border-2 border-emerald-400 text-emerald-400 px-8 py-4 rounded-lg font-mono text-lg hover:bg-emerald-400/10 transition-all duration-300"
              >
                
                <span className="absolute inset-0 bg-emerald-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
              </button>
              
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="relative overflow-hidden group bg-emerald-400/10 text-emerald-400 px-8 py-4 rounded-lg font-mono text-lg hover:bg-emerald-400/20 transition-all duration-300 border border-transparent hover:border-emerald-400/30" > Resume </a>
              
              <a 
                href="/Contact" 
                className="relative overflow-hidden group bg-emerald-400/10 text-emerald-400 px-8 py-4 rounded-lg font-mono text-lg hover:bg-emerald-400/20 transition-all duration-300 border border-transparent hover:border-emerald-400/30"
              >
                Get in touch
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}