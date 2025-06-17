"use client";
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const aboutRef = useRef(null);
  const navRef = useRef(null);
  const imageRef = useRef(null);
  const sectionRefs = useRef([]);

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
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Image floating animation
    gsap.to(imageRef.current, {
      y: 20,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    // Section animations
    sectionRefs.current.forEach((section, i) => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.1
      });
    });

    // Skills animation
    gsap.from('.skill-item', {
      scrollTrigger: {
        trigger: '.skills-section',
        start: 'top 70%'
      },
      x: -30,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6
    });

    return () => {
      tl.kill();
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/About' },
    { name: 'Work', path: '/Work' },
    { name: 'Education', path: '/Education' },
    { name: 'Contact', path: '/Contact' }
  ];

  const skills = [
    'Graphic Design', 'Web Design', 'Adoble', 'Illustrator', 'Photoshope',
    'Animation', 'Social Media Post Design', 'Package Design', 'infographics', 'UI/UX Design'
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
            href="/" 
            className="text-2xl font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
            aria-label="Home"
          >
            <span className="relative text-3xl font-serif">
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
                  className={`text-gray-300 hover:text-emerald-400 transition-colors duration-300 flex items-center group ${
                    item.path === '/about' ? 'text-emerald-400' : ''
                  }`}
                >
                  <span className="text-emerald-400 mr-1 text-3xl mt-10"></span>
                  <span className="relative text-xl">
                    {item.name}
                    <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 group-hover:w-full transition-all duration-300 ${
                      item.path === '/about' ? 'w-full' : ''
                    }`}></span>
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
              className={`text-3xl text-gray-300 hover:text-emerald-400 transition-colors duration-300 ${
                item.path === '/about' ? 'text-emerald-400' : ''
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="text-emerald-400"></span> {item.name}
            </a>
          ))}
          
        </div>
      </div>

      {/* About Section */}
      <section 
        ref={aboutRef}
        className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto relative overflow-hidden"
      >
        {/* Floating background elements */}
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-emerald-400/10 filter blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-purple-500/10 filter blur-3xl"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Column */}
          <div className="relative" ref={imageRef}>
            <div className="relative w-full h-96 lg:h-[500px] rounded-lg overflow-hidden ">
              <Image
                src="/jimmy.jpg"
                alt="Jimmy Patel"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="absolute -inset-4 border border-emerald-400/20 rounded-lg -z-10"></div>
            <div className="absolute -inset-8 border border-emerald-400/10 rounded-lg -z-20"></div>
          </div>

          {/* Content Column */}
          <div className="space-y-8">
            <h2 
              ref={el => sectionRefs.current[0] = el}
              className="text-4xl sm:text-5xl font-bold text-gray-100"
            >
              <span className="text-emerald-400">About</span> Me
            </h2>
            
            <div 
              ref={el => sectionRefs.current[1] = el}
              className="space-y-4 text-lg text-gray-300 leading-relaxed"
            >
              <p>
                Hello! I'm Jimmy Patel, a passionate Graphic Desiner with 6month + Years of experience creating digital experiences that matter. My journey in tech started when I built my first Design is Social Media logo and post for Restaurant.
              </p>
              <p>
                I specialize in building (and occasionally designing) exceptional websites, applications, and everything in between. My approach combines technical expertise with creative problem-solving to deliver solutions that are both functional and delightful.
              </p>
              <p>
                When I'm not coding, you'll find me hiking, reading sci-fi novels, or experimenting with new cooking recipes. I believe in continuous learning and pushing boundaries to create work that makes an impact.
              </p>
            </div>

            {/* Skills Section */}
            <div 
              ref={el => sectionRefs.current[2] = el}
              className="skills-section"
            >
              <h3 className="text-2xl font-semibold text-gray-100 mb-4">My Skills</h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <span 
                    key={skill} 
                    className="skill-item bg-gray-800/50 border border-gray-700 px-4 py-2 rounded-full text-emerald-400 hover:bg-emerald-400/10 transition-colors duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Experience Section */}
            <div 
              ref={el => sectionRefs.current[3] = el}
              className="experience-section"
            >
              <h3 className="text-2xl font-semibold text-gray-100 mb-4">Experience</h3>
              <div className="space-y-6">
                <div className="pl-6 border-l-2 border-emerald-400/30">
                  <h4 className="text-xl font-medium text-gray-100">Graphic Designer</h4>
                  <p className="text-emerald-400">Dev Institute • 2025 - Dec-jun</p>
                  <p className="text-gray-400 mt-2">
                    Lead the development of customer-facing Design using Adobe Photoshop And Adobe Illustator, improving performance and user engagement.
                  </p>
                </div>
                <div className="pl-6 border-l-2 border-emerald-400/30">
                  <h4 className="text-xl font-medium text-gray-100">Freelancing</h4>
                  <p className="text-emerald-400">Company Name - Rjomnify</p>
                  <p className="text-gray-400 mt-2">
                    Is a my freelancing company to build a logo Design,Web Design,Letterhead Design,Broucher Design and etc.And Build your Requirement Design.
                  </p>
                </div>
                <div className="pl-6 border-l-2 border-emerald-400/30">
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}