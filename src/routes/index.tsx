import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import bookCover from "../assets/unchained-cover.png";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "UNCHAINED — Live the Life You Were Meant to Lead | Darius McDonald, Sr." },
      {
        name: "description",
        content:
          "UNCHAINED by Darius McDonald, Sr. — a transformational guide to purpose, discipline, courage, and the life you were destined to lead.",
      },
      { property: "og:title", content: "UNCHAINED — Darius McDonald, Sr." },
      {
        property: "og:description",
        content:
          "Break free from fear. Walk in confidence. Live as though you cannot fail.",
      },
    ],
  }),
});

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.dataset.pending = "true";
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            delete el.dataset.pending;
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    const t = window.setTimeout(() => {
      delete el.dataset.pending;
    }, 1500);
    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, []);
  return ref;
}

function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section";
}) {
  const ref = useInView<HTMLDivElement>();
  return (
    <Tag
      ref={ref as never}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    ["The Book", "#book"],
    ["Author", "#author"],
    ["Reviews", "#reviews"],
    ["Contact", "#contact"],
  ];
  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-[oklch(0.07_0.008_60/0.75)] border-b border-paper/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <a
          href="#home"
          className="font-display text-[11px] tracking-[0.4em] uppercase text-gold"
        >
          Darius McDonald, Sr.
        </a>
        <ul className="hidden md:flex items-center gap-10 text-[10px] tracking-[0.35em] uppercase text-paper/60">
          {links.map(([label, href]) => (
            <li key={href}>
              <a href={href} className="hover:text-gold transition-colors duration-300">
                {label}
              </a>
            </li>
          ))}
        </ul>
        <span className="hidden md:block text-[10px] tracking-[0.4em] uppercase text-paper/40">
          Unchained · 2026
        </span>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center"
      style={{
        background:
          "radial-gradient(ellipse 90% 65% at 50% 95%, oklch(0.82 0.16 75 / 0.55), transparent 60%)," +
          "radial-gradient(ellipse 60% 45% at 70% 80%, oklch(0.6 0.22 45 / 0.45), transparent 65%)," +
          "linear-gradient(180deg, oklch(0.06 0.005 60) 0%, oklch(0.09 0.01 55) 45%, oklch(0.18 0.05 60) 100%)",
      }}
    >
      {/* Sunrise disc */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-[10%] w-[70vw] h-[70vw] md:w-[45vw] md:h-[45vw] max-w-[760px] max-h-[760px] rounded-full"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, oklch(0.96 0.12 85 / 0.95) 0%, oklch(0.88 0.16 75 / 0.85) 25%, oklch(0.7 0.2 55 / 0.6) 50%, transparent 72%)",
            filter: "blur(2px)",
            boxShadow:
              "0 0 220px 70px oklch(0.85 0.18 70 / 0.5), 0 0 480px 140px oklch(0.6 0.22 45 / 0.35)",
          }}
        />
        {/* Horizon line */}
        <div
          className="absolute inset-x-0 bottom-[12%] h-[2px]"
          style={{
            background:
              "linear-gradient(90deg, transparent, oklch(0.92 0.14 80 / 0.7), oklch(0.98 0.08 90 / 0.9), oklch(0.92 0.14 80 / 0.7), transparent)",
            boxShadow: "0 0 40px oklch(0.88 0.16 75 / 0.8)",
          }}
        />
        {/* Drifting haze */}
        <div
          className="absolute bottom-[-15%] left-1/2 -translate-x-1/2 w-[140vw] h-[70vh] rounded-full blur-3xl animate-haze"
          style={{
            background:
              "radial-gradient(circle, oklch(0.78 0.18 60 / 0.4), transparent 60%)",
          }}
        />
        <div
          className="absolute top-[6%] right-[-10%] w-[55vw] h-[55vw] rounded-full blur-3xl animate-haze"
          style={{
            animationDelay: "5s",
            background:
              "radial-gradient(circle, oklch(0.6 0.22 40 / 0.32), transparent 70%)",
          }}
        />
        {/* Distant mountain silhouette */}
        <svg
          className="absolute inset-x-0 bottom-0 w-full h-[28vh] md:h-[34vh]"
          viewBox="0 0 1440 280"
          preserveAspectRatio="none"
          aria-hidden
        >
          <defs>
            <linearGradient id="ground-fade" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.08 0.01 55)" stopOpacity="0" />
              <stop offset="55%" stopColor="oklch(0.06 0.008 55)" stopOpacity="0.85" />
              <stop offset="100%" stopColor="oklch(0.04 0.005 55)" stopOpacity="1" />
            </linearGradient>
          </defs>
          <path
            d="M0,280 L0,180 C160,140 280,200 420,160 C560,120 700,180 860,140 C1020,100 1160,170 1300,150 C1380,138 1440,160 1440,160 L1440,280 Z"
            fill="oklch(0.05 0.008 55)"
          />
          <rect width="1440" height="280" fill="url(#ground-fade)" />
        </svg>

        {/* Vignette + grain */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,oklch(0.04_0.005_55/0.8)_95%)]" />
        <div className="grain" />
      </div>

      {/* Floating cover thumbnail */}
      <div
        className="hidden md:block absolute right-8 lg:right-16 bottom-28 z-10"
        style={{ animation: "fade-up 1.6s ease-out 1.1s both, drift 8s ease-in-out infinite" }}
      >
        <div className="relative group">
          <div
            className="absolute -inset-8 blur-3xl opacity-70"
            style={{
              background:
                "radial-gradient(circle, oklch(0.82 0.18 70 / 0.6), transparent 70%)",
            }}
          />
          <img
            src={bookCover}
            alt="Unchained — cover"
            className="relative w-32 lg:w-44 rotate-[-3deg] shadow-[0_40px_100px_-10px_rgba(0,0,0,0.9)] ring-1 ring-gold/20"
          />
        </div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl">
        <p
          className="text-[10px] md:text-xs tracking-[0.6em] uppercase text-gold/80 mb-10"
          style={{ animation: "fade-up 1.2s ease-out both" }}
        >
          — A Bold Awakening —
        </p>

        <h1 className="leading-[0.88]">
          <span
            className="block font-display font-bold tracking-[0.04em] text-[15vw] md:text-[12vw] lg:text-[10rem]"
            style={{
              animation: "fade-up 1.2s ease-out 0.15s both",
              background:
                "linear-gradient(180deg, oklch(0.95 0.12 88) 0%, oklch(0.82 0.18 70) 55%, oklch(0.6 0.22 45) 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              filter: "drop-shadow(0 0 60px oklch(0.78 0.2 60 / 0.45))",
            }}
          >
            UNCHAINED
          </span>
          <span
            className="block mt-6 md:mt-8 font-display font-medium tracking-[0.18em] text-paper/95 text-[5vw] md:text-[2.5vw] lg:text-3xl"
            style={{ animation: "fade-up 1.4s ease-out 0.35s both" }}
          >
            LIVE THE LIFE YOU WERE
            <span className="font-serif-em italic font-medium text-gold normal-case tracking-normal px-2">
              meant
            </span>
            TO LEAD
          </span>
        </h1>

        <div
          className="mt-12 flex items-center justify-center gap-5"
          style={{ animation: "fade-up 1.2s ease-out 0.7s both" }}
        >
          <span className="h-px w-14 bg-gold/40" />
          <p className="font-display tracking-[0.55em] text-sm text-paper/90">
            DARIUS McDONALD, SR.
          </p>
          <span className="h-px w-14 bg-gold/40" />
        </div>

        <div
          className="mt-16"
          style={{ animation: "fade-up 1.2s ease-out 0.95s both" }}
        >
          <a
            href="#book"
            className="group relative inline-flex items-center gap-4 px-10 py-4 border border-gold/40 text-[10px] tracking-[0.45em] uppercase text-gold overflow-hidden transition-all duration-500 hover:border-gold hover:text-ink"
          >
            <span
              className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-700"
              style={{
                background:
                  "linear-gradient(90deg, oklch(0.82 0.18 70), oklch(0.95 0.14 88))",
              }}
            />
            <span className="relative">Discover the Book</span>
            <span className="relative transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-[9px] tracking-[0.5em] uppercase text-paper/40">
        <span>Scroll</span>
        <span className="block h-10 w-px bg-gold/30 animate-drift" />
      </div>
    </section>
  );
}

