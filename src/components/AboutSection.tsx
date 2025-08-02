import { Code, Brackets, Paintbrush2, GitBranch } from "lucide-react";

const skills = [
  { name: "HTML", icon: Code },
  { name: "JavaScript", icon: Brackets },
  { name: "React", icon: Brackets },
  { name: "Tailwind CSS", icon: Paintbrush2 }
];

const tools = [
  { name: "Git/GitHub", icon: GitBranch },
  { name: "Figma", icon: Paintbrush2 }
];

const AboutSection = () => {
  return (
    <section id="about" className="py-20 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-gui font-bold text-center mb-8 text-neon-green">
          Why Hire Me
        </h2>
        
        {/* Description */}
        <p className="text-xl md:text-2xl text-center mb-16 text-foreground font-gui max-w-4xl mx-auto">
          I craft sleek, high-performance web apps with next-level UI using JavaScript, React, and Tailwind CSS.
        </p>

        {/* Skills and Tools */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Skills */}
          <div>
            <h3 className="text-2xl font-gui font-semibold text-neon-yellow mb-8 text-center">
              Skills
            </h3>
            <div className="grid grid-cols-2 gap-6">
              {skills.map((skill, index) => (
                <div
                  key={skill.name}
                  className="bg-card border border-neon-green/30 rounded-lg p-6 hover:border-neon-green transition-all duration-300 hover:scale-105 group"
                  style={{
                    animation: `fadeIn 0.6s ease-out ${index * 0.1 + 0.2}s both`
                  }}
                >
                  <div className="flex flex-col items-center text-center">
                    <skill.icon className="w-12 h-12 text-neon-green mb-4 group-hover:text-neon-green-glow transition-colors" />
                    <span className="text-foreground font-gui font-medium">{skill.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-2xl font-gui font-semibold text-neon-yellow mb-8 text-center">
              Tools
            </h3>
            <div className="grid grid-cols-1 gap-6 max-w-md mx-auto">
              {tools.map((tool, index) => (
                <div
                  key={tool.name}
                  className="bg-card border border-neon-green/30 rounded-lg p-6 hover:border-neon-green transition-all duration-300 hover:scale-105 group"
                  style={{
                    animation: `fadeIn 0.6s ease-out ${index * 0.1 + 0.6}s both`
                  }}
                >
                  <div className="flex flex-col items-center text-center">
                    <tool.icon className="w-12 h-12 text-neon-green mb-4 group-hover:text-neon-green-glow transition-colors" />
                    <span className="text-foreground font-gui font-medium">{tool.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;