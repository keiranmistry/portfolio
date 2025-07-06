"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-6">
          {/* Greeting */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
              Hi, I'm{" "}
              <span className="text-primary">Keiran</span>
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground">
              Full-Stack Developer
            </p>
          </div>

          {/* Description */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            I build modern web applications with a focus on user experience, 
            performance, and clean code. Passionate about creating impactful 
            digital solutions that solve real-world problems.
          </p>

          {/* Skills Badges */}
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="secondary">React</Badge>
            <Badge variant="secondary">Next.js</Badge>
            <Badge variant="secondary">TypeScript</Badge>
            <Badge variant="secondary">Node.js</Badge>
            <Badge variant="secondary">Python</Badge>
            <Badge variant="secondary">PostgreSQL</Badge>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' })}>
              View My Work
            </Button>
            <Button size="lg" variant="outline" onClick={() => document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' })}>
              Get In Touch
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
              <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 