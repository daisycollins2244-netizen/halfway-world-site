import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import bookCover from "../assets/book-cover.png";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Halfway Around the World — A novel by A. Jain" },
      {
        name: "description",
        content:
          "Halfway Around the World by A. Jain — an intimate, cinematic novel of Silicon Valley ambition, modern love, cross-cultural desire, and the private decisions that shape who we become.",
      },
      { property: "og:title", content: "Halfway Around the World — A. Jain" },
      {
        property: "og:description",
        content:
          "An intimate, cinematic novel about ambition, identity, love, and the cost of the life you said you wanted.",
      },
    ],
  }),
});

/* CSS-driven scroll reveal — no JS state, never gets stuck invisible */
function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Mark as pending only after mount, then observe
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
    // Safety net
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
          ? "backdrop-blur-xl bg-[oklch(0.09_0.008_50/0.7)] border-b border-paper/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <a
          href="#home"
          className="font-display text-[11px] tracking-[0.4em] uppercase text-paper/90"
        >
          A. Jain
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
          A Novel · 2026
        </span>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden cover-gradient flex items-center justify-center"
    >
      {/* Atmospheric haze */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[120vw] h-[80vh] rounded-full blur-3xl animate-haze"
          style={{
            background:
              "radial-gradient(circle, oklch(0.78 0.18 55 / 0.45), transparent 60%)",
          }}
        />
        <div
          className="absolute top-[10%] right-[-10%] w-[60vw] h-[60vw] rounded-full blur-3xl animate-haze"
          style={{
            animationDelay: "5s",
            background:
              "radial-gradient(circle, oklch(0.6 0.22 35 / 0.35), transparent 70%)",
          }}
        />
        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,oklch(0.06_0.005_50/0.7)_95%)]" />
        <div className="grain" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl">
        <p
          className="text-[10px] md:text-xs tracking-[0.6em] uppercase text-paper/55 mb-10"
          style={{ animation: "fade-up 1.2s ease-out both" }}
        >
          — A Novel —
        </p>

        <h1 className="leading-[0.88]">
          <span
            className="block font-display font-semibold text-paper/95 text-[10vw] md:text-[5.5vw] lg:text-[5rem] tracking-[0.05em]"
            style={{ animation: "fade-up 1.2s ease-out 0.15s both" }}
          >
            HALFWAY AROUND
          </span>
          <span
            className="block mt-3 md:mt-5 text-[26vw] md:text-[16vw] lg:text-[14rem] leading-[0.85]"
            style={{ animation: "fade-up 1.4s ease-out 0.35s both" }}
          >
            <span
              className="font-serif-em italic font-medium text-ember mr-3 md:mr-6"
              style={{ color: "var(--ember)" }}
            >
              The
            </span>
            <span
              className="font-display font-bold"
              style={{
                color: "var(--cream)",
                textShadow:
                  "0 0 60px oklch(0.82 0.14 75 / 0.35), 0 4px 30px oklch(0.55 0.22 38 / 0.4)",
                letterSpacing: "0.02em",
              }}
            >
              WORLD
            </span>
          </span>
        </h1>

        <div
          className="mt-12 flex items-center justify-center gap-5"
          style={{ animation: "fade-up 1.2s ease-out 0.7s both" }}
        >
          <span className="h-px w-14 bg-paper/30" />
          <p className="font-display tracking-[0.55em] text-sm text-paper/85">A. JAIN</p>
          <span className="h-px w-14 bg-paper/30" />
        </div>

        <div
          className="mt-16"
          style={{ animation: "fade-up 1.2s ease-out 0.95s both" }}
        >
          <a
            href="#book"
            className="group relative inline-flex items-center gap-4 px-10 py-4 border border-paper/25 text-[10px] tracking-[0.45em] uppercase text-paper/90 overflow-hidden transition-all duration-500 hover:border-gold hover:text-gold"
          >
            <span
              className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-700"
              style={{
                background:
                  "linear-gradient(90deg, oklch(0.55 0.22 38 / 0.18), oklch(0.82 0.14 75 / 0.18))",
              }}
            />
            <span className="relative">Explore the Book</span>
            <span className="relative transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-[9px] tracking-[0.5em] uppercase text-paper/40">
        <span>Scroll</span>
        <span className="block h-10 w-px bg-paper/20 animate-drift" />
      </div>
    </section>
  );
}

