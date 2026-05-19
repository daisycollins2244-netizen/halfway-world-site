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

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setShown(true), io.disconnect()),
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, shown };
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 1s ease ${delay}ms, transform 1s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
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
    ["Home", "#home"],
    ["The Book", "#book"],
    ["Author", "#author"],
    ["Reviews", "#reviews"],
    ["Contact", "#contact"],
  ];
  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "backdrop-blur-md bg-paper/70 border-b border-black/5" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <a href="#home" className="font-display text-sm tracking-[0.3em] uppercase">
          A. Jain
        </a>
        <ul className="hidden md:flex items-center gap-10 text-xs tracking-[0.25em] uppercase text-foreground/70">
          {links.map(([label, href]) => (
            <li key={href}>
              <a
                href={href}
                className="hover:text-ember transition-colors duration-300"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#book"
          className="hidden md:inline-block text-xs tracking-[0.25em] uppercase border-b border-foreground/40 pb-0.5 hover:border-ember hover:text-ember transition-colors"
        >
          Read
        </a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden cinematic-gradient flex items-center justify-center"
    >
      {/* Atmospheric haze layers */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-32 left-1/4 w-[60vw] h-[60vw] rounded-full blur-3xl animate-haze"
          style={{
            background:
              "radial-gradient(circle, oklch(0.82 0.18 55 / 0.35), transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-[55vw] h-[55vw] rounded-full blur-3xl animate-haze"
          style={{
            animationDelay: "4s",
            background:
              "radial-gradient(circle, oklch(0.6 0.22 35 / 0.3), transparent 70%)",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,transparent_40%,rgba(0,0,0,0.25))]" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl">
        <p className="animate-fade-up text-[11px] md:text-xs tracking-[0.5em] uppercase text-foreground/60 mb-8">
          A Novel
        </p>
        <h1
          className="font-display font-bold leading-[0.95] text-foreground"
          style={{ animation: "fade-up 1.2s ease-out 0.1s both" }}
        >
          <span className="block text-4xl md:text-6xl lg:text-7xl tracking-wider">
            HALFWAY AROUND
          </span>
          <span className="block text-[20vw] md:text-[14vw] lg:text-[12rem] leading-none mt-2 md:mt-4">
            <span className="text-ember italic-0 mr-3 md:mr-6 font-serif-em italic font-medium">
              The
            </span>
            <span
              className="text-gold"
              style={{
                textShadow: "0 4px 40px oklch(0.78 0.16 60 / 0.4)",
              }}
            >
              WORLD
            </span>
          </span>
        </h1>
        <div
          className="mt-10 flex items-center justify-center gap-4"
          style={{ animation: "fade-up 1.2s ease-out 0.4s both" }}
        >
          <span className="h-px w-12 bg-foreground/30" />
          <p className="font-display tracking-[0.5em] text-sm md:text-base">A. JAIN</p>
          <span className="h-px w-12 bg-foreground/30" />
        </div>
        <div
          className="mt-14"
          style={{ animation: "fade-up 1.2s ease-out 0.7s both" }}
        >
          <a
            href="#book"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-ink text-paper text-xs tracking-[0.35em] uppercase overflow-hidden transition-transform duration-500 hover:scale-[1.02]"
          >
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background:
                  "linear-gradient(90deg, oklch(0.66 0.21 40), oklch(0.78 0.16 60))",
              }}
            />
            <span className="relative">Explore the Book</span>
            <span className="relative">→</span>
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.4em] uppercase text-foreground/50 animate-drift">
        Scroll
      </div>
    </section>
  );
}

function AboutBook() {
  return (
    <section id="book" className="relative bg-paper py-32 md:py-44 overflow-hidden">
      <div
        className="absolute -top-40 -right-40 w-[40rem] h-[40rem] rounded-full blur-3xl opacity-40"
        style={{
          background: "radial-gradient(circle, oklch(0.78 0.16 60 / 0.5), transparent 70%)",
        }}
      />
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-12 gap-16 items-center relative">
        <Reveal className="md:col-span-5">
          <div className="relative group">
            <div
              className="absolute -inset-6 blur-2xl opacity-50 group-hover:opacity-80 transition-opacity duration-700"
              style={{
                background:
                  "radial-gradient(circle, oklch(0.66 0.21 40 / 0.4), transparent 70%)",
              }}
            />
            <img
              src={bookCover}
              alt="Halfway Around the World — book cover by A. Jain"
              className="relative w-full shadow-[0_30px_80px_-20px_rgba(0,0,0,0.4)] transition-transform duration-700 group-hover:-translate-y-1"
            />
          </div>
        </Reveal>

        <div className="md:col-span-7 md:pl-8">
          <Reveal delay={100}>
            <p className="text-[11px] tracking-[0.5em] uppercase text-ember mb-6">
              About the Book
            </p>
            <h2 className="font-display text-4xl md:text-6xl leading-[1.02] mb-10">
              Some journeys are not measured
              <span className="block font-serif-em italic text-ember font-medium mt-2">
                in miles.
              </span>
            </h2>
          </Reveal>

          <Reveal delay={200}>
            <div className="space-y-6 text-[15px] md:text-base leading-relaxed text-foreground/75 max-w-2xl">
              <p>
                They're measured in the decisions you make when the world gets too loud to
                hear yourself.
              </p>
              <p>
                Andy is a Silicon Valley tech founder chasing the kind of future most
                people only talk about. In boardrooms, investor meetings, late-night
                product decisions, and the lonely silence after another win that doesn't
                feel like enough, he learns that ambition doesn't just build companies. It
                rewires people.
              </p>
              <p>
                Across cities and oceans, Andy is pulled between love, duty, desire, and
                the pressure to become someone larger than his own doubts. Cindy, a Hong
                Kong woman with her own hunger for truth and control, sees through the
                polished founder story he tells the world. Marinda offers a different kind
                of steadiness — built from discipline, intimacy, and rules neither of them
                fully understand.
              </p>
              <p>
                As Andy searches for focus inside the noise of money, technology, memory,
                and longing, he must face the question every builder eventually meets:
                <span className="text-foreground italic font-serif-em">
                  {" "}
                  what are you willing to sacrifice for the life you said you wanted?
                </span>
              </p>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-[11px] tracking-[0.3em] uppercase text-foreground/55">
              {[
                "Ambition",
                "Identity",
                "Love",
                "Sacrifice",
                "Emotional Distance",
                "Modern Life",
              ].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="h-px w-5 bg-ember/60" />
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
    <section id="author" className="relative bg-ink text-paper py-32 md:py-44 overflow-hidden">
      <div
        className="absolute top-0 right-0 w-[50rem] h-[50rem] rounded-full blur-3xl opacity-30 animate-haze"
        style={{
          background: "radial-gradient(circle, oklch(0.7 0.2 45 / 0.5), transparent 70%)",
        }}
      />
      <div className="max-w-6xl mx-auto px-6 md:px-10 grid md:grid-cols-12 gap-16 items-center relative">
        <Reveal className="md:col-span-5">
          <div className="relative aspect-[4/5] w-full max-w-md mx-auto">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.22 0.02 60), oklch(0.14 0.01 60))",
              }}
            />
            <div
              className="absolute inset-0 opacity-60"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, oklch(0.78 0.16 60 / 0.4), transparent 60%)",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-[10rem] md:text-[12rem] text-gold/30 leading-none">
                AJ
              </span>
            </div>
            <div className="absolute bottom-6 left-6 text-[10px] tracking-[0.4em] uppercase text-paper/50">
              A. Jain — Author Portrait
            </div>
          </div>
        </Reveal>

        <div className="md:col-span-7">
          <Reveal delay={100}>
            <p className="text-[11px] tracking-[0.5em] uppercase text-gold mb-6">
              About the Author
            </p>
            <h2 className="font-display text-4xl md:text-6xl leading-[1.05] mb-10">
              Writing the quiet
              <span className="block font-serif-em italic text-gold font-medium mt-2">
                between the noise.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <div className="space-y-6 text-[15px] leading-relaxed text-paper/75 max-w-2xl">
              <p>
                A. Jain writes contemporary fiction about ambition, intimacy, and the
                interior lives of people building the modern world. Drawing on years spent
                between Silicon Valley boardrooms and the long flights that connect Asia,
                Europe, and the Bay, Jain's work lives at the intersection of technology
                and tenderness.
              </p>
              <p>
                <span className="text-paper italic font-serif-em">
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
      "Jain captures the texture of a life lived across time zones with rare precision. Tender, controlled, and entirely contemporary.",
    name: "Daniel R.",
    role: "Reader",
    stars: 4,
  },
];

