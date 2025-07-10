"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Experience() {
  const [selectedExperience, setSelectedExperience] = useState(0);

  const experiences = [
    {
      title: "sample",
      company: "company",
      period: "date",
      location: "toronto",
      description: "about",
      technologies: ["tech1", "tech2", "tech3"],
      achievements: [
        "notes"
      ],
      icon: "/icons/waterloo (2).png"
    },
    {
        title: "e",
        company: "r",
        period: "r",
        location: "a",
        description: "abosut",
        technologies: ["tec213h1", "tecwdfwch2", "twqeech3"],
        achievements: [
          "fdsfdsnotes"
        ],
        icon: "/icons/tti (1).png"
      },
      {
        title: "e",
        company: "r",
        period: "r",
        location: "a",
        description: "abosut",
        technologies: ["tec213h1", "tecwdfwch2", "twqeech3"],
        achievements: [
          "fdsfdsnotes"
        ],
        icon: "/icons/tdss (1).png"
      }
  ];

  return (
    <section id="experience" className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Work Experience</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            My professional journey in software development, showcasing growth 
            and achievements across different roles and companies.
          </p>
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
                      className={`w-16 h-16 rounded-lg transition-all duration-300 flex items-center justify-center relative z-10 overflow-hidden ${
                        selectedExperience === index
                          ? 'scale-125'
                          : 'hover:scale-105'
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
                    <div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {experiences[selectedExperience].title}
                      </CardTitle>
                      <CardDescription className="text-base font-medium">
                        {experiences[selectedExperience].company}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary" className="text-sm">
                        {experiences[selectedExperience].period}
                      </Badge>
                      <p className="text-sm text-muted-foreground mt-1">
                        {experiences[selectedExperience].location}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
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
                    <h4 className="font-semibold mb-2">Key Achievements:</h4>
                    <ul className="space-y-1">
                      {experiences[selectedExperience].achievements.map((achievement, achievementIndex) => (
                        <li key={achievementIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
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

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" onClick={() => window.open('/resume.pdf', '_blank')}>
            Download Full Resume
          </Button>
        </div>
      </div>
    </section>
  );
} 