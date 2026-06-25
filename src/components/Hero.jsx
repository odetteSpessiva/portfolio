import { useState, useEffect } from "react";
import "./Hero.css";

const ROLES = [
  "full-stack developer",
  "robotics engineer",
  "deep learning tinkerer",
  "open-source builder",
  "systems engineer",
];

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState("typing"); // typing | pause | erasing

  useEffect(() => {
    const target = ROLES[roleIdx];
    let timeout;

    if (phase === "typing") {
      if (displayed.length < target.length) {
        timeout = setTimeout(
          () => setDisplayed(target.slice(0, displayed.length + 1)),
          60,
        );
      } else {
        timeout = setTimeout(() => setPhase("pause"), 1800);
      }
    } else if (phase === "pause") {
      timeout = setTimeout(() => setPhase("erasing"), 600);
    } else if (phase === "erasing") {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed((d) => d.slice(0, -1)), 30);
      } else {
        setRoleIdx((i) => (i + 1) % ROLES.length);
        setPhase("typing");
      }
    }

    return () => clearTimeout(timeout);
  }, [displayed, phase, roleIdx]);

  const scrollDown = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="hero">
      <div className="hero__grid-bg" aria-hidden="true" />
      <div className="hero__inner">
        <div className="hero__tag">
          <span className="hero__tag-dot" />
          based in Ha Tinh, Vietnam
        </div>

        <h1 className="hero__name">
          Hi, I'm <span className="hero__name-highlight">Hoang Nam</span>
        </h1>

        <p className="hero__role">
          <span className="hero__role-prefix">I'm a </span>
          <span className="hero__role-typed">{displayed}</span>
          <span className="hero__cursor" aria-hidden="true">
            _
          </span>
        </p>

        <p className="hero__bio">
          Building things from scratch: web systems, robotics, AI pipelines, and
          everything in between. Fuelled by curiosity about <em>why</em> things
          work the way they do.
        </p>

        <div className="hero__actions">
          <button className="btn btn--primary" onClick={scrollDown}>
            See my work
          </button>
          <a
            className="btn btn--ghost"
            href="https://github.com/ThisIsNotNam"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            className="btn btn--ghost"
            href="https://discord.com/users/1235584744964620360"
            target="_blank"
            rel="noopener noreferrer"
          >
            Discord
          </a>
        </div>
      </div>

      <button
        className="hero__scroll-hint"
        onClick={scrollDown}
        aria-label="Scroll down"
      >
        <span className="hero__scroll-arrow" />
      </button>
    </section>
  );
}
