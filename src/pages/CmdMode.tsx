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
      name: "AniFinder",
      description:
        "Search and explore anime with trailers and live streaming links.",
      demo: "https://anifinder.live",
      tech: "React, Jikan API, TypeScript",
    },
    {
      key: "b",
      name: "BudgetBuddy",
      description:
        "Smart budgeting app with goal tracking and gamified dashboard.",
      demo: "https://budgetbuddy.io",
      tech: "React, Node.js, MongoDB",
    },
    {
      key: "c",
      name: "DeadTime",
      description:
        "Gamified productivity app with streak system and XP rewards.",
      demo: "https://deadtime.dev",
      tech: "React, Firebase, PWA",
    },
  ];

  const introMessages = [
    "hi there...",
    "this is Joseph's Haven...",
    "> Joseph - Fullstack Developer",
    "Available commands: [1] View Projects | [2] Why Hire Me | [3] Let's Talk | [help] For commands guide",
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

    switch (cmd) {
      case "1":
        setSelectedSection("projects");
        output.push("=== Projects === ");
        projects.forEach((p) =>
          output.push(`[${p.key.toUpperCase()}] ${p.name} - ${p.description}`)
        );
        output.push("Type project letter to see details or 'b' to go back.");
        break;

      case "2":
        setSelectedSection("why");
        output.push("=== Why Hire Joseph ===");
        output.push(
          "I craft sleek, high-performance web apps with React + Tailwind."
        );
        output.push("Skills: HTML, JavaScript, React, Tailwind CSS");
        output.push("Tools: Git/GitHub, Figma, UI/UX");
        output.push("[B] Press B to return to menu");
        break;

      case "3":
        setSelectedSection("contact");
        output.push("=== Let's Talk ===");
        output.push("WhatsApp: https://wa.me/1234567890");
        output.push("LinkedIn: https://linkedin.com/in/joseph");
        output.push("Gmail: joseph@example.com");
        output.push("GitHub: https://github.com/joseph");
        output.push("[B] Press B to return to menu");
        break;

      case "b":
      case "back":
        setSelectedSection(null);
        output.push("Returned to main menu.....");
        break;

      case "help":
        output.push("=== Help ===");
        output.push("[1] View Projects");
        output.push("[2] Why Hire Me");
        output.push("[3] Let's Talk");
        output.push("[clear] Clear the screen");
        output.push("[b] Back to menu");
        break;

      default:
        // Project selection
        if (selectedSection === "projects") {
          const project = projects.find((p) => p.key === cmd);
          if (project) {
            output.push(`=== Project: ${project.name} ===`);
            output.push(`Description: ${project.description}`);
            output.push(`Tech Stack: ${project.tech}`);
            output.push(`Live Demo -> ${project.demo}`);
            output.push("GitHub -> Pinned on my profile");
            output.push("[B] Press B to return to projects");
          } else {
            output.push("Invalid project key. Type 'b' to go back.");
          }
        } else {
          output.push(`Command not recognized: ${raw}`);
          output.push("Type 'help' for available commands.");
        }
    }

    appendToHistory([`joseph@haven$ ${raw}`, ...output]);
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
      <div className="terminal-window rounded-lg p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto font-mono text-terminal-text">
        {/* Fake Mac buttons */}
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-neon-green">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-neon-yellow"></div>
          <div className="w-3 h-3 rounded-full bg-neon-green"></div>
          <span className="ml-4 text-terminal-text text-sm">
            Terminal - Joseph's Haven
          </span>
        </div>

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

        {/* Input */}
        <div className="flex items-center mt-2">
          <span className="text-neon-green">joseph@haven$</span>
          <input
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-transparent outline-none ml-2 flex-1 text-terminal-text"
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
  );
};

export default CmdMode;
