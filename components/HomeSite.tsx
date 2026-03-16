"use client";
import Link from "next/link";
import { useEffect, useState } from "react";




export default function HomeSite() {
    
const [mouse, setMouse] = useState({ x: 0, y: 0 });
const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
const [useCustomCursor, setUseCustomCursor] = useState(false);
const [isMobileDevice, setIsMobileDevice] = useState(false);

useEffect(() => {
    const updateDeviceMode = () => {
        const width = window.innerWidth;
        const mobile = width < 768;

        setIsMobileDevice(mobile);
        setUseCustomCursor(!mobile);
    };

    updateDeviceMode();
    window.addEventListener("resize", updateDeviceMode);

    return () => window.removeEventListener("resize", updateDeviceMode);
    }, []);

    useEffect(() => {
    if (!useCustomCursor) return;

    const handleMove = (e: MouseEvent) => {
        setMouse({ x: e.clientX, y: e.clientY });
    };

    const handleClick = (e: MouseEvent) => {
        const ripple = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        };

        setRipples((prev) => [...prev, ripple]);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("click", handleClick);

    return () => {
        window.removeEventListener("mousemove", handleMove);
        window.removeEventListener("click", handleClick);
    };
    }, [useCustomCursor]);

    useEffect(() => {
    if (ripples.length === 0) return;

    const timeout = setTimeout(() => {
        setRipples((prev) => prev.slice(1));
    }, 500);

    return () => clearTimeout(timeout);
    }, [ripples]);
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-4 py-8 text-white">
        {useCustomCursor && (
        <>
            <div
            className="pointer-events-none fixed z-50 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white bg-black shadow-[0_0_18px_rgba(255,255,255,0.7)]"
            style={{ left: mouse.x, top: mouse.y }}
            />

            <div
            className="pointer-events-none fixed z-40 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-white/5 blur-xl"
            style={{ left: mouse.x, top: mouse.y }}
            />

            {ripples.map((r) => (
            <span
                key={r.id}
                className="pointer-events-none fixed z-30 block h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/60 animate-ping"
                style={{ left: r.x, top: r.y }}
            />
            ))}
        </>
        )}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_45%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:36px_36px]" />

      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center text-center">
        <div className="rounded-[32px] border border-white/15 bg-white/[0.03] px-8 py-12 shadow-[0_0_100px_rgba(255,255,255,0.08)] backdrop-blur-md sm:px-12 sm:py-16">
          
          <div className="mb-6 inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-white/60 sm:text-xs">
            RADE MACHINE
          </div>
          <div className="glitch">
            Glitch text
          </div>

{/* 
          <div className="relative inline-block overflow-visible">
        <h1
            className="relative z-10 text-4xl font-black uppercase tracking-[0.18em] sm:text-6xl md:text-7xl md:tracking-[0.28em]"
            style={{ fontFamily: "var(--font-orbitron)" }}
        >
            Coming Soon
        </h1>

        <h1
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 z-20 text-4xl font-black uppercase tracking-[0.18em] text-white/70 glitch-layer-1 sm:text-6xl md:text-7xl md:tracking-[0.28em]"
            style={{ fontFamily: "var(--font-orbitron)" }}
        >
            Coming Soon
        </h1>

        <h1
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 z-20 text-4xl font-black uppercase tracking-[0.18em] text-white/40 glitch-layer-2 sm:text-6xl md:text-7xl md:tracking-[0.28em]"
            style={{ fontFamily: "var(--font-orbitron)" }}
        >
            Coming Soon
        </h1> 
        </div> */}

          <p className="mx-auto mt-6 max-w-2xl text-sm uppercase tracking-[0.16em] text-white/55 sm:text-base md:text-lg">
            We are an independent game studio currently developing our first project.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/whitelist" className="rounded-full border border-white bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-black hover:text-white">
            Enter Whitelist
            </Link>

            <button
              type="button"
              className="rounded-full border border-white px-6 py-3 text-sm uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-black"
            >
              Launching Soon
            </button>
          </div>

          <div className="mt-10 grid w-full gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-5">
              <p className="text-[10px] uppercase tracking-[0.24em] text-white/40 sm:text-xs">
                Status
              </p>
              <p className="mt-2 text-sm uppercase tracking-[0.16em] text-white/85 sm:text-base">
                Building
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-5">
              <p className="text-[10px] uppercase tracking-[0.24em] text-white/40 sm:text-xs">
                Access
              </p>
              <p className="mt-2 text-sm uppercase tracking-[0.16em] text-white/85 sm:text-base">
                Early Whitelist
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-5">
              <p className="text-[10px] uppercase tracking-[0.24em] text-white/40 sm:text-xs">
                Mode
              </p>
              <p className="mt-2 text-sm uppercase tracking-[0.16em] text-white/85 sm:text-base">
                Experimental
              </p>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}