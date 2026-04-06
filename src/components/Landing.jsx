import { useEffect, useRef, useState } from "react";
import NoiseLayer from "./NoiseLayer";

const socialLinks = [
  {
    name: "X",
    href: "https://x.com/RadeMachineXR",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18" fill="white">
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.847h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.153h7.594l5.243 6.932 6.064-6.932Zm-1.291 19.492h2.039L6.486 3.241H4.298L17.61 20.645Z" />
      </svg>
    ),
  },
  {
    name: "Telegram",
    href: "https://t.me/rade_machine",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18" fill="white">
        <path d="M21.944 4.665c.307-1.417-.512-1.972-1.756-1.52L2.56 9.94c-1.203.47-1.186 1.142-.219 1.438l4.516 1.409 10.452-6.596c.494-.3.945-.138.573.192l-8.469 7.646-.328 4.87c.48 0 .691-.22.96-.48l2.31-2.245 4.805 3.548c.885.488 1.52.237 1.741-.819l3.043-14.238Z" />
      </svg>
    ),
  },
  {
    name: "Discord",
    href: "https://discord.com",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" width="20" height="20" fill="white">
        <path d="M20.317 4.369A19.791 19.791 0 0 0 15.558 3c-.206.375-.444.88-.608 1.274a18.27 18.27 0 0 0-5.9 0A12.64 12.64 0 0 0 8.44 3a19.736 19.736 0 0 0-4.76 1.369C.675 8.874-.14 13.268.267 17.607A19.9 19.9 0 0 0 6.13 20.6c.472-.645.892-1.326 1.255-2.038-.69-.26-1.35-.58-1.972-.95.165-.12.326-.246.482-.375 3.804 1.787 7.928 1.787 11.687 0 .16.13.32.255.483.375-.624.372-1.287.692-1.978.952.363.71.783 1.392 1.255 2.036a19.875 19.875 0 0 0 5.864-2.993c.478-5.028-.816-9.381-2.889-13.238ZM8.02 14.94c-1.14 0-2.073-1.055-2.073-2.35 0-1.296.914-2.35 2.073-2.35 1.17 0 2.092 1.064 2.073 2.35 0 1.295-.914 2.35-2.073 2.35Zm7.66 0c-1.14 0-2.072-1.055-2.072-2.35 0-1.296.913-2.35 2.072-2.35 1.171 0 2.093 1.064 2.074 2.35 0 1.295-.904 2.35-2.074 2.35Z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@RadeMachine",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" width="20" height="20" fill="white">
        <path d="M23.498 6.186a2.997 2.997 0 0 0-2.11-2.12C19.53 3.5 12 3.5 12 3.5s-7.53 0-9.389.566A2.997 2.997 0 0 0 .5 6.186 31.12 31.12 0 0 0 0 12a31.12 31.12 0 0 0 .5 5.814 2.997 2.997 0 0 0 2.111 2.12C4.47 20.5 12 20.5 12 20.5s7.53 0 9.389-.566a2.997 2.997 0 0 0 2.11-2.12A31.12 31.12 0 0 0 24 12a31.12 31.12 0 0 0-.502-5.814ZM9.545 15.568V8.432L15.818 12l-6.273 3.568Z" />
      </svg>
    ),
  },
];

const roadmapPhases = [
  {
    phase: "Q1",
    title: "Early Whitelist Registration",
    points: [
      "Open access for early supporters and first testers",
      "Begin community onboarding and early feedback collection",
      "Set the foundation for the RADE MACHINE player network",
    ],
  },
  {
    phase: "Q2",
    title: "First Mobile Game Launch",
    points: [
      "Release the first mobile play-to-learn experience",
      "Introduce the first interactive skill progression systems",
      "Start transforming learning into gameplay-driven discovery",
    ],
  },
  {
    phase: "Q3",
    title: "Multiplayer + RM-Academy",
    points: [
      "Launch multiplayer systems and shared player progression",
      "Open RM-Academy as the next layer of digital skill growth",
      "Expand learning tracks across cybersecurity, gamedev, and blockchain",
    ],
  },
  {
    phase: "Q4",
    title: "Coming Soon",
    points: [
      "Next-stage platform expansion",
      "More content, systems, and academy layers",
      "Further ecosystem rollout to be revealed",
    ],
  },
];

function EmailSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus("submitting");
    try {
      const res = await fetch("https://formspree.io/f/mkoqzajg", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      className="landing-enter"
      style={{
        animationDelay: "0.35s",
        display: "grid",
        gap: 24,
        justifyItems: "center",
        textAlign: "center",
      }}
    >
      <div style={{ display: "grid", gap: 12, justifyItems: "center" }}>
        <p
          style={{
            margin: 0,
            fontSize: 12,
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.46)",
          }}
        >
          Early Access
        </p>
        <h2
          style={{
            margin: 0,
            fontFamily: "Orbitron, sans-serif",
            fontSize: "clamp(20px, 3vw, 34px)",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          Get future updates first.
        </h2>
        <p
          style={{
            maxWidth: 560,
            margin: 0,
            color: "rgba(255,255,255,0.62)",
            lineHeight: 1.8,
            fontSize: 15,
            padding: "0 8px",
          }}
        >
          Enter your email to be among the first to get access when we launch.
        </p>
      </div>

      {status === "success" ? (
        <div
          className="info-card"
          style={{
            borderRadius: 24,
            padding: "24px 32px",
            display: "grid",
            gap: 8,
            justifyItems: "center",
            maxWidth: 480,
            width: "100%",
          }}
        >
          <span
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontSize: 13,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "white",
            }}
          >
            You're In
          </span>
          <p style={{ margin: 0, color: "rgba(255,255,255,0.58)", fontSize: 14, lineHeight: 1.7 }}>
            We'll reach out as soon as access opens. Stay tuned.
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="signup-form"
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            width: "100%",
            maxWidth: 520,
          }}
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="signup-input"
            style={{
              flex: "1 1 200px",
              padding: "16px 20px",
              borderRadius: 9999,
              border: "1px solid rgba(255,255,255,0.14)",
              background: "rgba(255,255,255,0.03)",
              color: "white",
              outline: "none",
              fontSize: 14,
              minWidth: 0,
            }}
          />
          <button
            type="submit"
            disabled={status === "submitting"}
            className="signup-btn"
            style={{
              flexShrink: 0,
              padding: "16px 32px",
              borderRadius: 9999,
              border: "1px solid rgba(255,255,255,0.28)",
              background: "rgba(255,255,255,0.08)",
              color: "white",
              fontFamily: "Orbitron, sans-serif",
              fontSize: 12,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              cursor: status === "submitting" ? "not-allowed" : "pointer",
              boxShadow: "0 0 24px rgba(255,255,255,0.08)",
              opacity: status === "submitting" ? 0.6 : 1,
              whiteSpace: "nowrap",
            }}
          >
            {status === "submitting" ? "Sending…" : "Join"}
          </button>
          {status === "error" && (
            <p style={{ width: "100%", margin: 0, color: "rgba(255,100,100,0.8)", fontSize: 13, textAlign: "center" }}>
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      )}
    </section>
  );
}

