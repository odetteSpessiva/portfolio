import { useRef } from "react";
import useReveal from "../hooks/useReveal.js";
import "./Projects.css";

const PROJECTS = [
  {
    title: "CPGen",
    tag: "Compiler",
    tagColor: "#00F5D4",
    desc: "A Python-based compiler for a custom test-case generation DSL (.cpg files). Full Lexer → Parser → AST → Codegen pipeline with semantic error reporting and a VS Code syntax highlighter extension.",
    tech: ["Python", "AST", "DSL", "VS Code API"],
    links: [],
  },
  {
    title: "Polygon Automation Toolchain",
    tag: "DevOps",
    tagColor: "#7B8CDE",
    desc: "Python toolchain for automated Codeforces Polygon problem management statement upload, checker upload, test generation, and bulk access management via Selenium with an undetected Chrome profile.",
    tech: ["Python", "Selenium", "Codeforces API", "JSON"],
    links: [],
  },
  {
    title: "VOAI Audio Tampering Detector",
    tag: "AI / ML",
    tagColor: "#E040FB",
    desc: "Audio tampering detection system built for the VOAI 2026 finals. Identifies spliced audio segments and outputs precise start/end timestamps using transformer-based attention over spectrogram features.",
    tech: ["PyTorch", "Audio DSP", "Transformers", "MIST Dataset"],
    links: [],
  },
  {
    title: "DMOJ Judge & Portal",
    tag: "Full-stack",
    tagColor: "#F7A072",
    desc: "Self-hosted DMOJ competitive programming judge with WSL2/Docker networking, SSHFS over Tailscale, and custom UI enhancements including drag-and-drop contest reordering via SortableJS/Jinja2.",
    tech: ["Django", "Docker", "WSL2", "Tailscale", "SortableJS"],
    links: [],
  },
  {
    title: "Multi-Agent AI Pipeline",
    tag: "AI Infra",
    tagColor: "#00C9FF",
    desc: "n8n-based multi-agent pipeline deployed in Docker. Integrates Gemini API for Vietnamese PDF extraction and document understanding, with automated routing between specialized agents.",
    tech: ["n8n", "Docker", "Gemini API", "Python"],
    links: [],
  },
  {
    title: "VEX V5 Linear Motion Mechanism",
    tag: "Robotics",
    tagColor: "#A8FF78",
    desc: "Precision linear motion mechanism for VEX V5 robotics competition, fully designed in Onshape. Focused on constraint-based CAD and real-world load tolerance.",
    tech: ["Onshape", "CAD", "VEX V5", "Mechanical Design"],
    links: [],
  },
];

export default function Projects() {
  const ref = useRef();
  const visible = useReveal(ref);

  return (
    <section id="projects" className="projects section" ref={ref}>
      <div className={`section__inner ${visible ? "revealed" : ""}`}>
        <div className="section__eyebrow">Projects</div>
        <h2 className="section__heading">Things I've built</h2>
        <div className="projects__grid">
          {PROJECTS.map((proj, i) => (
            <ProjectCard
              key={proj.title}
              proj={proj}
              delay={i * 0.07}
              visible={visible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ proj, delay, visible }) {
  return (
    <div
      className="proj-card"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
      }}
    >
      <div className="proj-card__header">
        <span
          className="proj-card__tag"
          style={{
            color: proj.tagColor,
            borderColor: proj.tagColor + "44",
            background: proj.tagColor + "11",
          }}
        >
          {proj.tag}
        </span>
        <h3 className="proj-card__title">{proj.title}</h3>
      </div>
      <p className="proj-card__desc">{proj.desc}</p>
      <div className="proj-card__tech">
        {proj.tech.map((t) => (
          <span key={t} className="proj-card__pill">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
