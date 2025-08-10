"use client";

import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { Exo_2 } from 'next/font/google';

const exo2 = Exo_2({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function Projects() {
  const sectionRef = useRef(null);
  const controls = useAnimation();
  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // Memoize project data to prevent unnecessary re-renders
  const projects = useMemo(() => [
    {
      id: 1,
      title: "Stubook",
      shortDescription: "Cross-platform student productivity app",
      fullDescription: "A comprehensive event booking and management platform built with modern web technologies. Features include user authentication, event creation, ticket management, and real-time notifications.",
      technologies: ["React", "Node.js", "MongoDB", "Express", "Socket.io"],
      github: "https://github.com/keiranmistry/stubook",
      live: "https://stubook.vercel.app",
      image: "/projects/stubookmaster.png",
      screenshots: [
        { id: 1, filename: "stubook-1.png", description: "Homepage" },
        { id: 2, filename: "stubook-2.png", description: "Event Details" },
        { id: 3, filename: "stubook-3.png", description: "Booking Flow" }
      ],
      features: [
        "User authentication and authorization",
        "Event creation and management",
        "Real-time ticket booking",
        "Payment integration",
        "Email notifications",
        "Admin dashboard"
      ],
      duration: "3 months",
      team: "Solo project",
      role: "Full-stack developer"
    },
    {
      id: 2,
      title: "HDI vs. Happiness Analysis",
      shortDescription: "Data analysis project",
      fullDescription: "Statistical analysis exploring the relationship between Human Development Index (HDI) and happiness scores across countries. Utilized advanced statistical methods and data visualization techniques.",
      technologies: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Jupyter"],
      github: "https://github.com/keiranmistry/hdi-happiness-analysis",
      image: "/api/placeholder/400/250",
      screenshots: [
        { id: 1, filename: "hdi-1.png", description: "Correlation Analysis" },
        { id: 2, filename: "hdi-2.png", description: "Regression Results" },
        { id: 3, filename: "hdi-3.png", description: "Visualization Dashboard" }
      ],
      features: [
        "Data cleaning and preprocessing",
        "Statistical correlation analysis",
        "Multiple regression modeling",
        "Interactive visualizations",
        "Comprehensive reporting",
      ],
      duration: "2 weeks",
      team: "Solo project",
      role: "Data analyst"
    },
    {
      id: 3,
      title: "TrackSite",
      shortDescription: "Website tracking tool",
      fullDescription: "A web application for tracking website performance, uptime, and analytics. Provides real-time monitoring, alerting, and detailed performance reports.",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Vercel"],
      github: "https://github.com/keiranmistry/tracksite",
      live: "https://tracksite.vercel.app",
      image: "/api/placeholder/400/250",
      screenshots: [
        { id: 1, filename: "tracksite-1.png", description: "Dashboard" },
        { id: 2, filename: "tracksite-2.png", description: "Analytics" },
        { id: 3, filename: "tracksite-3.png", description: "Settings" }
      ],
      features: [
        "Real-time website monitoring",
        "Performance metrics tracking",
        "Uptime monitoring",
        "Alert notifications",
        "Analytics dashboard",
        "API integration"
      ],
      duration: "4 months",
      team: "Solo project",
      role: "Full-stack developer"
    },
    {
      id: 4,
      title: "Soccer Tiki Taka Toe",
      shortDescription: "Soccer-themed Tic-tac-toe",
      fullDescription: "A fun twist on the classic Tic-tac-toe game with soccer themes and animations. Features multiple game modes and responsive design.",
      technologies: ["React", "CSS3", "JavaScript", "Framer Motion"],
      github: "https://github.com/keiranmistry/soccer-tiki-taka-toe",
      live: "https://soccer-tiki-taka-toe.vercel.app",
      image: "/api/placeholder/400/250",
      screenshots: [
        { id: 1, filename: "soccer-1.png", description: "Game Board" },
        { id: 2, filename: "soccer-2.png", description: "Victory Screen" },
        { id: 3, filename: "soccer-3.png", description: "Settings" }
      ],
      features: [
        "Multiple game modes",
        "Soccer-themed animations",
        "Responsive design",
        "Score tracking",
        "Sound effects",
        "Local storage"
      ],
      duration: "1 month",
      team: "Solo project",
      role: "Frontend developer"
    },
    {
      id: 5,
      title: "Portfolio",
      shortDescription: "Personal portfolio website",
      fullDescription: "A modern, responsive portfolio website showcasing my projects, travel experiences, and professional background. Features smooth animations and optimal performance.",
      technologies: ["Next.js", "Tailwind CSS", "Framer Motion", "shadcn/ui"],
      github: "https://github.com/keiranmistry/portfolio",
      live: "https://keiranmistry.vercel.app",
      image: "/api/placeholder/400/250",
      screenshots: [
        { id: 1, filename: "portfolio-1.png", description: "Homepage" },
        { id: 2, filename: "portfolio-2.png", description: "Projects" },
        { id: 3, filename: "portfolio-3.png", description: "Gallery" }
      ],
      features: [
        "Responsive design",
        "Smooth animations",
        "Travel gallery",
        "Project showcase",
        "Performance optimized",
        "SEO friendly"
      ],
      duration: "2 months",
      team: "Solo project",
      role: "Frontend developer"
    }
  ], []);

  // Optimized intersection observer with throttling
  useEffect(() => {
    if (hasAnimated) return; // Prevent re-observation

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsInView(true);
          setHasAnimated(true);
          controls.start('visible');
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px' // Reduced margin for better performance
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [controls, hasAnimated]);

  // Memoized event handlers to prevent unnecessary re-renders
  const handleProjectClick = useCallback((project) => {
    setSelectedProject(project);
    setCurrentPhotoIndex(0);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedProject(null);
    setCurrentPhotoIndex(0);
  }, []);

  const nextPhoto = useCallback(() => {
    if (selectedProject && selectedProject.screenshots) {
      setCurrentPhotoIndex((prev) => {
        const maxIndex = Math.max(0, selectedProject.screenshots.length - 2);
        return prev >= maxIndex ? 0 : prev + 2;
      });
    }
  }, [selectedProject]);

  const prevPhoto = useCallback(() => {
    if (selectedProject && selectedProject.screenshots) {
      setCurrentPhotoIndex((prev) => {
        const maxIndex = Math.max(0, selectedProject.screenshots.length - 2);
        return prev <= 0 ? maxIndex : prev - 2;
      });
    }
  }, [selectedProject]);

  const goToPhoto = useCallback((index) => {
    setCurrentPhotoIndex(index);
  }, []);

  // Optimized keyboard navigation
  useEffect(() => {
    if (!isModalOpen) return;
    
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleCloseModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, handleCloseModal]);

  // Memoized gradient function
  const getGradientForProject = useCallback((projectId) => {
    const gradients = [
      'from-blue-400/20 to-purple-500/20',
      'from-green-400/20 to-blue-500/20',
      'from-orange-400/20 to-red-500/20',
      'from-purple-400/20 to-pink-500/20',
      'from-teal-400/20 to-cyan-500/20'
    ];
    
    const index = projectId % gradients.length;
    return gradients[index];
  }, []);

  // Simplified animation variants for better performance
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.4,
        staggerChildren: 0.1,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  return (
    <section ref={sectionRef} id="projects" className="py-20" style={{ 
      backgroundImage: 'url(/emirates.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-6xl sm:text-8xl font-bold italic mb-4" 
            style={{ color: '#b7e4f7' }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={controls}
            variants={{
              visible: { 
                scale: 1, 
                opacity: 1,
                transition: { duration: 0.5, ease: "easeOut" }
              }
            }}
          >
            <em>projects</em>
          </motion.h2>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="backdrop-blur-sm bg-white/5 border border-white/20 shadow-xl rounded-2xl overflow-hidden cursor-pointer hover:bg-white/10 transition-all duration-200"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.01,
                transition: { duration: 0.1, ease: "easeOut" }
              }}
              onClick={() => handleProjectClick(project)}
            >
              <div className={`aspect-square bg-gradient-to-br ${getGradientForProject(project.id)} flex flex-col relative overflow-hidden`}>
                {/* Background Image with lazy loading */}
                <div className="absolute inset-0">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover opacity-90"
                    loading="lazy"
                  />
                </div>
                
                {/* Text Content at Bottom */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent p-4 pt-8">
                  <h4 className={`text-xl font-semibold text-white mb-1 ${exo2.className}`}>
                    {project.title}
                  </h4>
                  <p className={`text-white/80 text-sm ${exo2.className}`}>
                    {project.shortDescription}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Project Details Modal - Only render when open */}
      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative bg-white/10 backdrop-blur-sm border border-white/30 rounded-2xl p-8 max-w-6xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(255, 255, 255, 0.3) rgba(255, 255, 255, 0.1)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className={`text-3xl font-bold text-white ${exo2.className}`}>
                      {selectedProject.title}
                    </h3>
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/60 hover:text-white transition-colors flex items-center"
                    >
                      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-white/10 text-white/80 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="text-white/60 hover:text-white transition-colors p-2 cursor-pointer"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Project Description */}
              <div className="mb-6 bg-white/5 rounded-lg p-4">
                <p className={`text-white/80 ${exo2.className}`}>
                  {selectedProject.fullDescription}
                </p>
              </div>

              {/* Features */}
              <div className="mt-6">
                <h4 className={`text-lg font-semibold text-white mb-3 ${exo2.className}`}>
                  Key Features
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {selectedProject.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-white/60 rounded-full"></div>
                      <span className={`text-md text-white/70 ${exo2.className}`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Project Screenshots Carousel */}
              <div className="mt-6">
                <h4 className={`text-xl font-semibold text-white mb-4 ${exo2.className}`}>
                  Photos
                </h4>
                
                {/* Carousel Container */}
                <div className="relative bg-white/5 rounded-lg p-6">
                  {/* Main Photo Display */}
                  <div className="relative max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      {selectedProject.screenshots && selectedProject.screenshots.length > 0 && (
                        <>
                          {/* First Photo */}
                          <div className="aspect-video bg-white/10 rounded-lg flex items-center justify-center relative overflow-hidden">
                            <img 
                              src={`/${selectedProject.screenshots[currentPhotoIndex].filename}`}
                              alt={selectedProject.screenshots[currentPhotoIndex].description}
                              className="w-full h-full object-cover"
                              loading="lazy"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                              }}
                            />
                            <div className="w-full h-full flex items-center justify-center text-white/40 text-sm" style={{display: 'none'}}>
                              Screenshot {selectedProject.screenshots[currentPhotoIndex].id}
                            </div>
                          </div>
                          
                          {/* Second Photo (if available) */}
                          {selectedProject.screenshots[currentPhotoIndex + 1] && (
                            <div className="aspect-video bg-white/10 rounded-lg flex items-center justify-center relative overflow-hidden">
                              <img 
                                src={`/${selectedProject.screenshots[currentPhotoIndex + 1].filename}`}
                                alt={selectedProject.screenshots[currentPhotoIndex + 1].description}
                                className="w-full h-full object-cover"
                                loading="lazy"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  e.target.nextSibling.style.display = 'flex';
                                }}
                              />
                              <div className="w-full h-full flex items-center justify-center text-white/40 text-sm" style={{display: 'none'}}>
                                Screenshot {selectedProject.screenshots[currentPhotoIndex + 1].id}
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                    
                    {/* Navigation Arrows */}
                    {selectedProject.screenshots && selectedProject.screenshots.length > 2 && (
                      <>
                        <button
                          onClick={prevPhoto}
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors cursor-pointer"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button
                          onClick={nextPhoto}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors cursor-pointer"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </>
                    )}
                  </div>
                  
                  {/* Dots Navigation */}
                  {selectedProject.screenshots && selectedProject.screenshots.length > 2 && (
                    <div className="flex justify-center gap-2">
                      {Array.from({ length: Math.ceil(selectedProject.screenshots.length / 2) }, (_, index) => (
                        <button
                          key={index}
                          onClick={() => goToPhoto(index * 2)}
                          className={`w-2 h-2 rounded-full transition-colors cursor-pointer ${
                            currentPhotoIndex === index * 2 ? 'bg-white' : 'bg-white/30'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
} 