import { useRef } from "react";
import useReveal from "../hooks/useReveal.js";
import "./About.css";

const HIGHLIGHTS = [
  { label: "Focus", value: "Systems", sub: "& Web Dev" },
  { label: "Languages", value: "C++", sub: "& Python, JS" },
  { label: "Stacks", value: "Django", sub: "React, Docker" },
  { label: "Location", value: "Ha Tinh", sub: "Vietnam" },
];

export default function About() {
  const ref = useRef();
  const visible = useReveal(ref);

  return (
    <section id="about" className="about section" ref={ref}>
      <div
        className={`section__inner about__inner ${visible ? "revealed" : ""}`}
      >
        <div className="section__eyebrow">About</div>
        <h2 className="section__heading">
          Code is the medium.
          <br />
          <span className="text-cyan">Curiosity is the method.</span>
        </h2>

        <div className="about__body">
          <div className="about__text">
            <p>
              I'm a student in Vietnam who builds things from first principles,
              whether that's implementing a full compiler pipeline for a custom
              DSL, wiring up a multi-agent AI pipeline in Docker, or designing a
              linear-motion mechanism for a VEX V5 robot in Onshape.
            </p>
            <p>
              I approach every engineering problem the same way: understand the
              constraints, find the elegant solution, then make it actually work
              in practice. I care about the <em>why</em> behind systems, not
              just the how.
            </p>
            <p>
              When I'm not shipping, I'm usually reverse-engineering something
              interesting, scraper that needs CAPTCHA solving, a judge system
              that needs WSL2/Docker networking fixed, or an audio tampering
              detector built on transformer attention.
            </p>
          </div>

          <div className="about__stats">
            {HIGHLIGHTS.map(({ label, value, sub }) => (
              <div className="about__stat" key={label}>
                <span className="about__stat-label">{label}</span>
                <span className="about__stat-value">{value}</span>
                <span className="about__stat-sub">{sub}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
