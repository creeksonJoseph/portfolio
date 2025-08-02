import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Github, Terminal } from "lucide-react";

const FloatingBinaryParticles = () => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number; binary: string }>>([]);

  useEffect(() => {
    const binaryChars = ['0', '1'];
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 6,
      binary: Array.from({ length: 8 }, () => binaryChars[Math.floor(Math.random() * 2)]).join(''),
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="particles">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute text-xs text-neon-green opacity-20 font-mono"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animation: `float 8s infinite ease-in-out ${particle.delay}s`,
          }}
        >
          {particle.binary}
        </div>
      ))}
    </div>
  );
};

const ProjectCard = ({ project, index }: { project: any; index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card 
      className={`bg-card border-neon-green hover:border-neon-green-glow transition-all duration-300 cursor-pointer group ${
        isExpanded ? 'scale-105 z-10' : 'hover:scale-102'
      }`}
      onClick={() => setIsExpanded(!isExpanded)}
      style={{
        boxShadow: isExpanded ? '0 0 30px hsl(var(--neon-green) / 0.4)' : '0 0 10px hsl(var(--neon-green) / 0.2)',
        animation: `fadeIn 0.6s ease-out ${index * 0.2}s both`
      }}
    >
      <CardHeader>
        <CardTitle className="text-neon-green font-gui text-xl group-hover:text-neon-green-glow transition-colors">
          {project.name}
        </CardTitle>
        <CardDescription className="text-foreground">
          {project.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Project image placeholder */}
          <div className="w-full h-48 bg-muted rounded-lg flex items-center justify-center border border-neon-green/30">
            <div className="text-center text-muted-foreground">
              <div className="text-sm font-mono">{project.name} Screenshot</div>
              <div className="text-xs mt-1">{project.tech}</div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button 
              variant="default" 
              size="sm"
              className="bg-primary hover:bg-primary-glow text-primary-foreground neon-glow"
              onClick={(e) => {
                e.stopPropagation();
                window.open(project.demo, '_blank');
              }}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Live Demo
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="border-neon-yellow text-neon-yellow hover:bg-neon-yellow hover:text-background"
              onClick={(e) => {
                e.stopPropagation();
                // Would open GitHub profile
              }}
            >
              <Github className="w-4 h-4 mr-2" />
              View on GitHub
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const GuiMode = () => {
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHeaderVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const projects = [
    {
      name: "AniFinder",
      description: "A React SPA to search, explore, and watch anime trailers using the Jikan API.",
      demo: "https://anifinder.live",
      tech: "React, TypeScript, Jikan API, Tailwind CSS",
      image: "/api/placeholder/400/200"
    },
    {
      name: "BudgetBuddy", 
      description: "A goal-driven budgeting app that tracks expenses and gives insights in a fun gamified dashboard.",
      demo: "https://budgetbuddy.io",
      tech: "React, Node.js, MongoDB, Chart.js",
      image: "/api/placeholder/400/200"
    },
    {
      name: "DeadTime",
      description: "A gamified productivity app that makes completing tasks addictive with streaks and XP.",
      demo: "https://deadtime.dev", 
      tech: "React, Firebase, PWA, Framer Motion",
      image: "/api/placeholder/400/200"
    }
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <FloatingBinaryParticles />
      
      {/* Header */}
      <header className="relative z-10 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center">
            <h1 
              className={`text-4xl md:text-6xl font-gui font-bold text-foreground transition-all duration-1000 ${
                headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{
                textShadow: '0 0 20px hsl(var(--neon-green) / 0.5)'
              }}
            >
              Hey! You've reached Joseph's Haven
            </h1>
            <Link to="/cmd">
              <Button 
                variant="outline" 
                className="border-terminal-cursor text-terminal-cursor hover:bg-terminal-cursor hover:text-background font-mono"
              >
                <Terminal className="w-4 h-4 mr-2" />
                Hack Mode
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Projects Grid */}
      <main className="relative z-10 p-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-gui font-semibold text-neon-green mb-8 text-center">
            Featured Projects
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.name} project={project} index={index} />
            ))}
          </div>
        </div>
      </main>

      {/* Navigation */}
      <footer className="relative z-10 p-8">
        <div className="max-w-6xl mx-auto text-center">
          <Link 
            to="/" 
            className="text-neon-yellow hover:text-neon-yellow-glow transition-colors font-gui"
          >
            ← Back to Haven
          </Link>
        </div>
      </footer>

      {/* Subtle scanlines effect */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="h-full w-full bg-gradient-to-b from-transparent via-neon-green to-transparent bg-[length:100%_2px] animate-pulse" />
      </div>
    </div>
  );
};

export default GuiMode;