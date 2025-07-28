"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Barlow, Exo_2 } from 'next/font/google';

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '700'],
});

const exo2 = Exo_2({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function Experience() {
  const [selectedExperience, setSelectedExperience] = useState(0);
  const [typewriterText, setTypewriterText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [blinkCount, setBlinkCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const headingRef = useRef(null);

  const fullText = "experience";

  // Intersection Observer to detect when section is visited (same as Projects)
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          setIsTyping(true);
        }
      },
      { threshold: 0.5 }
    );
    if (headingRef.current) {
      observer.observe(headingRef.current);
    }
    return () => {
      if (headingRef.current) observer.unobserve(headingRef.current);
    };
  }, [hasAnimated]);

  useEffect(() => {
    if (isTyping && currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setTypewriterText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 250); // Slower typing speed

      return () => clearTimeout(timeout);
    } else if (isTyping && currentIndex >= fullText.length) {
      setIsTyping(false);
    }
  }, [currentIndex, isTyping, fullText]);

  // Separate useEffect for blinking after typing is complete
  useEffect(() => {
    if (!isTyping && currentIndex >= fullText.length && blinkCount === 0) {
      console.log('Starting blink sequence');
      
      // Blink 1: Show
      setTimeout(() => setShowCursor(true), 0);
      
      // Blink 1: Hide
      setTimeout(() => setShowCursor(false), 500);
      
      // Blink 2: Show
      setTimeout(() => setShowCursor(true), 1000);
      
      // Blink 2: Hide
      setTimeout(() => setShowCursor(false), 1500);
      
      // Blink 3: Show
      setTimeout(() => setShowCursor(true), 2000);
      
      // Blink 3: Hide and stay hidden
      setTimeout(() => {
        console.log('Final blink, hiding cursor permanently');
        setShowCursor(false);
        setBlinkCount(6); // Mark as complete
      }, 2500);
    }
  }, [isTyping, currentIndex, fullText, blinkCount]);

  const experiences = [
    {
      title: "Data Science",
      company: "University of Waterloo",
      period: "Sep. 2024 - Apr. 2029",
      location: "Waterloo, ON",
      description: "Bachelor of Mathematics",
      technologies: ["C", "Linux/Unix", "Functional Programming"],
      achievements: [
        "4.0 GPA", "Dean's List", "Data Science Club", "Relevant Coursework: Algorithm Design, Software Developer Tools, Functional Programming, Linear Algebra, Calculus",
        "Intramural Soccer"
      ],
      icon: "/icons/waterloo (2).png",
      mono: "/icons/waterloomono (1).png",
      url: "https://uwaterloo.ca/future-students/programs/data-science"
    },
    {
        title: "Technical Analyst",
        company: "Techtronic Industries",
        period: "May 2025 - Aug. 2025",
        location: "Toronto, ON",
        description: "description placeholder",
        technologies: ["tech1", "tech2", "tech3"],
        achievements: [
          "achievement 1",
          "achievement 2",
          "achievement 3"
        ],
        icon: "/icons/tti (1).png",
        mono: "/icons/ttimono.png",
        url: "https://www.ttigroup.com/"
      },
      {
        title: "Academic Tutor",
        company: "Tommy Douglas Secondary School",
        period: "Sep. 2022 - Jun. 2024",
        location: "Vaughan, ON",
        description: "description placeholder",
        technologies: ["tech1", "tech2", "tech3"],
        achievements: [
          "achievement 1",
          "achievement 2",
          "achievement 3"
        ],
        icon: "/icons/tdss (1).png",
        mono: "/icons/tdssmono.png",
        url: "http://www.yrdsb.ca/schools/tommydouglas.ss/Pages/default.aspx"
      }
  ];

  return (
    <section id="experience" className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 
            ref={headingRef}
            className={`text-6xl sm:text-8xl font-bold italic mb-4 ${barlow.className}`}
            style={{ display: 'inline-block' }}
          >
            <em>
              {typewriterText}
              <span className="italic" style={{ visibility: showCursor ? 'visible' : 'hidden' }}>|</span>
            </em>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Icon List on the Left */}
          <div className="lg:w-1/6 lg:mt-8">
            <div className="flex flex-row lg:flex-col space-x-4 lg:space-x-0 lg:space-y-16 relative">
              {experiences.map((experience, index) => (
                <React.Fragment key={index}>
                  <div className={`relative ${index === 1 ? 'ml-8 lg:ml-0' : ''}`}>
                    <button
                      onClick={() => setSelectedExperience(index)}
                      className={`w-16 h-16 rounded-lg transition-all duration-300 flex items-center cursor-pointer justify-center relative z-10 overflow-hidden ${
                        selectedExperience === index ? 'scale-125' : 'hover:scale-105'
                      }`}                      
                      style={{                        
                        background: selectedExperience === index 
                          ? 'rgba(147, 51, 234, 0.1)' 
                          : 'rgba(255, 255, 255, 0.05)',
                      
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        boxShadow: selectedExperience === index 
                          ? '0 8px 32px 0 rgba(31, 38, 135, 0.2), 0 0 20px rgba(147, 51, 234, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)' 
                          : '0 8px 32px 0 rgba(31, 38, 135, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                      }}
                    >
                      <img 
                        src={experience.icon} 
                        alt={`${experience.company} logo`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                    {/* Vertical line for desktop */}
                    {index === 1 && (
                      <div
                        className="hidden lg:block absolute left-8 top-16 w-0.5 h-16"
                        style={{ backgroundColor: '#0266B1' }}
                      ></div>
                    )}
                  </div>
                  {/* Horizontal line for mobile */}
                  {index === 1 && (
                    <div
                      className="block lg:hidden self-center w-8 h-0.5"
                      style={{ backgroundColor: '#0266B1' }}
                    ></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Main Card on the Right */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedExperience}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="lg:w-5/6"
            >
              <Card className="group hover:shadow-lg transition-all duration-300 min-h-[600px]">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <a 
                          href={experiences[selectedExperience].url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="block w-full h-full hover:opacity-80 transition-opacity cursor-pointer"
                        >
                          <img 
                            src={experiences[selectedExperience].mono} 
                            alt={`${experiences[selectedExperience].company} logo`}
                            className="w-full h-full object-cover"
                          />
                        </a>
                      </div>
                      <div>
                        <CardTitle className={`text-xl transition-colors ${barlow.className}`} style={{ color: '#033E7A', fontWeight: 'bold' }}>
                          {experiences[selectedExperience].title}
                        </CardTitle>
                        <CardDescription className={`font-semibold text-base transition-colors ${exo2.className}`} style={{ color: '#0266B1' }}>
                          {experiences[selectedExperience].company}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="text-right">
                        <Badge variant="secondary" className={`font-bold text-sm transition-colors ${exo2.className}`} style={{ color: '#E22716' }}>
                          {experiences[selectedExperience].period}
                        </Badge>
                      <p className={`font-semibold text-sm text-muted-foreground mt-1 transition-colors ${exo2.className}`} style={{ color: '#FF6456' }}>
                        {experiences[selectedExperience].location}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed" style={{ color: '#000000' }}>
                    {experiences[selectedExperience].description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {experiences[selectedExperience].technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <Separator />

                  <div>
                    <h4 className={`font-semibold mb-2 ${exo2.className}`} style={{ color: '#0266B1' }}>Key Achievements:</h4>
                    <ul className="space-y-1">
                      {experiences[selectedExperience].achievements.map((achievement, achievementIndex) => (
                        <li key={achievementIndex} className="text-medium text-muted-foreground flex items-center gap-4">
                          <span className="text-primary">•</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
} 