function Reviews() {
  return (
    <section id="reviews" className="relative bg-paper py-32 md:py-44">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <Reveal>
          <div className="text-center mb-20">
            <p className="text-[11px] tracking-[0.5em] uppercase text-ember mb-4">
              Praise
            </p>
            <h2 className="font-display text-4xl md:text-6xl leading-tight">
              What readers
              <span className="font-serif-em italic text-ember font-medium"> are saying</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {reviews.map((r, i) => (
            <Reveal key={r.name} delay={i * 100}>
              <article className="group relative h-full p-10 md:p-12 border border-foreground/10 bg-white transition-all duration-500 hover:border-ember/40 hover:-translate-y-1">
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    boxShadow:
                      "0 30px 80px -30px oklch(0.66 0.21 40 / 0.35)",
                  }}
                />
                <div className="flex items-center gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <span
                      key={idx}
                      className={`text-xs tracking-widest ${
                        idx < r.stars ? "text-ember" : "text-foreground/15"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className="font-serif-em text-xl md:text-2xl leading-snug text-foreground/85 mb-8">
                  "{r.quote}"
                </p>
                <div className="flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase text-foreground/55">
                  <span className="h-px w-6 bg-ember/60" />
                  <span className="text-foreground/80">{r.name}</span>
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
    setTimeout(() => setSent(false), 4000);
    (e.currentTarget as HTMLFormElement).reset();
  };

  return (
    <section
      id="contact"
      className="relative cinematic-gradient-dark text-paper py-32 md:py-44 overflow-hidden"
    >
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[60rem] h-[60rem] rounded-full blur-3xl opacity-20 animate-haze"
        style={{
          background: "radial-gradient(circle, oklch(0.78 0.16 60 / 0.5), transparent 70%)",
        }}
      />
      <div className="relative max-w-3xl mx-auto px-6 md:px-10">
        <Reveal>
          <div className="text-center mb-16">
            <p className="text-[11px] tracking-[0.5em] uppercase text-gold mb-4">
              Contact
            </p>
            <h2 className="font-display text-4xl md:text-6xl leading-tight">
              Write to
              <span className="font-serif-em italic text-gold font-medium"> the author</span>
            </h2>
            <p className="mt-6 text-paper/60 text-sm md:text-base max-w-lg mx-auto">
              For press, interviews, foreign rights, or a quiet note from a reader — your
              message reaches A. Jain directly.
            </p>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <form onSubmit={onSubmit} className="space-y-10">
            {[
              { id: "name", label: "Name", type: "text" },
              { id: "email", label: "Email", type: "email" },
            ].map((f) => (
              <div key={f.id} className="relative">
                <label
                  htmlFor={f.id}
                  className="block text-[10px] tracking-[0.4em] uppercase text-paper/50 mb-3"
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
                className="block text-[10px] tracking-[0.4em] uppercase text-paper/50 mb-3"
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
                className="group relative inline-flex items-center gap-3 px-10 py-4 border border-paper/30 text-xs tracking-[0.35em] uppercase overflow-hidden transition-all duration-500 hover:border-gold"
              >
                <span
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "linear-gradient(90deg, oklch(0.66 0.21 40 / 0.2), oklch(0.78 0.16 60 / 0.2))",
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
    <footer className="bg-ink text-paper/60 py-12 text-center">
      <div className="max-w-7xl mx-auto px-6">
        <p className="font-display tracking-[0.4em] text-xs uppercase text-paper/80">
          Halfway Around the World
        </p>
        <p className="mt-3 text-[11px] tracking-[0.3em] uppercase text-paper/40">
          A Novel by A. Jain
        </p>
        <p className="mt-6 text-[11px] text-paper/30">
          © {new Date().getFullYear()} A. Jain. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <main className="bg-paper text-foreground antialiased">
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
