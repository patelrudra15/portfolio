"use client";
import { useState, useRef, useEffect } from 'react';
import Swal from 'sweetalert2';

export default function ContactPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const contactRef = useRef(null);
  const navRef = useRef(null);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/About' },
    { name: 'Work', path: '/Work' },
    { name: 'Education', path: '/Education'},
    { name: 'Contact', path: '/Contact'}
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('access_key', 'fc127b96-7247-40a1-909d-99842776f906');
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('number', formData.number);
      formDataToSend.append('message', formData.message);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSend
      });

      const result = await response.json();

      if (result.success) {
        setFormData({ name: '', email: '', number: '', message: '' });
        Swal.fire({
          title: "Success!",
          text: "Your message has been sent successfully.",
          icon: "success",
          confirmButtonColor: "#10b981", // emerald-500
          background: "#1f2937", // gray-800
          color: "#f3f4f6" // gray-100
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: result.message || "Something went wrong. Please try again later.",
          icon: "error",
          confirmButtonColor: "#ef4444", // red-500
          background: "#1f2937", // gray-800
          color: "#f3f4f6" // gray-100
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to send message. Please check your connection and try again.",
        icon: "error",
        confirmButtonColor: "#ef4444", // red-500
        background: "#1f2937", // gray-800
        color: "#f3f4f6" // gray-100
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 overflow-x-hidden">
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
          >
            MyPortfolio
          </a>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <li key={item.name}>
                <a 
                  href={item.path} 
                  className={`relative text-gray-300 hover:text-emerald-400 transition-colors ${
                    item.path === '/Contact' ? 'text-emerald-400' : ''
                  }`}
                >
                  {item.name}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-emerald-400 transition-all duration-300 ${
                    item.path === '/Contact' ? 'w-full' : 'w-0 hover:w-full'
                  }`}></span>
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-300 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className={`w-6 flex flex-col space-y-1.5 transition-all ${mobileMenuOpen ? 'transform rotate-180' : ''}`}>
              <span className={`block h-0.5 bg-gray-300 transition-all ${mobileMenuOpen ? 'w-6 rotate-45 translate-y-2' : 'w-6'}`}></span>
              <span className={`block h-0.5 bg-gray-300 transition-all ${mobileMenuOpen ? 'opacity-0' : 'w-6'}`}></span>
              <span className={`block h-0.5 bg-gray-300 transition-all ${mobileMenuOpen ? 'w-6 -rotate-45 -translate-y-1' : 'w-6'}`}></span>
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-gray-900/95 backdrop-blur-sm flex items-center justify-center">
          <div className="flex flex-col items-center space-y-8">
            {navItems.map((item) => (
              <a 
                key={item.name}
                href={item.path} 
                className="text-3xl text-gray-300 hover:text-emerald-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        {/* Contact Header */}
        <section className="contact-section mb-20 text-center">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6">
            Get In <span className="text-emerald-400">Touch</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Have a project in mind or want to collaborate? Feel free to reach out!
          </p>
        </section>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32">
          {/* Contact Form */}
          <div className="contact-card bg-gray-800/50 border border-gray-700 rounded-xl p-8 shadow-lg hover:border-emerald-400/30 transition-all duration-300">
            <h2 className="text-2xl font-bold text-white mb-6">Send Me a Message</h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="name" className="block text-gray-300 mb-2">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/50 outline-none transition-all"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-300 mb-2">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/50 outline-none transition-all"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="number" className="block text-gray-300 mb-2">Mobile No</label>
                <input
                  type="tel"
                  id="number"
                  name="number"
                  value={formData.number}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/50 outline-none transition-all"
                />
              </div>

              <div className="mb-8">
                <label htmlFor="message" className="block text-gray-300 mb-2">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/50 outline-none transition-all"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                  isSubmitting 
                    ? 'bg-emerald-400/50 cursor-not-allowed' 
                    : 'bg-emerald-400 hover:bg-emerald-500 text-gray-900'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="contact-card bg-gray-800/50 border border-gray-700 rounded-xl p-8 shadow-lg hover:border-emerald-400/30 transition-all duration-300">
            <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-emerald-400/10 p-3 rounded-full mr-4">
                  <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-300 mb-1">Phone</h3>
                  <a href="tel:+916352503071" className="text-gray-400 hover:text-emerald-400 transition-colors">+91 6352503071</a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-emerald-400/10 p-3 rounded-full mr-4">
                  <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-300 mb-1">Email</h3>
                  <a href="mailto:jnptl23092004@gmail.com" className="text-gray-400 hover:text-emerald-400 transition-colors">jnptl23092004@gmail.com</a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-emerald-400/10 p-3 rounded-full mr-4">
                  <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-300 mb-1">Location</h3>
                  <p className="text-gray-400">B-204 Samruddh Greens, Pranami Nagar, Mahadev Nagar Tekra, Ahmedabad, Gujarat 382418</p>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <h3 className="text-xl font-semibold text-white mb-6">Working Hours</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Monday - Friday</span>
                  <span className="text-gray-300">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Saturday</span>
                  <span className="text-gray-300">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Sunday</span>
                  <span className="text-gray-300">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}