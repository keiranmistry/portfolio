"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function Education() {
  const education = [
    {
      degree: "math",
      institution: "uw",
      period: "2024",
      location: "waterloo",
      gpa: "edit",
      description: "Focused on software engineering, machine learning, and distributed systems. Completed thesis on scalable web application architectures.",
      relevantCourses: [
        "Advanced Software Engineering",
        "Machine Learning",
        "Distributed Systems",
        "Database Systems",
        "Computer Networks"
      ],
      achievements: [
        "Graduated with distinction",
        "Teaching Assistant for CS101",
        "Published research paper on web performance optimization"
      ]
    }
  ];

  return (
    <section id="education" className="py-20 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Education</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            My academic background and professional certifications that have 
            shaped my technical expertise and professional development.
          </p>
        </div>

        {/* Education */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 text-center">Academic Background</h3>
          <div className="space-y-8">
            {education.map((edu, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {edu.degree}
                      </CardTitle>
                      <CardDescription className="text-base font-medium">
                        {edu.institution}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary" className="text-sm">
                        {edu.period}
                      </Badge>
                      <p className="text-sm text-muted-foreground mt-1">
                        {edu.location}
                      </p>
                      <p className="text-sm font-medium mt-1">
                        GPA: {edu.gpa}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {edu.description}
                  </p>

                  <div>
                    <h4 className="font-semibold mb-2">Relevant Coursework:</h4>
                    <div className="flex flex-wrap gap-2">
                      {edu.relevantCourses.map((course, courseIndex) => (
                        <Badge key={courseIndex} variant="outline" className="text-xs">
                          {course}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold mb-2">Achievements:</h4>
                    <ul className="space-y-1">
                      {edu.achievements.map((achievement, achievementIndex) => (
                        <li key={achievementIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 