function PullQuote({ text }: { text: string }) {
  return (
    <Reveal>
      <blockquote className="relative my-16 md:my-20 text-center">
        <span
          className="font-serif-em italic text-2xl md:text-4xl lg:text-5xl leading-snug"
          style={{
            background:
              "linear-gradient(180deg, oklch(0.96 0.1 88), oklch(0.78 0.18 65))",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          “{text}”
        </span>
      </blockquote>
    </Reveal>
  );
}

function AboutBook() {
  const themes = [
    "Purpose",
    "Discipline",
    "Confidence",
    "Gratitude",
    "Courage",
    "Personal Growth",
    "Intentional Living",
    "Freedom from Fear",
    "Impact",
  ];
  return (
    <section id="book" className="relative bg-ink py-32 md:py-44 overflow-hidden">
      <div className="absolute -top-40 inset-x-0 h-80 sunset-band opacity-60" />
      <div
        className="absolute -bottom-40 -right-40 w-[40rem] h-[40rem] rounded-full blur-3xl opacity-25"
        style={{
          background:
            "radial-gradient(circle, oklch(0.78 0.2 65 / 0.6), transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-12 gap-14 md:gap-20 items-center relative">
        <Reveal className="md:col-span-5">
          <div className="relative group">
            <div
              className="absolute -inset-10 blur-3xl opacity-60 group-hover:opacity-90 transition-opacity duration-700"
              style={{
                background:
                  "radial-gradient(circle, oklch(0.82 0.18 70 / 0.55), transparent 70%)",
              }}
            />
            <img
              src={bookCover}
              alt="Unchained — book cover by Darius McDonald, Sr."
              className="relative w-full shadow-[0_40px_120px_-20px_rgba(0,0,0,0.85)] ring-1 ring-gold/15 transition-transform duration-700 group-hover:-translate-y-1"
            />
          </div>
        </Reveal>

        <div className="md:col-span-7">
          <Reveal>
            <p className="text-[10px] tracking-[0.55em] uppercase text-gold mb-8">
              ── About the Book
            </p>
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl leading-[1.05] mb-10 text-paper">
              Break the chains.
              <span className="block font-serif-em italic text-gold font-medium mt-2">
                Walk into the light.
              </span>
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <div className="space-y-6 text-[15px] md:text-base leading-relaxed text-paper/75 max-w-2xl">
              <p className="text-paper/90">
                <span className="font-serif-em italic text-cream">Unchained</span> is a
                transformational guide for anyone ready to stop holding back and start
                living boldly — on purpose, with confidence, and without apology.
              </p>
              <p>
                Darius McDonald, Sr. delivers a powerful wake-up call: you are not
                promised forever, so make today count. This isn't another motivational
                book — it's a declaration of purpose, a blueprint for intentional living,
                and a call to lead with courage, discipline, love, and impact.
              </p>
              <p>
                Inside, you'll discover how to cultivate peace in the middle of chaos,
                embrace joy without apology, practice gratitude as a daily discipline,
                give and love more than you thought possible, and leave nothing on the
                table.
              </p>
            </div>
          </Reveal>

          <Reveal delay={220}>
            <ul className="mt-14 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4 text-[10px] tracking-[0.35em] uppercase text-paper/55">
              {themes.map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="h-px w-5 bg-gold/70" />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>

          <PullQuote text="Live as though you cannot fail." />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6">
        <PullQuote text="You were destined to win." />
      </div>
    </section>
  );
}

function AboutAuthor() {
  return (
    <section
      id="author"
      className="relative bg-ink-2 text-paper py-32 md:py-44 overflow-hidden"
    >
      <div
        className="absolute -top-40 left-0 w-[40rem] h-[40rem] rounded-full blur-3xl opacity-25 animate-haze"
        style={{
          background:
            "radial-gradient(circle, oklch(0.82 0.18 70 / 0.5), transparent 70%)",
        }}
      />
      <div className="grain" />
      <div className="max-w-6xl mx-auto px-6 md:px-10 grid md:grid-cols-12 gap-14 md:gap-20 items-center relative">
        <Reveal className="md:col-span-5">
          <div className="relative aspect-[4/5] w-full max-w-md mx-auto overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(160deg, oklch(0.2 0.02 60) 0%, oklch(0.08 0.008 55) 100%)",
              }}
            />
            <div
              className="absolute inset-0 opacity-80"
              style={{
                background:
                  "radial-gradient(circle at 70% 25%, oklch(0.85 0.18 70 / 0.55), transparent 60%)",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="font-display font-bold text-[12rem] md:text-[14rem] leading-none"
                style={{
                  color: "var(--gold)",
                  opacity: 0.3,
                  textShadow: "0 0 80px oklch(0.82 0.18 70 / 0.6)",
                }}
              >
                DM
              </span>
            </div>
            <div className="absolute inset-0 border border-gold/15" />
            <div className="absolute bottom-5 left-5 text-[9px] tracking-[0.45em] uppercase text-paper/50">
              Darius McDonald, Sr. — Portrait
            </div>
          </div>
        </Reveal>

        <div className="md:col-span-7">
          <Reveal>
            <p className="text-[10px] tracking-[0.55em] uppercase text-gold mb-8">
              ── About the Author
            </p>
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl leading-[1.05] mb-10">
              Leading others
              <span className="block font-serif-em italic text-gold font-medium mt-2">
                into their light.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <div className="space-y-6 text-[15px] leading-relaxed text-paper/75 max-w-2xl">
              <p>
                Darius McDonald, Sr. is a leader, speaker, and author devoted to helping
                people break free from the limitations that keep them small. Through
                discipline, faith, and an unshakeable belief in human potential, his
                work has guided readers and audiences toward purpose, courage, and
                impact.
              </p>
              <p>
                <span className="font-serif-em italic text-cream">Unchained</span> is
                his call to a generation ready to stop surviving and start leading —
                with love, conviction, and the kind of boldness that changes lives.
              </p>
            </div>
          </Reveal>
          <PullQuote text="Lead with love. Walk in confidence." />
        </div>
      </div>
    </section>
  );
}

const reviews = [
  {
    quote:
      "A powerful, soul-stirring read. Darius doesn't just inspire — he equips you to live with purpose, every single day.",
    name: "Pastor M. Reynolds",
    role: "Faith Leader",
    stars: 5,
  },
  {
    quote:
      "This book broke chains I didn't even know I was wearing. A modern blueprint for courage and intentional living.",
    name: "Tasha B.",
    role: "Reader",
    stars: 5,
  },
  {
    quote:
      "Equal parts wake-up call and warm embrace. Required reading for anyone serious about leading the life they were meant for.",
    name: "Leadership Today",
    role: "Editorial",
    stars: 5,
  },
  {
    quote:
      "Bold, disciplined, and full of heart. Darius writes with the conviction of someone who has lived every word.",
    name: "Marcus J.",
    role: "Reader",
    stars: 5,
  },
];

function Reviews() {
  return (
    <section id="reviews" className="relative bg-ink py-32 md:py-44 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      <div className="max-w-7xl mx-auto px-6 md:px-10 relative">
        <Reveal>
          <div className="text-center mb-20">
            <p className="text-[10px] tracking-[0.55em] uppercase text-gold mb-5">
              ── Praise
            </p>
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl leading-tight text-paper">
              What readers
              <span className="font-serif-em italic text-gold font-medium"> are saying</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {reviews.map((r, i) => (
            <Reveal key={r.name} delay={i * 90}>
              <article className="group relative h-full p-10 md:p-12 border border-gold/15 bg-[oklch(0.11_0.012_55/0.7)] backdrop-blur-sm transition-all duration-500 hover:border-gold/50 hover:-translate-y-1">
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    boxShadow:
                      "inset 0 0 80px oklch(0.82 0.18 70 / 0.1), 0 30px 80px -30px oklch(0.82 0.18 70 / 0.45)",
                  }}
                />
                <div className="flex items-center gap-1 mb-7">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <span
                      key={idx}
                      className={`text-xs ${
                        idx < r.stars ? "text-gold" : "text-paper/15"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className="font-serif-em text-xl md:text-2xl leading-snug text-paper/90 mb-8">
                  "{r.quote}"
                </p>
                <div className="flex items-center gap-3 text-[10px] tracking-[0.35em] uppercase text-paper/55">
                  <span className="h-px w-6 bg-gold/70" />
                  <span className="text-paper/85">{r.name}</span>
                  <span>·</span>
                  <span>{r.role}</span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    window.setTimeout(() => setSent(false), 4000);
    (e.currentTarget as HTMLFormElement).reset();
  };

  return (
    <section
      id="contact"
      className="relative text-paper py-32 md:py-44 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 90% 65% at 50% 100%, oklch(0.78 0.18 65 / 0.45), transparent 60%)," +
          "linear-gradient(180deg, oklch(0.07 0.008 55) 0%, oklch(0.12 0.02 55) 100%)",
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,oklch(0.05_0.005_55/0.8)_95%)]" />
      <div className="grain" />
      <div className="relative max-w-3xl mx-auto px-6 md:px-10">
        <Reveal>
          <div className="text-center mb-16">
            <p className="text-[10px] tracking-[0.55em] uppercase text-gold mb-5">
              ── Contact
            </p>
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl leading-tight text-paper">
              Write to
              <span className="font-serif-em italic text-gold font-medium"> the author</span>
            </h2>
            <p className="mt-6 text-paper/60 text-sm md:text-base max-w-lg mx-auto">
              For speaking, interviews, partnerships, or a word of encouragement —
              your message reaches Darius directly.
            </p>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <form onSubmit={onSubmit} className="space-y-10">
            {[
              { id: "name", label: "Name", type: "text" },
              { id: "email", label: "Email", type: "email" },
            ].map((f) => (
              <div key={f.id} className="relative">
                <label
                  htmlFor={f.id}
                  className="block text-[10px] tracking-[0.45em] uppercase text-paper/55 mb-3"
                >
                  {f.label}
                </label>
                <input
                  id={f.id}
                  name={f.id}
                  type={f.type}
                  required
                  className="w-full bg-transparent border-0 border-b border-paper/20 py-3 text-paper placeholder-paper/30 focus:outline-none focus:border-gold transition-colors"
                />
              </div>
            ))}
            <div>
              <label
                htmlFor="message"
                className="block text-[10px] tracking-[0.45em] uppercase text-paper/55 mb-3"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="w-full bg-transparent border-0 border-b border-paper/20 py-3 text-paper placeholder-paper/30 focus:outline-none focus:border-gold transition-colors resize-none"
              />
            </div>
            <div className="pt-6 text-center">
              <button
                type="submit"
                className="group relative inline-flex items-center gap-4 px-12 py-4 border border-gold/40 text-[10px] tracking-[0.45em] uppercase text-gold overflow-hidden transition-all duration-500 hover:border-gold hover:text-ink"
              >
                <span
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-700"
                  style={{
                    background:
                      "linear-gradient(90deg, oklch(0.82 0.18 70), oklch(0.95 0.14 88))",
                  }}
                />
                <span className="relative">{sent ? "Message Sent" : "Send Message"}</span>
                <span className="relative">→</span>
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-ink text-paper/55 py-14 text-center border-t border-gold/10">
      <div className="max-w-7xl mx-auto px-6">
        <p className="font-display tracking-[0.45em] text-xs uppercase text-gold">
          UNCHAINED
        </p>
        <p className="mt-3 text-[10px] tracking-[0.4em] uppercase text-paper/50">
          Live the Life You Were Meant to Lead · Darius McDonald, Sr.
        </p>
        <p className="mt-6 text-[10px] text-paper/30">
          © {new Date().getFullYear()} Darius McDonald, Sr. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <main className="bg-ink text-paper antialiased">
      <Nav />
      <Hero />
      <AboutBook />
      <AboutAuthor />
      <Reviews />
      <Contact />
      <Footer />
    </main>
  );
}
