import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AnimatedMenuButton from "@/components/AnimatedMenuButton";
import FloatingSVGs from "@/components/FloatingSVGs";

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
  const navigate = useNavigate();

  const handleViewProjects = () => {
    navigate('/gui');
  };

  const handleWhyHireMe = () => {
    navigate('/gui', { state: { scrollTo: 'about' } });
  };

  const handleLetsTalk = () => {
    navigate('/gui', { state: { scrollTo: 'contact' } });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      <FloatingParticles />
      <FloatingSVGs />
      
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
          Full-Stack Developer & UI Architect
        </p>

        {/* Animated menu button */}
        <div className="mb-8">
          <AnimatedMenuButton
            onViewProjects={handleViewProjects}
            onWhyHireMe={handleWhyHireMe}
            onLetsTalk={handleLetsTalk}
          />
        </div>

        {/* Alternative mode links */}
        <div className="text-sm text-muted-foreground">
          <span>Or explore in </span>
          <button 
            onClick={() => navigate('/cmd')}
            className="text-terminal-cursor hover:text-neon-yellow transition-colors underline"
          >
            Terminal Mode
          </button>
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