function AboutBook() {
  return (
    <section id="book" className="relative bg-ink py-32 md:py-44 overflow-hidden">
      {/* sunset glow bleed from above */}
      <div className="absolute -top-40 inset-x-0 h-80 sunset-band opacity-60" />
      <div
        className="absolute -bottom-40 -left-40 w-[40rem] h-[40rem] rounded-full blur-3xl opacity-25"
        style={{
          background:
            "radial-gradient(circle, oklch(0.68 0.21 45 / 0.6), transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-12 gap-14 md:gap-20 items-center relative">
        <Reveal className="md:col-span-5">
          <div className="relative group">
            <div
              className="absolute -inset-10 blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-700"
              style={{
                background:
                  "radial-gradient(circle, oklch(0.68 0.21 45 / 0.5), transparent 70%)",
              }}
            />
            <img
              src={bookCover}
              alt="Halfway Around the World — book cover by A. Jain"
              className="relative w-full shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8)] transition-transform duration-700 group-hover:-translate-y-1"
            />
          </div>
        </Reveal>

        <div className="md:col-span-7">
          <Reveal>
            <p className="text-[10px] tracking-[0.55em] uppercase text-gold mb-8">
              ── About the Book
            </p>
            <h2 className="font-display text-4xl md:text-6xl leading-[1.02] mb-10 text-paper">
              Some journeys are not
              <br />
              measured
              <span className="font-serif-em italic text-ember font-medium"> in miles.</span>
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <div className="space-y-6 text-[15px] md:text-base leading-relaxed text-paper/70 max-w-2xl">
              <p className="text-paper/85">
                They're measured in the decisions you make when the world gets too loud to
                hear yourself.
              </p>
              <p>
                Andy is a Silicon Valley tech founder chasing the kind of future most
                people only talk about. In boardrooms, investor meetings, late-night
                product decisions, and the lonely silence after another win that doesn't
                feel like enough, he learns that ambition doesn't just build companies —
                it rewires people.
              </p>
              <p>
                Across cities and oceans, Andy is pulled between love, duty, desire, and
                the pressure to become someone larger than his own doubts. Cindy, a Hong
                Kong woman with her own hunger for truth and control, sees through the
                polished founder story he tells the world. Marinda offers a different
                kind of steadiness — built from discipline, intimacy, and rules neither
                of them fully understand.
              </p>
              <p className="font-serif-em italic text-cream/90 text-lg md:text-xl pt-2">
                What are you willing to sacrifice for the life you said you wanted?
              </p>
            </div>
          </Reveal>

          <Reveal delay={220}>
            <ul className="mt-14 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4 text-[10px] tracking-[0.35em] uppercase text-paper/50">
              {[
                "Ambition",
                "Identity",
                "Love",
                "Sacrifice",
                "Distance",
                "Modern Life",
              ].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="h-px w-5 bg-ember/70" />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
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
        className="absolute -top-40 right-0 w-[40rem] h-[40rem] rounded-full blur-3xl opacity-25 animate-haze"
        style={{
          background:
            "radial-gradient(circle, oklch(0.78 0.18 55 / 0.5), transparent 70%)",
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
                  "linear-gradient(160deg, oklch(0.2 0.02 50) 0%, oklch(0.1 0.008 50) 100%)",
              }}
            />
            <div
              className="absolute inset-0 opacity-70"
              style={{
                background:
                  "radial-gradient(circle at 70% 30%, oklch(0.78 0.18 55 / 0.45), transparent 60%)",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="font-display font-bold text-[12rem] md:text-[14rem] leading-none"
                style={{
                  color: "var(--gold)",
                  opacity: 0.25,
                  textShadow: "0 0 80px oklch(0.78 0.18 55 / 0.5)",
                }}
              >
                AJ
              </span>
            </div>
            <div className="absolute inset-0 border border-paper/10" />
            <div className="absolute bottom-5 left-5 text-[9px] tracking-[0.45em] uppercase text-paper/45">
              A. Jain — Portrait
            </div>
          </div>
        </Reveal>

        <div className="md:col-span-7">
          <Reveal>
            <p className="text-[10px] tracking-[0.55em] uppercase text-gold mb-8">
              ── About the Author
            </p>
            <h2 className="font-display text-4xl md:text-6xl leading-[1.05] mb-10">
              Writing the quiet
              <span className="block font-serif-em italic text-gold font-medium mt-2">
                between the noise.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <div className="space-y-6 text-[15px] leading-relaxed text-paper/70 max-w-2xl">
              <p>
                A. Jain writes contemporary fiction about ambition, intimacy, and the
                interior lives of the people building the modern world. Drawing on years
                spent between Silicon Valley boardrooms and the long flights that connect
                Asia, Europe, and the Bay, Jain's work lives at the intersection of
                technology and tenderness.
              </p>
              <p>
                <span className="font-serif-em italic text-cream">
                  Halfway Around the World
                </span>{" "}
                is a debut novel of restless founders, complicated love, and the private
                cost of public success — a story for anyone who has ever wondered whether
                the life they're chasing is still the one they wanted.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const reviews = [
  {
    quote:
      "A cinematic, emotionally exact portrait of modern ambition. Jain writes the silence between decisions better than anyone I've read this year.",
    name: "Literary Review Quarterly",
    role: "Editorial",
    stars: 5,
  },
  {
    quote:
      "Spare, luminous, and quietly devastating. It reads like an A24 film translated into prose — every page earns its restraint.",
    name: "The Margin Press",
    role: "Featured Review",
    stars: 5,
  },
  {
    quote:
      "I finished it on a red-eye and sat in the dark long after we landed. A novel about the cost of building something — and of building yourself.",
    name: "Priya M.",
    role: "Reader",
    stars: 5,
  },
  {
    quote:
      "Captures the texture of a life lived across time zones with rare precision. Tender, controlled, and entirely contemporary.",
    name: "Daniel R.",
    role: "Reader",
    stars: 4,
  },
];

function Reviews() {
  return (
    <section id="reviews" className="relative bg-ink py-32 md:py-44 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ember/40 to-transparent" />
      <div className="max-w-7xl mx-auto px-6 md:px-10 relative">
        <Reveal>
          <div className="text-center mb-20">
            <p className="text-[10px] tracking-[0.55em] uppercase text-gold mb-5">
              ── Praise
            </p>
            <h2 className="font-display text-4xl md:text-6xl leading-tight text-paper">
              What readers
              <span className="font-serif-em italic text-ember font-medium"> are saying</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {reviews.map((r, i) => (
            <Reveal key={r.name} delay={i * 90}>
              <article className="group relative h-full p-10 md:p-12 border border-paper/10 bg-[oklch(0.13_0.012_50/0.6)] backdrop-blur-sm transition-all duration-500 hover:border-ember/40 hover:-translate-y-1">
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    boxShadow:
                      "inset 0 0 80px oklch(0.68 0.21 45 / 0.08), 0 30px 80px -30px oklch(0.68 0.21 45 / 0.4)",
                  }}
                />
                <div className="flex items-center gap-1 mb-7">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <span
                      key={idx}
                      className={`text-xs ${
                        idx < r.stars ? "text-ember" : "text-paper/15"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className="font-serif-em text-xl md:text-2xl leading-snug text-paper/90 mb-8">
                  "{r.quote}"
                </p>
                <div className="flex items-center gap-3 text-[10px] tracking-[0.35em] uppercase text-paper/50">
                  <span className="h-px w-6 bg-ember/70" />
                  <span className="text-paper/80">{r.name}</span>
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
      className="relative cover-gradient text-paper py-32 md:py-44 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,oklch(0.06_0.005_50/0.8)_95%)]" />
      <div className="grain" />
      <div className="relative max-w-3xl mx-auto px-6 md:px-10">
        <Reveal>
          <div className="text-center mb-16">
            <p className="text-[10px] tracking-[0.55em] uppercase text-gold mb-5">
              ── Contact
            </p>
            <h2 className="font-display text-4xl md:text-6xl leading-tight text-paper">
              Write to
              <span className="font-serif-em italic text-ember font-medium"> the author</span>
            </h2>
            <p className="mt-6 text-paper/55 text-sm md:text-base max-w-lg mx-auto">
              For press, interviews, foreign rights, or a quiet note from a reader —
              your message reaches A. Jain directly.
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
                  className="block text-[10px] tracking-[0.45em] uppercase text-paper/50 mb-3"
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
                className="block text-[10px] tracking-[0.45em] uppercase text-paper/50 mb-3"
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
                className="group relative inline-flex items-center gap-4 px-12 py-4 border border-paper/30 text-[10px] tracking-[0.45em] uppercase text-paper/90 overflow-hidden transition-all duration-500 hover:border-gold hover:text-gold"
              >
                <span
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-700"
                  style={{
                    background:
                      "linear-gradient(90deg, oklch(0.55 0.22 38 / 0.18), oklch(0.82 0.14 75 / 0.18))",
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
    <footer className="bg-ink text-paper/55 py-14 text-center border-t border-paper/5">
      <div className="max-w-7xl mx-auto px-6">
        <p className="font-display tracking-[0.45em] text-xs uppercase text-paper/85">
          Halfway Around <span className="font-serif-em italic text-ember normal-case px-1">the</span> World
        </p>
        <p className="mt-3 text-[10px] tracking-[0.4em] uppercase text-paper/40">
          A Novel by A. Jain
        </p>
        <p className="mt-6 text-[10px] text-paper/30">
          © {new Date().getFullYear()} A. Jain. All rights reserved.
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