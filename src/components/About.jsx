import { useRef } from "react";
import useReveal from "../hooks/useReveal.js";
import "./About.css";

const HIGHLIGHTS = [
  { label: "Competitions", value: "VOAI", sub: "2026 Finals" },
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
              I compete in algorithmic contests (VOAI, Codeforces) and treat
              them the same way I treat every engineering problem: understand
              the constraints, find the elegant solution, then make it actually
              work in practice.
            </p>
            <p>
              When I'm not competing or shipping, I'm usually
              reverse-engineering something interesting a scraper that needs
              CAPTCHA solving, a judge system that needs WSL2/Docker networking
              fixed, or an audio tampering detector built on transformer
              attention.
            </p>
          </div>

          <div className="about__stats">
            {HIGHLIGHTS.map(({ label, value, sub }) => (
              <div className="about__stat" key={label}>
                <span className="about__stat-value">{value}</span>
                <span className="about__stat-sub">{sub}</span>
                <span className="about__stat-label">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