export default function Landing({ onExplore }) {
  const [isGlitching, setIsGlitching] = useState(true);
  const [mouse, setMouse] = useState({ x: 0, y: 0, active: false });
  const outerRingRef = useRef(null);
  const innerRingRef = useRef(null);
  const glowRef = useRef(null);
  const contentRef = useRef(null);
  const aboutRef = useRef(null);

  useEffect(() => {
    let animationFrame;
    const animate = () => {
      const { x, y, active } = mouse;
      const moveX = active ? (x - window.innerWidth / 2) / window.innerWidth : 0;
      const moveY = active ? (y - window.innerHeight / 2) / window.innerHeight : 0;

      if (outerRingRef.current) {
        outerRingRef.current.style.transform = `translate(-50%, -50%) translate(${moveX * 28}px, ${moveY * 28}px) rotate(${moveX * 8}deg) scale(${1 + Math.abs(moveX) * 0.04 + Math.abs(moveY) * 0.04})`;
      }
      if (innerRingRef.current) {
        innerRingRef.current.style.transform = `translate(-50%, -50%) translate(${moveX * -18}px, ${moveY * -18}px) rotate(${moveY * -10}deg) scale(${1 + Math.abs(moveX) * 0.02})`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(-50%, -50%) translate(${moveX * 42}px, ${moveY * 42}px) scale(${1 + Math.abs(moveX) * 0.08 + Math.abs(moveY) * 0.08})`;
      }
      animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [mouse]);

  const handleMouseMove = (e) => setMouse({ x: e.clientX, y: e.clientY, active: true });
  const handleMouseLeave = () => setMouse((prev) => ({ ...prev, active: false }));
  const scrollToAbout = () => aboutRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        minHeight: "100vh",
        background: "black",
        color: "white",
        position: "relative",
        overflow: "hidden",
        padding: "40px 20px 28px",
      }}
    >
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }

        @keyframes landingFloat {
          0%,100% { opacity: 0.14; }
          50% { opacity: 0.24; }
        }
        @keyframes slowRotateA {
          0%,100% { filter: blur(0px); }
          50% { filter: blur(0.4px); }
        }
        @keyframes slowRotateB {
          0%,100% { opacity: 0.75; }
          50% { opacity: 1; }
        }
        @keyframes textEntrance {
          0% { opacity: 0; transform: translateY(18px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes logoGlitchA {
          0% { transform: translate(0,0); clip-path: inset(0 0 0 0); opacity: 0; }
          10% { transform: translate(-3px,1px); clip-path: inset(8% 0 62% 0); opacity: 0.85; }
          20% { transform: translate(3px,-1px); clip-path: inset(58% 0 8% 0); opacity: 0.7; }
          30% { transform: translate(-2px,0); clip-path: inset(35% 0 28% 0); opacity: 0.9; }
          40% { transform: translate(2px,1px); clip-path: inset(15% 0 56% 0); opacity: 0.55; }
          50% { transform: translate(-4px,-1px); clip-path: inset(72% 0 6% 0); opacity: 0.75; }
          60% { transform: translate(1px,0); clip-path: inset(42% 0 18% 0); opacity: 0.65; }
          100% { transform: translate(0,0); clip-path: inset(0 0 0 0); opacity: 0; }
        }
        @keyframes logoGlitchB {
          0% { transform: translate(0,0); clip-path: inset(0 0 0 0); opacity: 0; }
          12% { transform: translate(4px,0); clip-path: inset(60% 0 12% 0); opacity: 0.65; }
          24% { transform: translate(-3px,1px); clip-path: inset(12% 0 64% 0); opacity: 0.9; }
          36% { transform: translate(2px,-1px); clip-path: inset(32% 0 24% 0); opacity: 0.75; }
          48% { transform: translate(-2px,0); clip-path: inset(78% 0 4% 0); opacity: 0.6; }
          60% { transform: translate(3px,1px); clip-path: inset(22% 0 48% 0); opacity: 0.8; }
          100% { transform: translate(0,0); clip-path: inset(0 0 0 0); opacity: 0; }
        }
        @keyframes buttonGlow {
          0%,100% { box-shadow: 0 0 0 rgba(255,255,255,0); }
          50% { box-shadow: 0 0 18px rgba(255,255,255,0.08); }
        }
        @keyframes q2Pulse {
          0%,100% { box-shadow: 0 0 0 rgba(255,255,255,0.10), inset 0 0 0 rgba(255,255,255,0.04); }
          50% { box-shadow: 0 0 38px rgba(255,255,255,0.14), inset 0 0 26px rgba(255,255,255,0.05); }
        }

        .wave-ring {
          transition: transform 0.9s cubic-bezier(0.22,1,0.36,1);
          will-change: transform;
        }
        .ring-a { animation: slowRotateA 6s ease-in-out infinite; }
        .ring-b { animation: slowRotateB 5s ease-in-out infinite; }

        .landing-enter {
          opacity: 0;
          animation: textEntrance 0.9s ease-out forwards;
        }
        .content-parallax {
          transition: transform 0.7s cubic-bezier(0.22,1,0.36,1);
          will-change: transform;
        }

        /* ── Logo glitch ── */
        .glitch-wrap {
          position: relative;
          display: inline-block;
          cursor: default;
          max-width: 100%;
        }
        .glitch-base, .glitch-layer-a, .glitch-layer-b {
          font-family: Orbitron, sans-serif;
          font-size: clamp(30px, 8vw, 72px);
          letter-spacing: clamp(0.08em, 1.5vw, 0.22em);
          text-transform: uppercase;
          line-height: 1.1;
          white-space: nowrap;
        }
        .glitch-base { position: relative; z-index: 2; color: white; }
        .glitch-layer-a, .glitch-layer-b {
          position: absolute; inset: 0; pointer-events: none; opacity: 0;
        }
        .glitch-layer-a {
          color: rgba(255,255,255,0.98);
          text-shadow: -3px 0 rgba(255,255,255,0.4), 0 0 12px rgba(255,255,255,0.12);
        }
        .glitch-layer-b {
          color: rgba(255,255,255,0.92);
          text-shadow: 2px 0 rgba(255,255,255,0.28);
        }
        .glitch-wrap.active .glitch-layer-a {
          animation: logoGlitchA 0.65s steps(2,end) infinite; opacity: 1;
        }
        .glitch-wrap.active .glitch-layer-b {
          animation: logoGlitchB 0.8s steps(2,end) infinite; opacity: 1;
        }

        /* ── Shared card styles ── */
        .info-card, .phase-card, .footer-shell {
          background: linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02));
          border: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(8px);
        }
        .phase-card {
          transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
        }
        .phase-card.q2-highlight {
          position: relative;
          border-color: rgba(255,255,255,0.22);
          background: linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03));
          animation: q2Pulse 3s ease-in-out infinite;
          overflow: hidden;
        }
        .phase-card.q2-highlight::before {
          content: "";
          position: absolute; inset: -1px;
          border-radius: inherit;
          background: radial-gradient(circle at top center, rgba(255,255,255,0.16), transparent 55%);
          pointer-events: none; opacity: 0.9;
        }

        /* ── Buttons ── */
        .explore-btn {
          transition: transform 180ms ease, box-shadow 180ms ease;
          animation: textEntrance 0.9s ease-out forwards, buttonGlow 3s ease-in-out infinite;
        }

        /* ── Social icons ── */
        .social-btn {
          width: 46px; height: 46px;
          border-radius: 9999px;
          border: 1px solid rgba(255,255,255,0.14);
          background: rgba(255,255,255,0.03);
          display: inline-flex; align-items: center; justify-content: center;
          color: white; flex-shrink: 0;
          transition: transform 180ms ease, box-shadow 180ms ease, background 180ms ease;
        }

        /* ── Roadmap grid: 4 cols desktop → 2 tablet → 1 mobile ── */
        .roadmap-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        /* ── Signup form ── */
        .signup-form { flex-wrap: nowrap; }
        .signup-input { min-width: 0; }

        /* ── Footer ── */
        .footer-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          flex-wrap: wrap;
        }
        .footer-socials {
          display: flex; align-items: center; gap: 12px; flex-wrap: wrap;
        }

        /* ── Hover (pointer devices only) ── */
        @media (hover: hover) {
          .explore-btn:hover { transform: translateY(-3px); }
          .phase-card:hover, .info-card:hover {
            border-color: rgba(255,255,255,0.22);
            box-shadow: 0 0 34px rgba(255,255,255,0.09);
          }
          .social-btn:hover {
            background: rgba(255,255,255,0.07);
            box-shadow: 0 0 26px rgba(255,255,255,0.18);
            transform: translateY(-3px);
          }
        }

        /* ── TABLET (≤ 1024px) ── */
        @media (max-width: 1024px) {
          .roadmap-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* ── MOBILE (≤ 600px) ── */
        @media (max-width: 600px) {
          .glitch-base, .glitch-layer-a, .glitch-layer-b {
            font-size: clamp(28px, 9vw, 42px);
            letter-spacing: 0.10em;
          }

          .roadmap-grid {
            grid-template-columns: 1fr;
          }

          .signup-form {
            flex-direction: column;
            flex-wrap: wrap;
          }
          .signup-input, .signup-btn {
            width: 100%;
            flex: none !important;
          }

          .about-text-col { max-width: 100% !important; }

          .footer-inner {
            flex-direction: column;
            align-items: flex-start;
          }
          .footer-socials { width: 100%; }

          .hero-btn {
            width: 100%;
            min-width: unset !important;
          }
          .hero-btn-wrap {
            width: 100%;
            flex-direction: column !important;
          }
        }
      `}</style>

      <NoiseLayer />

      {/* Rings — clamp so they don't overflow on small screens */}
      <div
        ref={outerRingRef}
        className="wave-ring ring-a"
        style={{
          position: "absolute",
          left: "50%",
          top: "18%",
          width: "min(560px, 92vw)",
          height: "min(560px, 92vw)",
          transform: "translate(-50%, -50%)",
          border: "1px solid rgba(255,255,255,0.10)",
          borderRadius: "50%",
        }}
      />
      <div
        ref={innerRingRef}
        className="wave-ring ring-b"
        style={{
          position: "absolute",
          left: "50%",
          top: "18%",
          width: "min(760px, 130vw)",
          height: "min(760px, 130vw)",
          transform: "translate(-50%, -50%)",
          border: "1px solid rgba(255,255,255,0.05)",
          borderRadius: "50%",
        }}
      />

      <div
        style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "100% 4px",
          opacity: 0.18, pointerEvents: "none",
        }}
      />

      <div
        ref={contentRef}
        className="content-parallax"
        style={{
          position: "relative", zIndex: 3,
          maxWidth: 1180, width: "100%",
          margin: "0 auto",
          display: "flex", flexDirection: "column", gap: 56,
        }}
      >
        {/* ── Hero ── */}
        <section style={{ minHeight: "100svh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div
            style={{
              textAlign: "center", padding: "24px 0", width: "100%",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              gap: 22,
            }}
          >
            <div
              className={`glitch-wrap landing-enter ${isGlitching ? "active" : ""}`}
              style={{ animationDelay: "0.2s" }}
            >
              <div className="glitch-layer-a">RADE MACHINE</div>
              <div className="glitch-layer-b">RADE MACHINE</div>
              <div className="glitch-base">RADE MACHINE</div>
            </div>

            <p
              className="landing-enter"
              style={{
                maxWidth: 680, margin: 0,
                fontSize: "clamp(11px, 1.8vw, 14px)",
                letterSpacing: "clamp(0.08em, 1vw, 0.18em)",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1.8,
                animationDelay: "0.35s",
                padding: "0 8px",
              }}
            >
              An independent game studio building play-to-learn experiences for the next generation of digital skills.
            </p>

            <div
              className="landing-enter hero-btn-wrap"
              style={{
                animationDelay: "0.5s",
                display: "flex", gap: 14,
                justifyContent: "center", alignItems: "center",
                marginTop: 8, opacity: 0,
                padding: "0 8px",
              }}
            >
              <button
                className="explore-btn hero-btn"
                onClick={scrollToAbout}
                style={{
                  position: "relative", zIndex: 20,
                  padding: "18px 42px", borderRadius: 9999,
                  border: "1px solid rgba(255,255,255,0.35)",
                  background: "rgba(0,0,0,0.88)", color: "white",
                  fontFamily: "Orbitron, sans-serif",
                  fontSize: 13, letterSpacing: "0.24em", textTransform: "uppercase",
                  backdropFilter: "blur(6px)", cursor: "pointer",
                  boxShadow: "0 0 30px rgba(255,255,255,0.08)",
                  minWidth: 220,
                }}
              >
                <span style={{ position: "relative", zIndex: 2 }}>ABOUT US</span>
                <span
                  style={{
                    position: "absolute", inset: 0, borderRadius: 9999,
                    background: "radial-gradient(circle at center, rgba(255,255,255,0.18), transparent 70%)",
                    opacity: 0.25, pointerEvents: "none",
                  }}
                />
              </button>
            </div>
          </div>
        </section>

        {/* ── About ── */}
        <section
          ref={aboutRef}
          className="landing-enter"
          style={{
            animationDelay: "0.2s",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))",
            gap: 24, alignItems: "stretch",
          }}
        >
          <div
            className="about-text-col"
            style={{ display: "flex", flexDirection: "column", gap: 16, justifyContent: "center" }}
          >
            <p style={{ margin: 0, fontSize: 12, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.46)" }}>
              About Us
            </p>
            <h2
              style={{
                margin: 0, fontFamily: "Orbitron, sans-serif",
                fontSize: "clamp(20px, 3.5vw, 34px)",
                letterSpacing: "0.12em", textTransform: "uppercase", lineHeight: 1.3,
              }}
            >
              An independent game studio building a play-to-learn future.
            </h2>
            <p style={{ margin: 0, color: "rgba(255,255,255,0.68)", lineHeight: 1.9, fontSize: 15 }}>
              RADE MACHINE is building a platform where players learn by playing. We create games that turn curiosity into real digital skills, with our first focus areas centered on cybersecurity, game development, and blockchain technology.
            </p>
          </div>

          <div className="info-card" style={{ borderRadius: 28, padding: 28, display: "grid", gap: 18 }}>
            {[
              ["Play To Learn", "Our games are built to make learning feel interactive, rewarding, and immersive."],
              ["Digital Skill Focus", "We are currently focused on cybersecurity, gamedev, and blockchain as the first core academy tracks."],
              ["Built In Switzerland", "Independent studio mindset, global ambition, and a long-term mission to make digital education more engaging."],
            ].map(([label, text]) => (
              <div key={label} style={{ paddingBottom: 14, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                <div
                  style={{
                    fontFamily: "Orbitron, sans-serif", fontSize: 11,
                    letterSpacing: "0.24em", textTransform: "uppercase", color: "white", marginBottom: 8,
                  }}
                >
                  {label}
                </div>
                <div style={{ color: "rgba(255,255,255,0.62)", lineHeight: 1.7, fontSize: 14 }}>{text}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Roadmap ── */}
        <section className="landing-enter" style={{ animationDelay: "0.3s", display: "grid", gap: 24 }}>
          <div style={{ display: "grid", gap: 12, textAlign: "center", justifyItems: "center" }}>
            <p style={{ margin: 0, fontSize: 12, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.46)" }}>
              Roadmap
            </p>
            <h2
              style={{
                margin: 0, fontFamily: "Orbitron, sans-serif",
                fontSize: "clamp(20px, 3.5vw, 34px)",
                letterSpacing: "0.12em", textTransform: "uppercase", lineHeight: 1.3, padding: "0 8px",
              }}
            >
              Build the platform. Launch the games. Expand the academy.
            </h2>
            <p style={{ maxWidth: 700, margin: 0, color: "rgba(255,255,255,0.62)", lineHeight: 1.8, fontSize: 15, padding: "0 8px" }}>
              Our roadmap begins with early whitelist access, continues with the first mobile game launch, and then expands into multiplayer systems and RM-Academy as the foundation of the full play-to-learn ecosystem.
            </p>
          </div>

          <div className="roadmap-grid">
            {roadmapPhases.map((item, index) => (
              <div
                key={item.phase}
                className={`phase-card ${item.phase === "Q2" ? "q2-highlight" : ""}`}
                style={{ borderRadius: 24, padding: 24, display: "grid", gap: 18, animationDelay: `${index * 0.25}s` }}
              >
                <div style={{ display: "grid", gap: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                    <span
                      style={{
                        width: 44, height: 44, borderRadius: 9999,
                        border: "1px solid rgba(255,255,255,0.1)",
                        display: "inline-flex", alignItems: "center", justifyContent: "center",
                        color: "rgba(255,255,255,0.74)", fontSize: 14, letterSpacing: "0.2em",
                        textTransform: "uppercase", fontFamily: "Orbitron, sans-serif", flexShrink: 0,
                      }}
                    >
                      {item.phase}
                    </span>

                    {item.phase === "Q2" && (
                      <span
                        style={{
                          padding: "7px 12px", borderRadius: 9999,
                          border: "1px solid rgba(255,255,255,0.18)",
                          background: "rgba(255,255,255,0.07)", color: "white",
                          fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase",
                          fontFamily: "Orbitron, sans-serif",
                          boxShadow: "0 0 18px rgba(255,255,255,0.12)",
                          height: 30, display: "inline-flex", alignItems: "center",
                        }}
                      >
                        Live Now
                      </span>
                    )}
                  </div>

                  <h3
                    style={{
                      margin: 0, fontFamily: "Orbitron, sans-serif",
                      fontSize: "clamp(13px, 2vw, 18px)",
                      letterSpacing: "0.08em", textTransform: "uppercase", lineHeight: 1.3,
                    }}
                  >
                    {item.title}
                  </h3>
                </div>

                <div style={{ display: "grid", gap: 12 }}>
                  {item.points.map((point) => (
                    <div
                      key={point}
                      style={{
                        display: "grid", gridTemplateColumns: "10px 1fr", gap: 12, alignItems: "start",
                        color: "rgba(255,255,255,0.64)", fontSize: 14, lineHeight: 1.7,
                      }}
                    >
                      <span
                        style={{
                          width: 6, height: 6, borderRadius: "50%",
                          background: "rgba(255,255,255,0.85)",
                          marginTop: 9, flexShrink: 0,
                          boxShadow: item.phase === "Q2" ? "0 0 14px rgba(255,255,255,0.22)" : "none",
                        }}
                      />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Email Signup ── */}
        <EmailSignup />

        {/* ── Footer ── */}
        <footer
          className="footer-shell landing-enter"
          style={{ animationDelay: "0.4s", borderRadius: 28, padding: "20px 24px", marginTop: 10 }}
        >
          <div className="footer-inner">
            <div style={{ display: "grid", gap: 6 }}>
              <span
                style={{
                  fontFamily: "Orbitron, sans-serif", fontSize: 12,
                  letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(255,255,255,0.8)",
                }}
              >
                © 2026 RADE MACHINE
              </span>
              <a
                href="mailto:rademachine@proton.me"
                style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, letterSpacing: "0.06em", textDecoration: "none", marginTop: 2 }}
              >
                rademachine@proton.me
              </a>
            </div>

            <div className="footer-socials">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  className="social-btn"
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.name}
                  title={item.name}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}