import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const CmdMode = () => {
  const [history, setHistory] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      key: "a",
      name: "Deadtime",
      synopsis: "Digital graveyard for abandoned developer projects.",
      description:
        "Deadtime is a digital graveyard where developers can bury their abandoned projects with dignity, revive forgotten ideas and give them new life, discover hidden gems from other developers, and build a community around project resurrection. Think of it as GitHub meets archaeology - where every abandoned repository has a chance at redemption.",
      demo: "https://deadtime2.vercel.app/",
      github: "https://github.com/creeksonJoseph/Deadtime/",
      tech: "React, TypeScript, Node.js, MongoDB",
    },
    {
      key: "b",
      name: "FitFam",
      synopsis: "Social fitness platform for tracking workouts & challenges.",
      description:
        "FitFam is a social fitness platform where friends can track their workouts, share progress, compete in challenges, and stay accountable together. It's a space built to make fitness fun, consistent, and community-driven - where motivation comes from your circle, not just your screen.",
      demo: "https://fit-fam-eight.vercel.app/",
      github: "https://github.com/ogzacky75/Group_fitness_app",
      tech: "React, TypeScript, Node.js, MongoDB",
    },
    {
      key: "c",
      name: "AniHaven",
      synopsis: "Search and discover anime with previews & recommendations.",
      description:
        "AniHaven is a dynamic content discovery platform that mimics the search and recommendation systems used by modern streaming services. It allows users to search anime titles, watch previews, view metadata, and discover recommendations based on trending content. Built this with JavaScript and powered by JIKAN API, a public API for anime.",
      demo: "https://creeksonjoseph.github.io/AniHaven/",
      github: "https://github.com/creeksonJoseph/AniHaven",
      tech: "Vanilla js, Jikan API, Tailwind CSS",
    },
  ];

  const introMessages = [
    "hi there...",
    "this is Joseph's Haven...",
    "> Joseph is pleased to have you here",
    "Available commands:",
    "• [cd projects] - View Projects",
    "• [cd about] - Why Hire Me",
    "• [cd contacts] - Let's Talk",
    "• [cd ..] - to go back",
    "• [clear] - Clear the screen",
    "• [help] - for commands guide",
  ];

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  // Print intro on load
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setHistory((prev) => [...prev, String(introMessages[i])]);
      i++;
      if (i >= introMessages.length) clearInterval(interval);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const appendToHistory = (lines: string[]) => {
    setHistory((prev) => [...prev, ...lines.map(String)]);
  };

  const handleCommand = (raw: string) => {
    const cmd = raw.toLowerCase();
    let output: string[] = [];

    if (cmd === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    // Handle cd ..
    if (cmd === "cd ..") {
      if (selectedSection === "projects") {
        setSelectedSection(null);
        output.push("Returned to main menu.....");
      } else if (selectedSection?.startsWith("project-")) {
        setSelectedSection("projects");
        output.push("Back to projects list...");
        projects.forEach((p) =>
          output.push(`[${p.key.toUpperCase()}] ${p.name} - ${p.synopsis}`)
        );
        output.push(
          "Type project letter to see details or 'cd ..' to go back."
        );
      } else {
        output.push("Already at main menu.");
      }

      appendToHistory([`creekson@joseph$ ${raw}`, ...output]);
      setInput("");
      return;
    }

    switch (cmd) {
      case "cd projects":
        setSelectedSection("projects");
        output.push("=== Projects === ");
        projects.forEach((p) =>
          output.push(`[${p.key.toUpperCase()}] ${p.name} - ${p.synopsis}`)
        );
        output.push(
          "Type project letter to see details or 'cd ..' to go back."
        );
        break;

      case "cd about":
        setSelectedSection("why");
        output.push("=== Why Hire Joseph ===");
        output.push(
          "I craft sleek, high-performance and responsive web apps with React + Tailwind."
        );
        output.push("Skills: HTML, JavaScript, React, Tailwind CSS");
        output.push("Tools: Git/GitHub, Figma for UX/UI design");
        output.push("Type 'cd ..' to return to menu");
        break;

      case "cd contacts":
        setSelectedSection("contact");
        output.push("=== Let's Talk ===");
        output.push(
          "LinkedIn: https://www.linkedin.com/in/joseph-charana-038328353/"
        );
        output.push("Gmail: charanajoseph@gmail.com");
        output.push("GitHub: https://github.com/creeksonJoseph");
        output.push("Type 'cd ..' to return to menu");
        break;

      case "help":
        output.push("=== Help ===");
        output.push("[cd projects] - View Projects");
        output.push("[cd about] - Why Hire Me");
        output.push("[cd contacts] - Let's Talk");
        output.push("[clear] - Clear the screen");
        output.push("[cd ..] - To go back");
        break;

      default:
        if (selectedSection === "projects") {
          const project = projects.find((p) => p.key === cmd);
          if (project) {
            setSelectedSection(`project-${project.key}`);
            output.push(`=== Project: ${project.name} ===`);
            output.push(`Description: ${project.description}`);
            output.push(`Tech Stack: ${project.tech}`);
            output.push(`Live Demo -> ${project.demo}`);
            output.push(`GitHub -> ${project.github}`);
            output.push("Type 'cd ..' to return to projects");
          } else {
            output.push(
              "Invalid project key. Type 'cd ..' to go back or a project letter to view a project."
            );
          }
        } else {
          output.push(`Command not recognized: ${raw}`);
          output.push("Type 'help' for available commands.");
        }
    }

    appendToHistory([`creekson@joseph$ ${raw}`, ...output]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) handleCommand(input.trim());
  };

  // Small screen guard
  const isSmallScreen = window.innerWidth < 640;
  if (isSmallScreen) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-center p-6 text-terminal-text font-mono">
        <div>
          <p className="text-neon-yellow mb-4">
            Terminal mode is best on larger screens.
          </p>
          <Link
            to="/gui"
            className="text-neon-green underline hover:text-neon-yellow transition-colors"
          >
            Continue to GUI Mode
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 flex items-center justify-center">
      <div className="terminal-window pt-0 rounded-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto font-mono text-terminal-text">
        {/* Sticky Header */}
        <div className="sticky top-0 items-center bg-yellow-900 z-10">
          <div className="flex items-center justify-start gap-2 mb-4 pt-2 pb-2 border-b border-neon-green">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-neon-yellow"></div>
            <div className="w-3 h-3 rounded-full bg-neon-green"></div>
            <span className="ml-4 text-terminal-text text-sm">
              Terminal - Joseph's Haven
            </span>
          </div>
        </div>
        <div className="px-4 pt-4">
          {/* History */}
          {history.map((line, i) => {
            const safeLine = String(line || "");
            const colorClass = safeLine.startsWith("===")
              ? "text-neon-yellow"
              : safeLine.startsWith("[") || safeLine.startsWith(">")
                ? "text-neon-green"
                : "";
            return (
              <div key={i} className={colorClass}>
                {safeLine}
              </div>
            );
          })}

          {/* Input with blinking cursor */}
          <div className="flex items-center mt-2">
            <span className="text-neon-green">creekson@joseph$</span>
            <input
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-transparent outline-none ml-2 flex-1 text-terminal-text blinking-cursor"
            />
          </div>

          <div ref={bottomRef} />

          {/* Bottom navigation */}
          <div className="mt-8 pt-4 border-t border-neon-green text-sm">
            <Link
              to="/gui"
              className="text-neon-yellow hover:text-neon-green transition-colors"
            >
              Switch to GUI Mode
            </Link>
            <span className="mx-4 text-gray-500">|</span>
            <Link
              to="/"
              className="text-neon-yellow hover:text-neon-green transition-colors"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CmdMode;
