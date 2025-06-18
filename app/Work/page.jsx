"use client";
import { useState } from 'react';
import Image from 'next/image';

export default function AboutPage() {
  const [selectedWork, setSelectedWork] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const works = [
    {
    id: 1,
    title: "Rjomnify Logo",
    image: "/work1.jpg",
    category: "Logo"
  },
  {
    id: 2,
    title: "Personal Portfolio Website",
    image: "/work2.jpg",
    category: "Portfolio Website"
  },
  {
    id: 3,
    title: "Chole Bhature Shop Social Post",
    image: "/work3.jpg",
    category: "Social Media Post"
  },
  {
    id: 4,
    title: "Secure Wave Technologies Trifold Brochure Design",
    image: "/work4.jpg",
    category: "Brochure"
  },
  {
    id: 5,
    title: "Secure Wave Technologies Business Card",
    image: "/work5.jpg",
    category: "Business Card"
  },
  {
    id: 6,
    title: "Eye Poster",
    image: "/work6.jpg",
    category: "Poster Design"
  },
  {
    id: 7,
    title: "Bakery Logo Design",
    image: "/work7.png",
    category: "Logo"
  },
  {
    id: 8,
    title: "Rjomnify Website",
    image: "/work8.jpg",
    category: "Portfolio Website"
  },
  {
    id: 9,
    title: "Secure Wave Technologies Post",
    image: "/work9.jpg",
    category: "Social Media Post"
  },
  {
    id: 10,
    title: "Dev Institute Brochure",
    image: "/work10.jpg",
    category: "Brochure"
  },
  {
    id: 11,
    title: "Angle Shaft and Tubes Business Card",
    image: "/work11.jpg",
    category: "Business Card"
  },
  {
    id: 12,
    title: "Visa Company Poster",
    image: "/work12.jpg",
    category: "Poster Design"
  },
  {
    id: 13,
    title: "Real Estate Logo Design",
    image: "/work13.jpg",
    category: "Logo"
  },
  {
    id: 14,
    title: "AI Content Generator",
    image: "/work14.jpg",
    category: "Portfolio Website"
  },
  {
    id: 15,
    title: "Visa Company Social Post",
    image: "/work15.jpg",
    category: "Social Media Post"
  },
  {
    id: 16,
    title: "Company LetterHead",
    image: "/work16.jpg",
    category: "LetterHead"
  },
  {
    id: 17,
    title: "Company Letterhead Design",
    image: "/work17.jpg",
    category: "LetterHead"
  },
  {
    id: 18,
    title: "Company Envolope Design",
    image: "/work18.jpg",
    category: "Envolope"
  },
  {
    id: 19,
    title: "Company Envolope",
    image: "/work19.jpg",
    category: "Envolope"
  },
  {
    id: 20,
    title: "Ganesha Company Broucher",
    image: "/work20.jpg",
    category: "Brochure"
  },
  {
    id: 21,
    title: "AST Company Broucher",
    image: "/work21.png",
    category: "Brochure"
  }
  ];

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/About' },
    { name: 'Work', path: '/Work' },
    { name: 'Education', path: '/Education' },
    { name: 'Contact', path: '/Contact' }

  ];

  const categories = ['All', ...new Set(works.map(work => work.category))];
  const filteredWorks = activeCategory === 'All' 
    ? works 
    : works.filter(work => work.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100">
      {/* Navigation */}
      <nav 
        className={`fixed w-full z-50 py-4 px-6 transition-all duration-300 ${
          isScrolled ? 'bg-gray-900/90 backdrop-blur-md py-3' : 'bg-transparent backdrop-blur-none'
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a href="/" className="text-3xl font-serif text-emerald-400 hover:text-emerald-300 transition-colors">
            Portfolio
          </a>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <li key={item.name}>
                <a 
                  href={item.path} 
                  className={`text-gray-300 text-xl mt-6 hover:text-emerald-400 transition-colors ${
                    item.path === '/work' ? 'text-emerald-400' : ''
                  }`}
                >
                  {item.name}
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

      {/* Work Section */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-100 mb-6">
          My <span className="text-emerald-400">Work</span>
        </h2>
        
        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full transition-colors ${
                activeCategory === category 
                  ? 'bg-emerald-400 text-gray-900' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredWorks.map((work) => (
            <div 
              key={work.id}
              className="group relative rounded-lg bg-gray-800/50 border border-gray-700 hover:border-emerald-400/30 transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedWork(work)}
            >
              <div className="relative h-64">
                <Image
                  src={work.image}
                  alt={work.title}
                  fill
                  className="object-contain rounded-t-lg"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{work.title}</h3>
                <p className="text-gray-300 mb-4">{work.description}</p>
                
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Project Detail Modal */}
      {selectedWork && (
        <div 
          className="fixed inset-0 z-50 bg-gray-900/95 flex items-center justify-center p-6"
          onClick={() => setSelectedWork(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-gray-800 rounded-lg overflow-hidden border border-gray-700 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute top-4 right-4 text-gray-300 hover:text-white z-10 bg-gray-700 rounded-full p-2"
              onClick={() => setSelectedWork(null)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="relative h-96 w-full">
              <Image
                src={selectedWork.image}
                alt={selectedWork.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-8">
              <h3 className="text-3xl font-bold text-white mb-2">{selectedWork.title}</h3>
              <p className="text-gray-400 mb-4">{selectedWork.category}</p>
              <p className="text-gray-300 text-lg mb-6">{selectedWork.longDescription}</p>
              
              <div className="mb-8">
                <h4 className="text-xl font-semibold text-white mb-4">Project Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="text-emerald-400 mb-2">Technologies Used</h5>
                    
                  </div>
                  <div>
                    <h5 className="text-emerald-400 mb-2">Key Features</h5>
                    <ul className="list-disc list-inside text-gray-300 space-y-1">
                      <li>Responsive design for all devices</li>
                      <li>Secure user authentication</li>
                      <li>Real-time data updates</li>
                      <li>Performance optimized</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}