import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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

export default function Landing({ onExplore }) {
  const [isGlitching, setIsGlitching] = useState(true);
  const [mouse, setMouse] = useState({ x: 0, y: 0, active: false });
  const [isJoinOpen, setIsJoinOpen] = useState(false);
  const outerRingRef = useRef(null);
  const innerRingRef = useRef(null);
  const glowRef = useRef(null);
  const contentRef = useRef(null);
  const aboutRef = useRef(null);
  const joinOverlayRef = useRef(null);
  const joinModalRef = useRef(null);
  const joinInputRef = useRef(null);
  const scrollYRef = useRef(0);

  const openJoinModal = () => {
    setIsJoinOpen(true);
  };

  const closeJoinModal = () => {
    setIsJoinOpen(false);
  };

  useEffect(() => {
    if (!isJoinOpen) {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollYRef.current || 0);
      return;
    }

    scrollYRef.current = window.scrollY;

    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollYRef.current}px`;
    document.body.style.width = "100%";

    requestAnimationFrame(() => {
      if (joinOverlayRef.current) {
        joinOverlayRef.current.scrollTop = 0;
      }

      if (joinModalRef.current) {
        joinModalRef.current.scrollTop = 0;
      }

      if (joinInputRef.current) {
        joinInputRef.current.focus();
      }
    });

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeJoinModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollYRef.current || 0);
    };
  }, [isJoinOpen]);

  useEffect(() => {
    let animationFrame;

    const animate = () => {
      const { x, y, active } = mouse;

      const moveX = active ? (x - window.innerWidth / 2) / window.innerWidth : 0;
      const moveY = active ? (y - window.innerHeight / 2) / window.innerHeight : 0;

      if (outerRingRef.current) {
        outerRingRef.current.style.transform = `
          translate(-50%, -50%)
          translate(${moveX * 28}px, ${moveY * 28}px)
          rotate(${moveX * 8}deg)
          scale(${1 + Math.abs(moveX) * 0.04 + Math.abs(moveY) * 0.04})
        `;
      }

      if (innerRingRef.current) {
        innerRingRef.current.style.transform = `
          translate(-50%, -50%)
          translate(${moveX * -18}px, ${moveY * -18}px)
          rotate(${moveY * -10}deg)
          scale(${1 + Math.abs(moveX) * 0.02})
        `;
      }

      if (glowRef.current) {
        glowRef.current.style.transform = `
          translate(-50%, -50%)
          translate(${moveX * 42}px, ${moveY * 42}px)
          scale(${1 + Math.abs(moveX) * 0.08 + Math.abs(moveY) * 0.08})
        `;
      }

      if (contentRef.current) {
        contentRef.current.style.transform = "";
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [mouse]);

  const handleMouseMove = (e) => {
    setMouse({
      x: e.clientX,
      y: e.clientY,
      active: true,
    });
  };

  const handleMouseLeave = () => {
    setMouse((prev) => ({ ...prev, active: false }));
  };

  const scrollToAbout = () => {
    if (aboutRef.current) {
      aboutRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

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
        padding: "40px 24px 28px",
      }}
    >
      <style>
        {`
          @keyframes landingFloat {
            0% { opacity: 0.14; }
            50% { opacity: 0.24; }
            100% { opacity: 0.14; }
          }

          @keyframes slowRotateA {
            0% { filter: blur(0px); }
            50% { filter: blur(0.4px); }
            100% { filter: blur(0px); }
          }

          @keyframes slowRotateB {
            0% { opacity: 0.75; }
            50% { opacity: 1; }
            100% { opacity: 0.75; }
          }

          @keyframes scanLine {
            0% { transform: translateY(-20%); opacity: 0; }
            10% { opacity: 0.18; }
            90% { opacity: 0.18; }
            100% { transform: translateY(120vh); opacity: 0; }
          }

          @keyframes textEntrance {
            0% { opacity: 0; transform: translateY(18px); }
            100% { opacity: 1; transform: translateY(0); }
          }

          @keyframes logoGlitchA {
            0% { transform: translate(0, 0); clip-path: inset(0 0 0 0); opacity: 0; }
            10% { transform: translate(-3px, 1px); clip-path: inset(8% 0 62% 0); opacity: 0.85; }
            20% { transform: translate(3px, -1px); clip-path: inset(58% 0 8% 0); opacity: 0.7; }
            30% { transform: translate(-2px, 0); clip-path: inset(35% 0 28% 0); opacity: 0.9; }
            40% { transform: translate(2px, 1px); clip-path: inset(15% 0 56% 0); opacity: 0.55; }
            50% { transform: translate(-4px, -1px); clip-path: inset(72% 0 6% 0); opacity: 0.75; }
            60% { transform: translate(1px, 0); clip-path: inset(42% 0 18% 0); opacity: 0.65; }
            100% { transform: translate(0, 0); clip-path: inset(0 0 0 0); opacity: 0; }
          }

          @keyframes logoGlitchB {
            0% { transform: translate(0, 0); clip-path: inset(0 0 0 0); opacity: 0; }
            12% { transform: translate(4px, 0); clip-path: inset(60% 0 12% 0); opacity: 0.65; }
            24% { transform: translate(-3px, 1px); clip-path: inset(12% 0 64% 0); opacity: 0.9; }
            36% { transform: translate(2px, -1px); clip-path: inset(32% 0 24% 0); opacity: 0.75; }
            48% { transform: translate(-2px, 0); clip-path: inset(78% 0 4% 0); opacity: 0.6; }
            60% { transform: translate(3px, 1px); clip-path: inset(22% 0 48% 0); opacity: 0.8; }
            100% { transform: translate(0, 0); clip-path: inset(0 0 0 0); opacity: 0; }
          }

          @keyframes buttonGlow {
            0% { box-shadow: 0 0 0 rgba(255,255,255,0); }
            50% { box-shadow: 0 0 18px rgba(255,255,255,0.08); }
            100% { box-shadow: 0 0 0 rgba(255,255,255,0); }
          }

          @keyframes cardPulse {
            0% { border-color: rgba(255,255,255,0.08); box-shadow: 0 0 0 rgba(255,255,255,0); }
            50% { border-color: rgba(255,255,255,0.18); box-shadow: 0 0 28px rgba(255,255,255,0.08); }
            100% { border-color: rgba(255,255,255,0.08); box-shadow: 0 0 0 rgba(255,255,255,0); }
          }

          @keyframes q1Pulse {
            0% { box-shadow: 0 0 0 rgba(255,255,255,0.10), inset 0 0 0 rgba(255,255,255,0.04); }
            50% { box-shadow: 0 0 38px rgba(255,255,255,0.14), inset 0 0 26px rgba(255,255,255,0.05); }
            100% { box-shadow: 0 0 0 rgba(255,255,255,0.10), inset 0 0 0 rgba(255,255,255,0.04); }
          }

          .wave-ring {
            transition: transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
            will-change: transform;
          }

          .ring-a {
            animation: slowRotateA 6s ease-in-out infinite;
          }

          .ring-b {
            animation: slowRotateB 5s ease-in-out infinite;
          }

          .landing-glow {
            transition: transform 1s cubic-bezier(0.22, 1, 0.36, 1);
            animation: landingFloat 5s ease-in-out infinite;
            will-change: transform;
          }

          .landing-scan {
            animation: scanLine 4.6s linear infinite;
          }

          .landing-enter {
            opacity: 0;
            animation: textEntrance 0.9s ease-out forwards;
          }

          .content-parallax {
            transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
            will-change: transform;
          }

          .glitch-wrap {
            position: relative;
            display: inline-block;
            cursor: default;
          }

          .glitch-base,
          .glitch-layer-a,
          .glitch-layer-b {
            font-family: Orbitron, sans-serif;
            font-size: clamp(36px, 6vw, 72px);
            letter-spacing: 0.22em;
            text-transform: uppercase;
            line-height: 1;
            white-space: nowrap;
          }

          .glitch-base {
            position: relative;
            z-index: 2;
            color: white;
          }

          .glitch-layer-a,
          .glitch-layer-b {
            position: absolute;
            inset: 0;
            pointer-events: none;
            opacity: 0;
          }

          .glitch-layer-a {
            color: rgba(255,255,255,0.98);
            text-shadow: -3px 0 rgba(255,255,255,0.4), 
            0 0 12px rgba(255, 255, 255,0.12);
          }

          .glitch-layer-b {
            color: rgba(255,255,255,0.92);
            text-shadow: 2px 0 rgba(255,255,255,0.28);
          }

          .glitch-wrap.active .glitch-layer-a {
            animation: logoGlitchA 0.65s steps(2, end) infinite;
            opacity: 1;
          }

          .glitch-wrap.active .glitch-layer-b {
            animation: logoGlitchB 0.8s steps(2, end) infinite;
            opacity: 1;
          }

          .explore-btn {
            transition: transform 180ms ease, box-shadow 180ms ease;
            animation: textEntrance 0.9s ease-out forwards, buttonGlow 3s ease-in-out infinite;
          }

          .explore-btn:hover,
          .social-btn:hover,
          .phase-card:hover {
            transform: translateY(-3px);
          }

          .info-card,
          .phase-card,
          .footer-shell {
            background: linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02));
            border: 1px solid rgba(255,255,255,0.08);
            backdrop-filter: blur(8px);
          }

          .phase-card {
            transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
          }
          .phase-card.q1-highlight {
            position: relative;
            border-color: rgba(255,255,255,0.22);
            background: linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03));
            animation: q1Pulse 3s ease-in-out infinite;
            overflow: hidden;
          }

          .phase-card.q1-highlight::before {
            content: "";
            position: absolute;
            inset: -1px;
            border-radius: inherit;
            background: radial-gradient(circle at top center, rgba(255,255,255,0.16), transparent 55%);
            pointer-events: none;
            opacity: 0.9;
          }

          .phase-card:hover,
          .social-btn:hover,
          .info-card:hover {
            border-color: rgba(255,255,255,0.22);
            box-shadow: 0 0 34px rgba(255,255,255,0.09);
          }

          .social-btn {
            width: 46px;
            height: 46px;
            border-radius: 9999px;
            border: 1px solid rgba(255,255,255,0.14);
            background: rgba(255,255,255,0.03);
            display: inline-flex;
            align-items: center;
            justify-content: center;
            color: white;
            transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease, background 180ms ease;
            box-shadow: 0 0 0 rgba(255,255,255,0);
          }

          .social-btn:hover {
            background: rgba(255,255,255,0.07);
            box-shadow: 0 0 26px rgba(255,255,255,0.18);
          }

          .section-heading {
            margin: 0;
            fontFamily: Orbitron, sans-serif;
            fontSize: 'clamp(24px, 3vw, 34px)';
            letterSpacing: 0.18em;
            textTransform: uppercase;
          }

          @media (max-width: 768px) {
            .glitch-base,
            .glitch-layer-a,
            .glitch-layer-b {
              white-space: normal;
              text-align: center;
              line-height: 1.1;
            }
          }
        `}
      </style>

      <NoiseLayer />

      <div
        ref={outerRingRef}
        className="wave-ring ring-a"
        style={{
          position: "absolute",
          left: "50%",
          top: "22%",
          width: 560,
          height: 560,
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
          top: "22%",
          width: 760,
          height: 760,
          transform: "translate(-50%, -50%)",
          border: "1px solid rgba(255,255,255,0.05)",
          borderRadius: "50%",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "100% 4px",
          opacity: 0.18,
          pointerEvents: "none",
        }}
      />

      <div
        ref={contentRef}
        className="content-parallax"
        style={{
          position: "relative",
          zIndex: 3,
          maxWidth: 1180,
          width: "100%",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: 56,
        }}
      >
        <section
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              textAlign: "center",
              padding: "24px",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
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
                maxWidth: 760,
                margin: 0,
                fontSize: 14,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1.8,
                animationDelay: "0.35s",
              }}
            >
              An independent game studio building play-to-learn experiences for the next generation of digital skills.
            </p>
            <div
              className="landing-enter"
              style={{
                animationDelay: "0.5s",
                display: "flex",
                gap: 14,
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 8,
                opacity: 0,
              }}
            >
              <button
                className="explore-btn"
                onClick={scrollToAbout}
                style={{
                  position: "relative",
                  zIndex: 20,
                  padding: "18px 42px",
                  borderRadius: 9999,
                  border: "1px solid rgba(255,255,255,0.35)",
                  background: "rgba(0,0,0,0.88)",
                  color: "white",
                  fontFamily: "Orbitron, sans-serif",
                  fontSize: 14,
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  backdropFilter: "blur(6px)",
                  cursor: "pointer",
                  boxShadow: "0 0 30px rgba(255,255,255,0.08)",
                  minWidth: 220,
                }}
              >
                <span style={{ position: "relative", zIndex: 2 }}>ABOUT US</span>

                <span
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 9999,
                    background:
                      "radial-gradient(circle at center, rgba(255,255,255,0.18), transparent 70%)",
                    opacity: 0.25,
                    pointerEvents: "none",
                  }}
                />
              </button>

              <button
                className="explore-btn"
                onClick={() => setIsJoinOpen(true)}
                style={{
                  position: "relative",
                  zIndex: 20,
                  padding: "18px 42px",
                  borderRadius: 9999,
                  border: "1px solid rgba(255,255,255,0.22)",
                  background: "rgba(255,255,255,0.06)",
                  color: "white",
                  fontFamily: "Orbitron, sans-serif",
                  fontSize: 14,
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  backdropFilter: "blur(6px)",
                  cursor: "pointer",
                  boxShadow: "0 0 30px rgba(255,255,255,0.08)",
                  minWidth: 220,
                }}
              >
                <span style={{ position: "relative", zIndex: 2 }}>JOIN WHITELIST</span>

                <span
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 9999,
                    background:
                      "radial-gradient(circle at center, rgba(255,255,255,0.14), transparent 70%)",
                    opacity: 0.25,
                    pointerEvents: "none",
                  }}
                />
              </button>
            </div>
          </div>
        </section>

        <section
          ref={aboutRef}
          className="landing-enter"
          style={{
            animationDelay: "0.2s",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
            alignItems: "stretch",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              justifyContent: "center",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: 12,
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.46)",
              }}
            >
              About Us
            </p>
            <h2
              style={{
                margin: 0,
                fontFamily: "Orbitron, sans-serif",
                fontSize: "clamp(24px, 3vw, 34px)",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                lineHeight: 1.3,
              }}
            >
              An independent Swiss game studio building a play-to-learn future.
            </h2>
            <p
              style={{
                margin: 0,
                color: "rgba(255,255,255,0.68)",
                lineHeight: 1.9,
                fontSize: 15,
                maxWidth: 620,
              }}
            >
              RADE MACHINE is building a platform where players learn by playing. We create games that turn curiosity into real digital skills, with our first focus areas centered on cybersecurity, game development, and blockchain technology.
            </p>
          </div>

          <div
            className="info-card"
            style={{
              borderRadius: 28,
              padding: 28,
              display: "grid",
              gap: 18,
            }}
          >
            {[
              ["Play To Learn", "Our games are built to make learning feel interactive, rewarding, and immersive."],
              ["Digital Skill Focus", "We are currently focused on cybersecurity, gamedev, and blockchain as the first core academy tracks."],
              ["Built In Switzerland", "Independent studio mindset, global ambition, and a long-term mission to make digital education more engaging."],
            ].map(([label, text]) => (
              <div
                key={label}
                style={{
                  paddingBottom: 14,
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div
                  style={{
                    fontFamily: "Orbitron, sans-serif",
                    fontSize: 12,
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                    color: "white",
                    marginBottom: 8,
                  }}
                >
                  {label}
                </div>
                <div
                  style={{
                    color: "rgba(255,255,255,0.62)",
                    lineHeight: 1.7,
                    fontSize: 14,
                  }}
                >
                  {text}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="landing-enter" style={{ animationDelay: "0.3s", display: "grid", gap: 24 }}>
          <div style={{ display: "grid", gap: 12, textAlign: "center", justifyItems: "center" }}>
            <p
              style={{
                margin: 0,
                fontSize: 12,
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.46)",
              }}
            >
              Roadmap
            </p>
            <h2
              style={{
                margin: 0,
                fontFamily: "Orbitron, sans-serif",
                fontSize: "clamp(24px, 3vw, 34px)",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              Build the platform. Launch the games. Expand the academy.
            </h2>
            <p
              style={{
                maxWidth: 700,
                margin: 0,
                color: "rgba(255,255,255,0.62)",
                lineHeight: 1.8,
                fontSize: 15,
              }}
            >
              Our roadmap begins with early whitelist access, continues with the first mobile game launch, and then expands into multiplayer systems and RM-Academy as the foundation of the full play-to-learn ecosystem.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 20,
            }}
          >
            {roadmapPhases.map((item, index) => (
              <div
                key={item.phase}
                className={`phase-card ${item.phase === "Q1" ? "q1-highlight" : ""}`}
                style={{
                  borderRadius: 24,
                  padding: 24,
                  display: "grid",
                  gap: 18,
                  animationDelay: `${index * 0.25}s`,
                }}
              >
                <div style={{ display: "grid", gap: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                    <span
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 9999,
                        border: "1px solid rgba(255,255,255,0.1)",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "rgba(255,255,255,0.74)",
                        fontSize: 14,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        fontFamily: "Orbitron, sans-serif",
                        flexShrink: 0,
                      }}
                    >
                      {item.phase}
                    </span>

                    {item.phase === "Q1" && (
                      <span
                        style={{
                          padding: "7px 12px",
                          borderRadius: 9999,
                          border: "1px solid rgba(255,255,255,0.18)",
                          background: "rgba(255,255,255,0.07)",
                          color: "white",
                          fontSize: 10,
                          letterSpacing: "0.3em",
                          textTransform: "uppercase",
                          fontFamily: "Orbitron, sans-serif",
                          boxShadow: "0 0 18px rgba(255,255,255,0.12)",
                          height: 30,
                          display: "inline-flex",
                          alignItems: "center",
                        }}
                      >
                        Live Now
                      </span>
                    )}
                  </div>

                  <h3
                    style={{
                      margin: 0,
                      fontFamily: "Orbitron, sans-serif",
                      fontSize: 18,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
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
                        display: "grid",
                        gridTemplateColumns: "10px 1fr",
                        gap: 12,
                        alignItems: "start",
                        color: "rgba(255,255,255,0.64)",
                        fontSize: 14,
                        lineHeight: 1.7,
                      }}
                    >
                      <span
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: "rgba(255,255,255,0.85)",
                          marginTop: 9,
                          boxShadow: item.phase === "Q1" ? "0 0 14px rgba(255,255,255,0.22)" : "none",
                        }}
                      />
                      <span>{point}</span>
                    </div>
                  ))}

                  {item.phase === "Q1" && (
                    <button
                      onClick={openJoinModal}
                      style={{
                        marginTop: 10,
                        padding: "14px 20px",
                        borderRadius: 9999,
                        border: "1px solid rgba(255,255,255,0.22)",
                        background: "rgba(255,255,255,0.06)",
                        color: "white",
                        fontFamily: "Orbitron, sans-serif",
                        fontSize: 12,
                        letterSpacing: "0.24em",
                        textTransform: "uppercase",
                        cursor: "pointer",
                        width: "fit-content",
                        boxShadow: "0 0 20px rgba(255,255,255,0.08)",
                      }}
                    >
                      Join Whitelist
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
            
        <footer
          className="footer-shell landing-enter"
          style={{
            animationDelay: "0.4s",
            borderRadius: 28,
            padding: "20px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 20,
            flexWrap: "wrap",
            marginTop: 10,
          }}
        >
          <div style={{ display: "grid", gap: 6 }}>
            <span
              style={{
                fontFamily: "Orbitron, sans-serif",
                fontSize: 12,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.8)",
              }}
            >
              © 2026 RADE MACHINE
            </span>
            <span style={{ color: "rgba(255,255,255,0.52)", fontSize: 13, letterSpacing: "0.08em" }}>
              COMING SOON
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
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
        </footer>
        {isJoinOpen &&
  createPortal(
    <div
      ref={joinOverlayRef}
      onClick={closeJoinModal}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.72)",
        backdropFilter: "blur(8px)",
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        overflowY: "auto",
        padding: "16px",
        boxSizing: "border-box",
      }}
    >
      <div
        ref={joinModalRef}
        onClick={(e) => e.stopPropagation()}
        className="info-card"
        style={{
          width: "100%",
          maxWidth: 520,
          borderRadius: 28,
          padding: 28,
          display: "grid",
          gap: 18,
          boxShadow: "0 0 40px rgba(255,255,255,0.08)",
          margin: "24px auto",
          maxHeight: "calc(100dvh - 32px)",
          overflowY: "auto",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 16,
            alignItems: "flex-start",
          }}
        >
          <div style={{ display: "grid", gap: 10 }}>
            <h3
              style={{
                margin: 0,
                fontFamily: "Orbitron, sans-serif",
                fontSize: "clamp(22px, 3vw, 30px)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Join The Early Whitelist
            </h3>
          </div>

          <button
            onClick={closeJoinModal}
            type="button"
            style={{
              width: 40,
              height: 40,
              borderRadius: 9999,
              border: "1px solid rgba(255,255,255,0.14)",
              background: "rgba(255,255,255,0.03)",
              color: "white",
              cursor: "pointer",
              fontSize: 18,
              flexShrink: 0,
            }}
          >
            ×
          </button>
        </div>

        <p
          style={{
            margin: 0,
            color: "rgba(255,255,255,0.64)",
            lineHeight: 1.8,
            fontSize: 14,
          }}
        >
          Enter your email to join the early whitelist for RADE MACHINE and get
          notified about upcoming access.
        </p>

        <form
          action="https://formspree.io/f/mkoqzajg"
          method="POST"
          style={{ display: "grid", gap: 14 }}
        >
          <input
            ref={joinInputRef}
            type="email"
            name="email"
            required
            placeholder="Enter your email"
            style={{
              width: "100%",
              padding: "16px 18px",
              borderRadius: 18,
              border: "1px solid rgba(255,255,255,0.14)",
              background: "rgba(255,255,255,0.03)",
              color: "white",
              outline: "none",
              fontSize: 14,
              boxSizing: "border-box",
            }}
          />

          <button
            type="submit"
            style={{
              padding: "16px 20px",
              borderRadius: 9999,
              border: "1px solid rgba(255,255,255,0.24)",
              background: "rgba(255,255,255,0.08)",
              color: "white",
              fontFamily: "Orbitron, sans-serif",
              fontSize: 12,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              cursor: "pointer",
              boxShadow: "0 0 24px rgba(255,255,255,0.08)",
            }}
          >
            Join
          </button>
        </form>
      </div>
    </div>,
    document.body
  )}
      </div>
    </div>
  );
}
