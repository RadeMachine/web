import { useEffect } from "react";

export default function PortalScene({ onComplete }) {
  useEffect(() => {
    const t = setTimeout(() => {
      onComplete?.();
    }, 4200);

    return () => clearTimeout(t);
  }, [onComplete]);

  const rings = Array.from({ length: 16 }, (_, i) => i);
  const particles = Array.from({ length: 26 }, (_, i) => i);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "black",
        color: "white",
        display: "grid",
        placeItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>
        {`
          @keyframes portalFadeIn {
            0% { opacity: 0; transform: scale(1.06); }
            100% { opacity: 1; transform: scale(1); }
          }

          @keyframes tunnelPush {
            0% {
              transform: translate(-50%, -50%) scale(0.15);
              opacity: 0;
            }
            12% {
              opacity: 0.9;
            }
            100% {
              transform: translate(-50%, -50%) scale(2.4);
              opacity: 0;
            }
          }

          @keyframes corePulse {
            0% { transform: translate(-50%, -50%) scale(0.9); opacity: 0.45; }
            50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.95; }
            100% { transform: translate(-50%, -50%) scale(0.9); opacity: 0.45; }
          }

          @keyframes glowBreath {
            0% { opacity: 0.16; transform: translate(-50%, -50%) scale(0.9); }
            50% { opacity: 0.4; transform: translate(-50%, -50%) scale(1.12); }
            100% { opacity: 0.16; transform: translate(-50%, -50%) scale(0.9); }
          }

          @keyframes particleFly {
            0% {
              transform: translate3d(var(--x), var(--y), 0) scale(0.2);
              opacity: 0;
            }
            15% {
              opacity: 0.9;
            }
            100% {
              transform: translate3d(calc(var(--x) * 2.8), calc(var(--y) * 2.8), 0) scale(1.2);
              opacity: 0;
            }
          }

          @keyframes textReveal {
            0% { opacity: 0; transform: translateY(24px); }
            100% { opacity: 1; transform: translateY(0); }
          }

          @keyframes vignettePulse {
            0% { opacity: 0.45; }
            50% { opacity: 0.62; }
            100% { opacity: 0.45; }
          }

          @keyframes finalPush {
            0% { transform: scale(1); opacity: 1; filter: blur(0px); }
            100% { transform: scale(1.16); opacity: 0; filter: blur(8px); }
          }

          .portal-scene {
            animation: portalFadeIn 0.9s ease-out;
          }

          .portal-final-push {
            animation: finalPush 0.9s ease-in forwards;
            animation-delay: 3.15s;
          }
        `}
      </style>

      <div
        className="portal-scene portal-final-push"
        style={{
          position: "absolute",
          inset: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at center, rgba(255,255,255,0.05), transparent 28%, transparent 100%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at center, transparent 0%, transparent 32%, rgba(0,0,0,0.55) 72%, rgba(0,0,0,0.92) 100%)",
            animation: "vignettePulse 2.8s ease-in-out infinite",
          }}
        />

        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 320,
            height: 320,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.08)",
            filter: "blur(70px)",
            transform: "translate(-50%, -50%)",
            animation: "glowBreath 2.2s ease-in-out infinite",
          }}
        />

        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 86,
            height: 86,
            borderRadius: "50%",
            background: "white",
            filter: "blur(10px)",
            transform: "translate(-50%, -50%)",
            animation: "corePulse 1.8s ease-in-out infinite",
            boxShadow: "0 0 60px rgba(255,255,255,0.35)",
          }}
        />

        {rings.map((ring) => (
          <div
            key={ring}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: 150 + ring * 36,
              height: 150 + ring * 36,
              borderRadius: "50%",
              border: ring % 2 === 0
                ? "1px solid rgba(255,255,255,0.30)"
                : "1px solid rgba(255,255,255,0.12)",
              boxShadow:
                ring % 3 === 0
                  ? "0 0 24px rgba(255,255,255,0.08)"
                  : "none",
              transform: "translate(-50%, -50%) scale(0.15)",
              animation: `tunnelPush 1.9s ease-out infinite`,
              animationDelay: `${ring * 0.12}s`,
            }}
          />
        ))}

        {particles.map((p) => {
          const angle = (p / particles.length) * Math.PI * 2;
          const radius = 40 + (p % 7) * 18;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <div
              key={p}
              style={{
                "--x": `${x}px`,
                "--y": `${y}px`,
                position: "absolute",
                left: "50%",
                top: "50%",
                width: p % 4 === 0 ? 3 : 2,
                height: p % 4 === 0 ? 3 : 2,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.95)",
                boxShadow: "0 0 12px rgba(255,255,255,0.4)",
                animation: `particleFly ${1.2 + (p % 5) * 0.25}s linear infinite`,
                animationDelay: `${p * 0.08}s`,
              }}
            />
          );
        })}

        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: "140vw",
            height: 220,
            transform: "translate(-50%, -50%) perspective(600px) rotateX(78deg)",
            borderTop: "1px solid rgba(255,255,255,0.18)",
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.08), transparent 45%)",
            opacity: 0.35,
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            opacity: 0.18,
            transform: "perspective(700px) rotateX(70deg) translateY(32%) scale(1.4)",
            transformOrigin: "center center",
          }}
        />
      </div>

      <div
  style={{
    position: "absolute",
    top: "60%",
    transform: "translateX(-50%)",
    zIndex: 5,
    textAlign: "center",
    animation: "textReveal 1s ease-out forwards",
    animationDelay: "0.35s",
    opacity: 0,
    width: "100%",
    padding: "0 24px",
    boxSizing: "border-box",
  }}
>
  <p
    style={{
      margin: 0,
      fontSize: 12,
      letterSpacing: "0.55em",
      textTransform: "uppercase",
      color: "rgba(255,255,255,0.65)",
    }}
  >
    Initializing
  </p>
</div>
    </div>
  );
}