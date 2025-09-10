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
  const resizeTimeout = useRef(null);
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
      fullDescription: "Cross-platform student productivity app to house all the tools a student needs. Built as a modern alternative for outdated school portals.",
      technologies: ["Flutter", "Dart", "Hive", "Figma"],
      github: "https://github.com/keiranmistry/stubook",
      live: "https://stubook.vercel.app",
      image: "/projects/stubook/stubookmaster.png",
      screenshots: [
        { id: 1, filename: "/projects/stubook/home.PNG", description: "Homepage" },
        { id: 2, filename: "/projects/stubook/assessments.PNG", description: "Grades Editor" },
        { id: 3, filename: "/projects/stubook/marks.PNG", description: "Marks" },
        { id: 4, filename: "/projects/stubook/calendar.PNG", description: "Calendar" },
        { id: 5, filename: "/projects/stubook/todo.PNG", description: "To-do List" }
      ],
      features: [
        "Cross-platform app iOS/Android app",
        "100+ downloads with a 5-star rating",
        "Streamline daily study routines",
        "Interactive calendar and to-do list",
        "Dynamic grades calculator",
        "Store past course history",
        "Local data storage using Hive",
        "UI created in Figma"
      ]
    },
    {
      id: 2,
      title: "HDI vs. Happiness Analysis",
      shortDescription: "Statistical analysis of HDI vs. happiness scores",
      fullDescription: "Statistical analysis exploring the relationship between Human Development Index (HDI) and happiness scores across countries.",
      technologies: ["Power BI", "Python", "Pandas", "NumPy", "Jupyter"],
      github: "https://github.com/keiranmistry/hdi-vs.-happiness",
      image: "/projects/hdi/hdimaster.png",
      screenshots: [
        { id: 1, filename: "/projects/hdi/hdispread.png", description: "HDI Histogram" },
        { id: 3, filename: "/projects/hdi/hdiboxwhisker.png", description: "Box and Whisker Plot" },
        { id: 2, filename: "/projects/hdi/hdirelation.png", description: "HDI vs. Happiness Scatter Plot" },
      ],
      features: [
        "Statistical analysis of HDI across 190+ countries",
        "Report, presentation, and data found in GitHub repository",
        "Conducted analysis between Europe vs. Asia quality of life",
        "Specified analysis of UK in comparison to global average",
        "Strong positive correlation (r ≈ 0.80) between HDI & Happiness",
        "Visualized data with histograms, box plots, and scatter plots",
        "Highlighted limitations of self-reported happiness data",
        "Created Power BI dashboard to visualize data",
      ]
    },
    {
      id: 3,
      title: "TrackSite",
      shortDescription: "Website tracking tool",
      fullDescription: "All-in-one application to store and organize websites, applications, and files to segregate workspaces and workflows.",
      technologies: ["React", "FastAPI", "SQL", "Javascript", "Node.js", "CSS"],
      github: "https://github.com/keiranmistry/tracksite",
      live: "https://tracksite.vercel.app",
      image: "/projects/tracksite/tracksitemaster.png",
      screenshots: [
        { id: 1, filename: "/projects/tracksite/home.png", description: "Home Page" },
        { id: 2, filename: "/projects/tracksite/edit.png", description: "Edit Mode" },
        { id: 3, filename: "/projects/tracksite/bookmarks.png", description: "Bookmarks" }
      ],
      features: [
        "Website, file, application uploads",
        "Opens up websites, files, and applications",
        "Folder creation",
        "Organizational system",
        "Responsive design",
        "Modern user interface"
      ]
    },
    {
      id: 4,
      title: "Soccer Tiki Taka Toe",
      shortDescription: "Dynamic soccer-themed tic-tac-toe game",
      fullDescription: "Soccer-themed tic-tac-toe game with adjustable difficulty levels, user login, and progress tracking.",
      technologies: ["Python", "React", "Flask", "JavaScript", "Node.js", "PostgreSQL", "SQLite", "SQLAlchemy", "pandas", "Vercel", "Railway"],
      github: "https://github.com/keiranmistry/tiki-taka-toe",
      live: "https://tiki-taka-toe-kappa.vercel.app/",
      image: "/projects/tikitakatoe/tikitakatoemaster.png",
      screenshots: [
        { id: 1, filename: "/projects/tikitakatoe/tikitakatoeboard.png", description: "Game Board" },
        { id: 2, filename: "/projects/tikitakatoe/tikitakatoestats.png", description: "Stats" },
        { id: 3, filename: "/projects/tikitakatoe/tikitakatoecomplete.png", description: "Game Complete" },
        { id: 4, filename: "/projects/tikitakatoe/tikitakatoelogin.png", description: "Login" },
        { id: 5, filename: "/projects/tikitakatoe/tikitakatoerules.png", description: "Rules" }
      ],
      features: [
        "Web-based soccer-themed Tic Tac Toe game",
        "Deployed with frontend on Vercel and backend on Railway",
        "Interactive gameplay combining clubs and countries",
        "Adjustable difficulty levels for varied challenges",
        "User login system with progress tracking",
        "Responsive UI for desktop and mobile",
        "Game logic and data handling implemented with Node/Express backend",
        "Modern Champions League frontend built with React + Tailwind CSS"
      ]
    },
    {
      id: 5,
      title: "Portfolio",
      shortDescription: "Personal portfolio website",
      fullDescription: "A modern, responsive portfolio website showcasing my personal side projects, working experiences, and travels.",
      technologies: ["React", "Next.js", "Node.js", "Framer Motion", "shadcn/ui", "Tailwind CSS", "TypeScript"],
      github: "https://github.com/keiranmistry/portfolio",
      live: "https://keiranmistry.vercel.app",
      image: "/projects/portfolio/portfoliomaster.png",
      screenshots: [
        { id: 1, filename: "portfolio-1.png", description: "Homepage" },
        { id: 2, filename: "portfolio-2.png", description: "Projects" },
        { id: 3, filename: "portfolio-3.png", description: "Gallery" }
      ],
      features: [
        "Dynamic user interface",
        "Interactive travel map"
      ],
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

  const getImagesPerSlide = useCallback(() => {
    // Determine the number of images to display per slide based on screen size
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 768) return 1; // Mobile
      if (window.innerWidth < 1024) return 2; // Tablet
      return 3; // Desktop
    }
    return 2; // Default fallback
  }, []);

  // Memoize the current images per slide to prevent recalculations
  const currentImagesPerSlide = useMemo(() => getImagesPerSlide(), [getImagesPerSlide]);

  // Handle window resize to update images per slide
  useEffect(() => {
    const handleResize = () => {
      // Debounce resize events to prevent excessive updates
      clearTimeout(resizeTimeout.current);
      resizeTimeout.current = setTimeout(() => {
        // Only update if the images per slide actually changed
        const newImagesPerSlide = getImagesPerSlide();
        if (newImagesPerSlide !== currentImagesPerSlide) {
          // Reset to first slide when layout changes
          setCurrentPhotoIndex(0);
        }
      }, 150);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimeout.current) {
        clearTimeout(resizeTimeout.current);
      }
    };
  }, [getImagesPerSlide, currentImagesPerSlide]);

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
              className="backdrop-blur-lg bg-white/5 border border-white/20 shadow-xl rounded-2xl overflow-hidden cursor-pointer hover:bg-white/10 transition-all duration-200"
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
            className="fixed inset-0 bg-black/20 backdrop-blur-lg z-50 flex items-center justify-center p-4"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative bg-white/10 backdrop-blur-lg border border-white/30 rounded-2xl p-8 max-w-7xl w-full max-h-[95vh] overflow-y-auto custom-scrollbar"
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
                    <div className="flex items-center gap-3">
                      {selectedProject.live && (
                        <a
                          href={selectedProject.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/60 hover:text-white transition-colors flex items-center"
                          aria-label="Open live website"
                        >
                          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9zm0 0a12.44 12.44 0 010 18m0-18a12.44 12.44 0 000 18M3 12h18M12 3v18" />
                          </svg>
                        </a>
                      )}
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
                  Key Notes
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
                <div className="relative bg-white/5 rounded-lg p-8">
                  {/* Main Photo Display */}
                  <div className="relative max-w-6xl mx-auto">
                    <div className="flex justify-center">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-4 justify-items-center">
                        {selectedProject.screenshots && selectedProject.screenshots.length > 0 && 
                          selectedProject.screenshots.map((screenshot, index) => (
                            <div key={screenshot.id} className="bg-white/10 rounded-lg flex flex-col items-center justify-center relative overflow-hidden w-full max-w-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-[1.02]">
                              <div className="flex-1 flex items-center justify-center w-full">
                                <img 
                                  src={screenshot.filename}
                                  alt={screenshot.description}
                                  className="w-full h-auto object-contain max-h-[700px] rounded-lg"
                                  loading="lazy"
                                  onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                  }}
                                />
                                <div className="w-full h-full flex items-center justify-center text-white/40 text-sm" style={{display: 'none'}}>
                                  {screenshot.description}
                                </div>
                              </div>
                              {/* Screenshot Caption */}
                              <div className="text-center w-full py-3">
                                <p className={`text-white/70 text-lg font-bold ${exo2.className}`}>
                                  {screenshot.description}
                                </p>
                              </div>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
} 