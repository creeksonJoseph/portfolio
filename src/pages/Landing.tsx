import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const FloatingParticles = () => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 6,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="particles">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

const HourglassIcon = () => (
  <svg
    className="w-8 h-8 animate-pulse"
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M6 2v6h.01L6 8.01 10 12l-4 4 .01.01H6V22h12v-5.99h-.01L18 16l-4-4 4-3.99-.01-.01H18V2H6zm10 14.5V20H8v-3.5l4-4 4 4zm-4-5l-4-4V4h8v3.5l-4 4z" />
  </svg>
);

const Landing = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      <FloatingParticles />
      
      {/* Floating hourglass in corner */}
      <div className="absolute top-8 right-8 text-neon-green opacity-60">
        <HourglassIcon />
      </div>

      <div className="text-center z-10">
        {/* Main title with glitch effect */}
        <h1 
          className="text-6xl md:text-8xl font-bold mb-8 glitch text-foreground"
          data-text="Welcome to Joseph's Haven"
        >
          Welcome to Joseph's Haven
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl mb-12 text-neon-green-glow font-gui">
          Choose your experience: GUI or CMD
        </p>

        {/* Mode selection buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link to="/gui">
            <Button 
              variant="default" 
              size="lg"
              className="bg-primary hover:bg-primary-glow text-primary-foreground font-gui text-lg px-8 py-4 neon-glow transition-all duration-300 hover:scale-105"
            >
              GUI Mode
            </Button>
          </Link>
          
          <Link to="/cmd">
            <Button 
              variant="outline" 
              size="lg"
              className="border-terminal-cursor text-terminal-cursor hover:bg-terminal-cursor hover:text-background font-mono text-lg px-8 py-4 terminal-glow transition-all duration-300 hover:scale-105"
            >
              CMD Mode
            </Button>
          </Link>
        </div>
      </div>

      {/* Subtle scanlines effect */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="h-full w-full bg-gradient-to-b from-transparent via-neon-green to-transparent bg-[length:100%_4px] animate-pulse" />
      </div>
    </div>
  );
};

export default Landing;