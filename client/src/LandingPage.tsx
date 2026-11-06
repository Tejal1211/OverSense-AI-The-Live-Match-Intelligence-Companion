import { useEffect, useRef, useState, type FormEvent, type MouseEvent, type PointerEvent, type ReactNode } from "react";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  AudioLines,
  ChevronDown,
  CircleHelp,
  Crosshair,
  Github,
  Menu,
  Radio,
  ShieldCheck,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { features, type Feature } from "./landingData";

interface LandingPageProps {
  navigate: (path: string) => void;
  showSignIn: boolean;
  closeSignIn: () => void;
}

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "About", href: "#about" },
];

const steps = [
  { number: "01", title: "Follow", copy: "Choose a live match and the team you care about." },
  { number: "02", title: "Understand", copy: "AI connects the events and explains what matters." },
  { number: "03", title: "Experience", copy: "Get clear insights, context, and possible scenarios." },
];

function Logo({ light = false }: { light?: boolean }) {
  return (
    <a className={`brand${light ? " brand-light" : ""}`} href="#home" aria-label="OverSense AI home">
      <span className="brand-mark" aria-hidden="true"><AudioLines size={19} strokeWidth={2.2} /></span>
      <span className="brand-word">over<span>sense</span><i>AI</i></span>
    </a>
  );
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: 22 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.65, delay, ease: [0.2, 0.75, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Navbar({ navigate }: { navigate: LandingPageProps["navigate"] }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <nav className="nav-shell" aria-label="Main navigation">
        <Logo />
        <div className="desktop-nav">
          {navItems.map((item) => <a key={item.label} href={item.href}>{item.label}</a>)}
        </div>
        <div className="nav-actions">
          <button className="nav-signin" onClick={() => navigate("/signin")}>Sign in</button>
          <button className="button button-small button-primary nav-start" onClick={() => navigate("/start")}>
            Get started <ArrowUpRight size={15} />
          </button>
          <button
            className="mobile-menu-button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-nav"
            initial={reducedMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: reducedMotion ? 0 : 0.18 }}
          >
            {navItems.map((item) => (
              <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>
            ))}
            <button onClick={() => { setMenuOpen(false); navigate("/signin"); }}>Sign in <ArrowRight size={16} /></button>
            <button className="button button-primary" onClick={() => { setMenuOpen(false); navigate("/start"); }}>
              Get started <ArrowUpRight size={15} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function MagneticButton({
  children,
  onClick,
  secondary = false,
}: {
  children: ReactNode;
  onClick: () => void;
  secondary?: boolean;
}) {
  const reducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.35 });
  const onMove = (event: MouseEvent<HTMLButtonElement>) => {
    if (reducedMotion || window.matchMedia("(hover: none)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * 0.1);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.13);
  };
  const reset = () => { x.set(0); y.set(0); };
  return (
    <motion.button
      type="button"
      className={`button ${secondary ? "button-secondary" : "button-primary"}`}
      style={reducedMotion ? undefined : { x: springX, y: springY }}
      onMouseMove={onMove}
      onMouseLeave={reset}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}

function Hero({ navigate }: { navigate: LandingPageProps["navigate"] }) {
  const reducedMotion = useReducedMotion();
  return (
    <section className="hero-section" id="home">
      <div className="hero-photo" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />
      {!reducedMotion && <div className="hero-particles" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>}
      <div className="hero-orb hero-orb-one" aria-hidden="true" />
      <div className="hero-orb hero-orb-two" aria-hidden="true" />
      <div className="hero-content page-width">
        <motion.div
          className="hero-copy"
          initial={reducedMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="eyebrow hero-eyebrow"><span className="eyebrow-pulse" /> YOUR INTELLIGENT LIVE CRICKET COMPANION</div>
          <h1>EVERY BALL<br /><span>HAS A STORY.</span></h1>
          <p className="hero-subtitle">Don’t just follow the score. Understand the match with AI-powered live cricket intelligence.</p>
          <div className="hero-actions">
            <MagneticButton onClick={() => navigate("/match?tab=Live")}>Explore live match <ArrowUpRight size={17} /></MagneticButton>
            <MagneticButton secondary onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}>
              Discover AI features <ArrowDown size={16} />
            </MagneticButton>
          </div>
          <div className="hero-proof">
            <div className="avatar-stack" aria-hidden="true"><span>R</span><span>A</span><span>M</span><span>+</span></div>
            <p><strong>A sharper view of every match.</strong><br />Built for the way real fans think.</p>
          </div>
        </motion.div>

        <motion.aside
          className="scoreboard-card"
          aria-label="Simulated India versus Australia match preview"
          initial={reducedMotion ? false : { opacity: 0, x: 28, y: 10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
        >
          <div className="scoreboard-topline">
            <div><span className="live-dot" /> LIVE MATCH EXPERIENCE</div>
            <span className="demo-pill">DEMO</span>
          </div>
          <p className="scoreboard-fixture">INDIA <span>VS</span> AUSTRALIA</p>
          <div className="scoreboard-score">
            <div><span className="score-label">INDIA</span><strong>156<span>/4</span></strong></div>
            <div className="score-overs"><span>OVERS</span><strong>17.2</strong></div>
          </div>
          <div className="scoreboard-divider" />
          <div className="scoreboard-footer">
            <div><span className="score-label">REQUIRED RUN RATE</span><strong>9.20 <i>↗</i></strong></div>
            <div className="win-probability"><span>CHASE MOMENTUM</span><div><i /></div></div>
          </div>
          <p className="scoreboard-disclaimer"><ShieldCheck size={12} /> Illustrative match data · Not live</p>
          <div className="scoreboard-glow" aria-hidden="true" />
        </motion.aside>
      </div>
      <a className="scroll-cue" href="#features"><span>SCROLL TO EXPLORE</span><ChevronDown size={15} /></a>
      <div className="hero-bottom-fade" aria-hidden="true" />
    </section>
  );
}

function FeatureCard({
  feature,
  index,
  onClick,
}: {
  feature: Feature;
  index: number;
  onClick: () => void;
}) {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLButtonElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 180, damping: 20, mass: 0.45 });
  const springY = useSpring(rotateY, { stiffness: 180, damping: 20, mass: 0.45 });

  const handlePointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    if (reducedMotion || event.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    rotateX.set((0.5 - y) * 8);
    rotateY.set((x - 0.5) * 8);
    ref.current.style.setProperty("--pointer-x", `${x * 100}%`);
    ref.current.style.setProperty("--pointer-y", `${y * 100}%`);
  };

  const resetPointer = () => { rotateX.set(0); rotateY.set(0); };
  const Icon = feature.icon;
  return (
    <motion.button
      ref={ref}
      type="button"
      className={`feature-card accent-${feature.accent}`}
      style={reducedMotion ? undefined : { rotateX: springX, rotateY: springY }}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      onFocus={() => ref.current?.classList.add("is-focused")}
      onBlur={() => ref.current?.classList.remove("is-focused")}
      onClick={onClick}
      aria-label={`Explore ${feature.title}`}
      initial={reducedMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.07 }}
    >
      <span className="feature-card-glow" aria-hidden="true" />
      <span className="feature-image" style={{ backgroundImage: `linear-gradient(110deg, transparent, rgba(7,10,18,.48)), url("${feature.image}")` }} aria-hidden="true" />
      <span className="feature-particle" aria-hidden="true" />
      <span className="feature-card-top"><span className="feature-index">0{index + 1}</span><ArrowUpRight className="feature-arrow" size={17} /></span>
      <span className="feature-icon-wrap"><Icon size={21} strokeWidth={1.7} /></span>
      <span className="feature-eyebrow">{feature.eyebrow}</span>
      <span className="feature-title">{feature.title}</span>
      <span className="feature-copy">{feature.description}</span>
      <span className="feature-cta">Explore feature <ArrowRight size={14} /></span>
      <span className="feature-card-grain" aria-hidden="true" />
    </motion.button>
  );
}

function Features({ navigate }: { navigate: LandingPageProps["navigate"] }) {
  return (
    <section className="section features-section" id="features">
      <div className="page-width">
        <Reveal className="section-heading">
          <span className="eyebrow"><Sparkles size={14} /> A NEW POINT OF VIEW</span>
          <h2>THE GAME,<br /><span>DECODED BY AI.</span></h2>
          <p>Everything happening on the field. Connected, contextualized, and explained in real time.</p>
        </Reveal>
        <div className="features-grid">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              index={index}
              onClick={() => navigate(`/match?tab=${encodeURIComponent(feature.tab)}`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function MatchPreview({ navigate }: { navigate: LandingPageProps["navigate"] }) {
  const reducedMotion = useReducedMotion();
  return (
    <section className="section catchup-section" id="catch-up">
      <div className="catchup-glow" aria-hidden="true" />
      <div className="page-width catchup-layout">
        <Reveal className="catchup-copy">
          <span className="eyebrow"><AudioLines size={14} /> THE MATCH, IN CONTEXT</span>
          <h2>10 OVERS.<br /><span>30 SECONDS.</span><br />FULL CONTEXT.</h2>
          <p>Walk back into the match already knowing what matters. The Catch-Up Capsule turns the last 10 overs into one clear, compelling story.</p>
          <ul className="catchup-benefits">
            <li><span><Zap size={14} /></span> The moments that shifted momentum</li>
            <li><span><CircleHelp size={14} /></span> The why behind every turning point</li>
            <li><span><Crosshair size={14} /></span> What to watch for next</li>
          </ul>
          <button className="text-link" onClick={() => navigate("/match?tab=Intelligence")}>Try match catch-up <ArrowRight size={16} /></button>
        </Reveal>
        <Reveal className="report-wrap" delay={0.12}>
          <motion.div
            className="report-card"
            animate={reducedMotion ? undefined : { y: [0, -7, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="report-header">
              <div><span className="report-kicker">OVERSENSE INTELLIGENCE</span><h3>Match intelligence report</h3></div>
              <span className="demo-pill">DEMO</span>
            </div>
            <div className="report-match"><span className="report-team-mark">I</span><span>IND <b>104/3</b></span><i>13.0 OV</i><span>vs</span><span>AUS</span><span className="report-team-mark report-aus">A</span></div>
            <div className="report-summary">
              <span className="summary-spark"><Sparkles size={15} /></span>
              <p><strong>Pressure is building.</strong> Three overs could reshape this chase.</p>
            </div>
            <div className="report-insights">
              {[
                ["02", "wickets lost in the last three overs", "violet"],
                ["↓", "scoring rate has started to slow", "blue"],
                ["↗", "spin is creating pressure in the middle", "cyan"],
              ].map(([value, text, tone]) => (
                <div className="report-insight" key={text}>
                  <span className={`insight-value tone-${tone}`}>{value}</span><span>{text}</span>
                </div>
              ))}
            </div>
            <div className="report-timeline">
              <div className="report-timeline-top"><span>THE LAST FEW OVERS</span><span>OVER 13</span></div>
              <div className="timeline-track"><i /><i /><i /><i /><span /></div>
              <div className="timeline-captions"><span>WICKET</span><span>SPIN ON</span><span>NOW</span></div>
            </div>
            <div className="report-next"><span className="next-icon"><ArrowDownRight size={17} /></span><span><small>WHAT TO WATCH</small><b>The next partnership could be crucial.</b></span><ArrowUpRight size={15} /></div>
            <p className="report-disclaimer"><ShieldCheck size={12} /> Sample match data · AI response may vary</p>
          </motion.div>
          {!reducedMotion && <span className="report-orbit orbit-one" aria-hidden="true" />}
          <span className="report-orbit orbit-two" aria-hidden="true" />
        </Reveal>
      </div>
    </section>
  );
}

function HowItWorks({ navigate }: { navigate: LandingPageProps["navigate"] }) {
  return (
    <section className="section how-section" id="how-it-works">
      <div className="page-width">
        <Reveal className="section-heading section-heading-centered">
          <span className="eyebrow"><Radio size={14} /> A BETTER WAY TO FOLLOW</span>
          <h2>FROM BALL ONE<br /><span>TO THE BIG PICTURE.</span></h2>
          <p>More than a scorecard. A smarter way to feel every moment of the game.</p>
        </Reveal>
        <div className="steps-grid">
          <div className="steps-connector" aria-hidden="true"><span /></div>
          {steps.map((step, index) => (
            <Reveal className="step-card" key={step.number} delay={index * 0.1}>
              <div className="step-number">{step.number}<span /></div>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="steps-action">
          <button className="button button-secondary" onClick={() => navigate("/start")}>Meet your match companion <ArrowRight size={16} /></button>
        </Reveal>
      </div>
    </section>
  );
}

function FinalCta({ navigate }: { navigate: LandingPageProps["navigate"] }) {
  return (
    <section className="final-cta-section" id="about">
      <div className="final-cta-image" aria-hidden="true" />
      <div className="final-cta-lights" aria-hidden="true" />
      <Reveal className="final-cta-content page-width">
        <span className="eyebrow"><Sparkles size={14} /> THE GAME FEELS DIFFERENT WHEN YOU GET IT</span>
        <h2>STOP WATCHING<br />THE SCORE.<br /><span>START UNDERSTANDING<br />THE GAME.</span></h2>
        <p>Your match companion is ready. Experience cricket with a new perspective.</p>
        <div className="final-cta-actions">
          <button className="button button-primary" onClick={() => navigate("/start")}>Get started <ArrowUpRight size={16} /></button>
          <a className="button button-secondary" href="#features">Explore features <ArrowDown size={15} /></a>
        </div>
      </Reveal>
    </section>
  );
}

function Footer({ navigate }: { navigate: LandingPageProps["navigate"] }) {
  return (
    <footer className="site-footer">
      <div className="page-width">
        <div className="footer-main">
          <div className="footer-brand">
            <Logo light />
            <p>A little more context.<br />A whole new game.</p>
          </div>
          <div className="footer-links">
            <div><h3>Explore</h3><a href="#features">Features</a><a href="#how-it-works">How it works</a><a href="#about">About OverSense</a></div>
            <div><h3>The experience</h3><button onClick={() => navigate("/match?tab=Live")}>Live match demo</button><button onClick={() => navigate("/match?tab=Intelligence")}>Match catch-up</button><button onClick={() => navigate("/match?tab=Simulator")}>What if simulator</button></div>
            <div><h3>Say hello</h3><a href="mailto:hello@oversense.ai">Contact us <ArrowUpRight size={13} /></a><a href="https://github.com/" target="_blank" rel="noreferrer">GitHub <Github size={13} /></a></div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} OverSense AI. Made for the love of the game.</span>
          <span><i /> All match and player data in this experience is simulated.</span>
        </div>
      </div>
    </footer>
  );
}

function SignInModal({ close }: { close: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") close(); };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [close]);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };
  return (
    <motion.div
      className="modal-backdrop"
      role="presentation"
      initial={reducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reducedMotion ? 0 : 0.22 }}
      onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}
    >
      <motion.section
        className="signin-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="signin-title"
        initial={reducedMotion ? false : { opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ duration: reducedMotion ? 0 : 0.22 }}
      >
        <button className="modal-close" aria-label="Close sign in" onClick={close}><X size={18} /></button>
        <Logo />
        <span className="eyebrow">WELCOME BACK</span>
        <h2 id="signin-title">Your match is waiting.</h2>
        <p>Sign in to pick up where you left off.</p>
        {submitted ? (
          <div className="signin-notice"><CircleHelp size={18} /><span>Account sign-in isn’t available in this prototype yet. Get started to explore the demo.</span></div>
        ) : (
          <form onSubmit={submit} className="signin-form">
            <label htmlFor="signin-email">Email address</label>
            <input id="signin-email" type="email" placeholder="you@example.com" autoComplete="email" required />
            <label htmlFor="signin-password">Password</label>
            <input id="signin-password" type="password" placeholder="Your password" autoComplete="current-password" required />
            <button className="button button-primary" type="submit">Continue <ArrowRight size={16} /></button>
          </form>
        )}
        <button className="signin-create" onClick={close}>New to OverSense? <span>Explore the experience</span></button>
      </motion.section>
    </motion.div>
  );
}

export default function LandingPage({ navigate, showSignIn, closeSignIn }: LandingPageProps) {
  return (
    <div className="landing-page">
      <Navbar navigate={navigate} />
      <main>
        <Hero navigate={navigate} />
        <Features navigate={navigate} />
        <MatchPreview navigate={navigate} />
        <HowItWorks navigate={navigate} />
        <FinalCta navigate={navigate} />
      </main>
      <Footer navigate={navigate} />
      <AnimatePresence>{showSignIn && <SignInModal close={closeSignIn} />}</AnimatePresence>
    </div>
  );
}
