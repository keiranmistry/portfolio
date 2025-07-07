"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Projects() {
  const projects = [
    {
      title: "Project 1",
      description: "e",
      technologies: ["tech1", "tech2", "tech3"],
      github: "github link",
      image: "/api/placeholder/400/250"
    },
    {
      title: "Project 2",
      description: "e",
      technologies: ["tech1", "tech2", "tech3"],
      github: "github link",
      image: "/api/placeholder/400/250"
    },
    {
      title: "Project 3",
      description: "e",
      technologies: ["tech1", "tech2", "tech3"],
      github: "github link",
      image: "/api/placeholder/400/250"
    },
    {
      title: "Portfolio Website",
      description: "A modern, responsive portfolio website built with Next.js and Tailwind CSS, featuring smooth animations and optimal performance.",
      technologies: ["Next.js", "Tailwind CSS", "Framer Motion", "shadcn/ui"],
      github: "https://github.com/yourusername/portfolio",
      live: "https://your-portfolio.vercel.app",
      image: "/api/placeholder/400/250"
    }
  ];

  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Here are some of the projects I've built. Each one represents different 
            skills and technologies I've worked with.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="aspect-video bg-muted rounded-lg mb-4 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <span className="text-muted-foreground">Project Preview</span>
                  </div>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-base">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
                
                <Separator />
                
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => window.open(project.github, '_blank')}
                  >
                    GitHub
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" onClick={() => window.open('https://github.com/yourusername', '_blank')}>
            View All Projects on GitHub
          </Button>
        </div>
      </div>
    </section>
  );
} 