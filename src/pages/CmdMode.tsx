import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TerminalInput from "@/components/TerminalInput";
import CommandButtons from "@/components/CommandButtons";

const TypewriterText = ({ text, onComplete }: { text: string; onComplete?: () => void }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 50);
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, onComplete]);

  return <span>{displayText}</span>;
};

const BlinkingCursor = () => (
  <span className="animate-blink text-terminal-cursor">█</span>
);

const CmdMode = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [idleMessages] = useState([
    "> system idle...",
    "> remember: git push or cry later.",
    "> coffee.exe not found, productivity.exe crashed.",
    "> status: probably debugging something...",
  ]);
  const [currentIdleMessage, setCurrentIdleMessage] = useState(0);

  const initMessages = [
    "Initializing Joseph's Haven v1.0...",
    "Loading environment variables...",
    "Access Granted.",
    "",
    "hi there...",
    "this is Joseph's Haven...",
    "> Joseph - Fullstack Developer"
  ];

  const projects = [
    {
      name: "AniFinder",
      description: "Search and explore anime with trailers and live streaming links.",
      demo: "https://anifinder.live",
      tech: "React, Jikan API, TypeScript"
    },
    {
      name: "BudgetBuddy", 
      description: "Smart budgeting app with goal tracking and gamified dashboard.",
      demo: "https://budgetbuddy.io",
      tech: "React, Node.js, MongoDB"
    },
    {
      name: "DeadTime",
      description: "Gamified productivity app with streak system and XP rewards.",
      demo: "https://deadtime.dev", 
      tech: "React, Firebase, PWA"
    }
  ];

  useEffect(() => {
    if (showMenu && !selectedProject) {
      const interval = setInterval(() => {
        setCurrentIdleMessage((prev) => (prev + 1) % idleMessages.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [showMenu, selectedProject, idleMessages.length]);

  const handleStepComplete = () => {
    if (currentStep < initMessages.length - 1) {
      setTimeout(() => setCurrentStep(prev => prev + 1), 500);
    } else {
      setTimeout(() => setShowMenu(true), 1000);
    }
  };

  const handleProjectSelect = (projectName: string) => {
    setSelectedProject(projectName);
  };

  const handleCommand = (command: string) => {
    const cmd = command.toLowerCase();
    
    switch (cmd) {
      case '1':
        setSelectedProject("menu");
        break;
      case '2':
        setSelectedProject("why-hire-me");
        break;
      case '3':
        setSelectedProject("lets-talk");
        break;
      case 'h':
      case 'home':
        setSelectedProject(null);
        break;
      case 'help':
        setSelectedProject("help");
        break;
      default:
        // Invalid command - could show error message
        break;
    }
  };

  const selectedProjectData = projects.find(p => p.name === selectedProject);

  return (
    <div className="min-h-screen bg-background p-4 flex items-center justify-center">
      <div className="terminal-window rounded-lg p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
        {/* Terminal header */}
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-neon-green">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-neon-yellow"></div>
          <div className="w-3 h-3 rounded-full bg-neon-green"></div>
          <span className="ml-4 text-terminal-text text-sm">joseph@haven:~$</span>
        </div>

        {/* Terminal content */}
        <div className="space-y-2 text-terminal-text font-mono">
          {/* Initialization messages */}
          {initMessages.slice(0, currentStep + 1).map((message, index) => (
            <div key={index} className="flex items-center">
              <span className="text-neon-green mr-2">$</span>
              {index === currentStep ? (
                <TypewriterText text={message} onComplete={handleStepComplete} />
              ) : (
                <span>{message}</span>
              )}
              {index === currentStep && <BlinkingCursor />}
            </div>
          ))}

          {/* Terminal Input */}
          {showMenu && (
            <div className="mt-6 border-t border-neon-green pt-4">
              <TerminalInput onCommand={handleCommand} />
              <CommandButtons onCommand={handleCommand} />
            </div>
          )}

          {/* Menu options */}
          {showMenu && !selectedProject && (
            <div className="mt-6 space-y-2">
              <div className="text-neon-yellow">Available commands:</div>
              <div 
                className="cursor-pointer hover:text-neon-green transition-colors"
                onClick={() => handleProjectSelect("menu")}
              >
                [1] View his creations
              </div>
              <div 
                className="cursor-pointer hover:text-neon-green transition-colors"
                onClick={() => handleProjectSelect("why-hire-me")}
              >
                [2] Why hire Joseph?
              </div>
              <div 
                className="cursor-pointer hover:text-neon-green transition-colors"
                onClick={() => handleProjectSelect("lets-talk")}
              >
                [3] Let's Talk
              </div>
              <div className="mt-4 text-gray-500 text-sm animate-pulse">
                {idleMessages[currentIdleMessage]}
              </div>
            </div>
          )}

          {/* Projects list */}
          {selectedProject === "menu" && (
            <div className="mt-6 space-y-4">
              <div className="text-neon-yellow">Projects Repository:</div>
              {projects.map((project, index) => (
                <div 
                  key={project.name}
                  className="cursor-pointer hover:text-neon-green transition-colors pl-4"
                  onClick={() => handleProjectSelect(project.name)}
                >
                  <span className="text-neon-yellow">[{index + 1}]</span> {project.name} - {project.description.split('.')[0]}
                </div>
              ))}
              <div 
                className="cursor-pointer hover:text-neon-green transition-colors text-gray-400 mt-4"
                onClick={() => setSelectedProject(null)}
              >
                [B] Back to main menu
              </div>
            </div>
          )}

          {/* Why Hire Me */}
          {selectedProject === "why-hire-me" && (
            <div className="mt-6 space-y-4">
              <div className="text-neon-yellow">Why Hire Joseph?</div>
              <div className="text-foreground">
                I craft sleek, high-performance web apps with next-level UI using JavaScript, React, and Tailwind CSS.
              </div>
              <div className="text-neon-green">Skills:</div>
              <div className="pl-4">
                <div>• HTML - Semantic markup & accessibility</div>
                <div>• JavaScript - Modern ES6+ & async programming</div>
                <div>• React - Component architecture & state management</div>
                <div>• Tailwind CSS - Utility-first responsive design</div>
              </div>
              <div className="text-neon-green">Tools:</div>
              <div className="pl-4">
                <div>• Git/GitHub - Version control & collaboration</div>
                <div>• Figma - UI/UX design & prototyping</div>
              </div>
              <div 
                className="cursor-pointer hover:text-neon-green transition-colors text-gray-400 mt-4"
                onClick={() => setSelectedProject(null)}
              >
                [B] Back to main menu
              </div>
            </div>
          )}

          {/* Let's Talk */}
          {selectedProject === "lets-talk" && (
            <div className="mt-6 space-y-4">
              <div className="text-neon-yellow">Let's Talk - Contact Information</div>
              <div className="space-y-2">
                <div className="text-neon-green">WhatsApp: https://wa.me/1234567890</div>
                <div className="text-neon-green">LinkedIn: https://linkedin.com/in/joseph</div>
                <div className="text-neon-green">Gmail: joseph@example.com</div>
                <div className="text-neon-green">GitHub: https://github.com/joseph</div>
              </div>
              <div 
                className="cursor-pointer hover:text-neon-green transition-colors text-gray-400 mt-4"
                onClick={() => setSelectedProject(null)}
              >
                [B] Back to main menu
              </div>
            </div>
          )}

          {/* Help */}
          {selectedProject === "help" && (
            <div className="mt-6 space-y-2">
              <div className="text-neon-yellow">Available Commands:</div>
              <div className="pl-4 space-y-1">
                <div>[1] or "1" - View Projects</div>
                <div>[2] or "2" - Why Hire Me</div>
                <div>[3] or "3" - Let's Talk</div>
                <div>[h] or "home" - Return to main menu</div>
                <div>[help] - Show this help</div>
              </div>
              <div 
                className="cursor-pointer hover:text-neon-green transition-colors text-gray-400 mt-4"
                onClick={() => setSelectedProject(null)}
              >
                [B] Back to main menu
              </div>
            </div>
          )}

          {/* Project details */}
          {selectedProjectData && (
            <div className="mt-6 space-y-2">
              <div className="text-neon-yellow">Project: {selectedProjectData.name}</div>
              <div>Description: {selectedProjectData.description}</div>
              <div>Tech Stack: {selectedProjectData.tech}</div>
              <div className="text-neon-green">Live Demo {'->'} [{selectedProjectData.demo}]</div>
              <div className="text-neon-green">GitHub {'->'} Pinned on my profile</div>
              <div 
                className="cursor-pointer hover:text-neon-green transition-colors text-gray-400 mt-4"
                onClick={() => setSelectedProject("menu")}
              >
                [B] Back to projects
              </div>
            </div>
          )}
        </div>

        {/* Bottom navigation */}
        <div className="mt-8 pt-4 border-t border-neon-green">
          <Link 
            to="/gui" 
            className="text-neon-yellow hover:text-neon-green transition-colors text-sm"
          >
            [G] Switch to GUI Mode
          </Link>
          <span className="mx-4 text-gray-500">|</span>
          <Link 
            to="/" 
            className="text-neon-yellow hover:text-neon-green transition-colors text-sm"
          >
            [H] Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CmdMode;