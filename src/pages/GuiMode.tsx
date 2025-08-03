import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FaReact, FaNodeJs, FaGitAlt } from "react-icons/fa";
import homeImage from "../Assets/home.png";
import books from "../Assets/books4books.png";
import taskflow from "../Assets/Taskflow.png";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ExternalLink,
  Github,
  Terminal,
  LifeBuoy,
  User,
  FolderKanban,
  Mail,
} from "lucide-react";
import FloatingSVGs from "@/components/FloatingSVGs";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";

// Floating binary effect
const FloatingBinaryParticles = () => {
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; delay: number; binary: string }>
  >([]);

  useEffect(() => {
    const binaryChars = ["0", "1"];
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 6,
      binary: Array.from(
        { length: 8 },
        () => binaryChars[Math.floor(Math.random() * 2)]
      ).join(""),
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

// Project card
const ProjectCard = ({ project, index }: { project: any; index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      className={`bg-card border-neon-green hover:border-neon-green-glow transition-all duration-300 cursor-pointer group ${
        isExpanded ? "scale-105 z-10" : "hover:scale-102"
      }`}
      onClick={() => setIsExpanded(!isExpanded)}
      style={{
        boxShadow: isExpanded
          ? "0 0 30px hsl(var(--neon-green) / 0.4)"
          : "0 0 10px hsl(var(--neon-green) / 0.2)",
        animation: `fadeIn 0.6s ease-out ${index * 0.2}s both`,
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
          <div className="space-y-4">
            <div className="w-full h-48 bg-muted rounded-lg flex items-center justify-center border border-neon-green/30 overflow-hidden">
              {project.imageUrl ? (
                <img
                  src={project.imageUrl}
                  alt={`${project.name} screenshot`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center text-muted-foreground">
                  <div className="text-sm font-mono">
                    {project.name} Screenshot
                  </div>
                  <div className="text-xs mt-1">{project.tech}</div>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="default"
              size="sm"
              className="bg-primary hover:bg-primary-glow text-primary-foreground neon-glow"
              onClick={(e) => {
                e.stopPropagation();
                window.open(project.demo, "_blank");
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
                window.open(project.github, "_blank");
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
  const [navOpen, setNavOpen] = useState(false);
  const location = useLocation();

  const aboutRef = useRef<HTMLDivElement | null>(null);
  const projectsRef = useRef<HTMLDivElement | null>(null);
  const contactRef = useRef<HTMLDivElement | null>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setNavOpen(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => setHeaderVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (location.state?.scrollTo) {
      const timer = setTimeout(() => {
        const element = document.getElementById(location.state.scrollTo);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  const projects = [
    {
      name: "TaskFlow",
      description:
        "TaskFlow is an intuitive project management and team collaboration platform designed to streamline workflows and boost productivity. It features real-time task tracking, organized project boards, and built-in team communication, all presented in a clean, responsive interface. Built with React and Tailwind CSS, TaskFlow delivers a seamless, fully interactive frontend experience that simulates a modern SaaS workflow.",
      demo: "https://task-flow-steel-phi.vercel.app/",
      github: "https://github.com/creeksonJoseph/Task-flow",
      tech: "React, Socket.io, Express, PostgreSQL",
      imageUrl: taskflow,
    },
    {
      name: "AniHaven",
      description:
        "AniHaven is a dynamic content discovery platform that mimics the search and recommendation systems used by modern streaming services. It allows users to search anime titles, watch previews, view metadata, and discover recommendations based on trending content. Built this with JavaScript and powered by JIKAN API, a public API for anime.Main goal was to learn DOM manipulation and master the Full REST API CRUD operations.",
      demo: "https://creeksonjoseph.github.io/AniHaven/",
      github: "https://github.com/creeksonJoseph/AniHaven",
      tech: "React, TypeScript, Jikan API, Tailwind CSS",
      imageUrl: homeImage,
    },
    {
      name: "Books for books",
      description:
        "BOOK 4 BOOK is a modern web application designed to allow users to sign up, log in, browse and manage books, create reading playlists, and exchange books with others in the community.",
      demo: "https://phase-2-project-group-kappa.vercel.app/",
      github: "https://github.com/creeksonJoseph/Book4Books",
      tech: "React, Node.js, MongoDB, Chart.js",
      imageUrl: books,
    },
    // {
    //   name: "DeadTime",
    //   description:
    //     "A gamified productivity app that makes completing tasks addictive with streaks and XP.",
    //   demo: "https://deadtime.dev",
    //   github: "https://github.com/creeksonJoseph/404",
    //   tech: "React, Firebase, PWA, Framer Motion",
    // },

    // {
    //   name: "CodeSnippet",
    //   description:
    //     "Developer tool for organizing and sharing code snippets with syntax highlighting.",
    //   demo: "https://codesnippet.dev",
    //   github: "https://github.com/joseph/codesnippet",
    //   tech: "React, Prism.js, Firebase, Material-UI",
    // },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <FloatingBinaryParticles />
      <FloatingSVGs />

      {/* Floating Quick Nav */}
      <div className="fixed right-6 bottom-6 z-50 flex flex-col items-end space-y-3">
        {navOpen && (
          <div className="flex flex-col items-center space-y-3 mb-3 animate-fadeIn">
            <button
              className="bg-neon-green text-background p-3 rounded-full shadow-neon hover:scale-110 transition"
              onClick={() => scrollToSection(aboutRef)}
            >
              <User className="w-5 h-5" />
            </button>
            <button
              className="bg-neon-green text-background p-3 rounded-full shadow-neon hover:scale-110 transition"
              onClick={() => scrollToSection(projectsRef)}
            >
              <FolderKanban className="w-5 h-5" />
            </button>
            <button
              className="bg-neon-green text-background p-3 rounded-full shadow-neon hover:scale-110 transition"
              onClick={() => scrollToSection(contactRef)}
            >
              <Mail className="w-5 h-5" />
            </button>
          </div>
        )}

        <button
          onClick={() => setNavOpen(!navOpen)}
          className="p-5 rounded-full bg-neon-yellow text-background shadow-neon hover:scale-110 transition-all duration-300"
        >
          <LifeBuoy className="w-6 h-6 animate-spin-slow" />
        </button>
      </div>

      {/* Header */}
      <header className="relative z-10 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center">
            <h1
              className={`text-4xl md:text-6xl font-gui font-bold text-foreground transition-all duration-1000 ${
                headerVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{
                textShadow: "0 0 20px hsl(var(--neon-green) / 0.5)",
              }}
            >
              Joseph's Haven
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

      {/* About Section */}
      <div ref={aboutRef}>
        <AboutSection />
      </div>

      {/* Projects Grid */}
      <section
        id="projects"
        ref={projectsRef}
        className="relative z-10 py-20 px-8"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-gui font-bold text-neon-green mb-16 text-center">
            Featured Projects
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.name} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <div ref={contactRef}>
        <ContactSection />
      </div>

      {/* Footer */}
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
