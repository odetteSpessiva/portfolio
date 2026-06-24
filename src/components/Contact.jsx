import { useRef, useState } from "react";
import useReveal from "../hooks/useReveal.js";
import "./Contact.css";

const LINKS = [
  { label: "GitHub", href: "https://github.com/ThisIsNotNam", icon: "gh" },
  { label: "Discord", href: "discord.com/users/1235584744964620360", icon: "cf" },
  { label: "Email", href: "mailto:nambun401@gmail.com", icon: "em" },
];

function IconGH() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function IconCF() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.5 7.5A1.5 1.5 0 0 1 6 6h2a1.5 1.5 0 0 1 1.5 1.5v9A1.5 1.5 0 0 1 8 18H6a1.5 1.5 0 0 1-1.5-1.5v-9zm6-3A1.5 1.5 0 0 1 12 3h2a1.5 1.5 0 0 1 1.5 1.5v12A1.5 1.5 0 0 1 14 18h-2a1.5 1.5 0 0 1-1.5-1.5v-12zm6 6A1.5 1.5 0 0 1 18 9h2a1.5 1.5 0 0 1 1.5 1.5v6A1.5 1.5 0 0 1 20 18h-2a1.5 1.5 0 0 1-1.5-1.5v-6z" />
    </svg>
  );
}

function IconEM() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

const ICON_MAP = { gh: IconGH, cf: IconCF, em: IconEM };

export default function Contact() {
  const ref = useRef();
  const visible = useReveal(ref);

  return (
    <section id="contact" className="contact section" ref={ref}>
      <div
        className={`section__inner contact__inner ${visible ? "revealed" : ""}`}
      >
        <div className="section__eyebrow">Contact</div>
        <h2 className="section__heading">Let's build something</h2>
        <p className="contact__sub">
          Whether it's a collaboration, a contest, or just an interesting
          problem I'm always up for a conversation.
        </p>

        <div className="contact__links">
          {LINKS.map(({ label, href, icon }) => {
            const Icon = ICON_MAP[icon];
            return (
              <a
                key={label}
                href={href}
                className="contact__link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon />
                <span>{label}</span>
                <svg
                  className="contact__arrow"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
