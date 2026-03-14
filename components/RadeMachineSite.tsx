"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const GRID = 20;
const CELL = 20;
const BASE_SIZE = GRID * CELL;
const START_SPEED = 160;
const MIN_SPEED = 55;
const SPEED_STEP = 8;
const SWIPE_THRESHOLD = 24;

const FORMSPREE = "https://formspree.io/f/mkoqzajg";

type CellType = {
  x: number;
  y: number;
};

type RippleType = {
  id: number;
  x: number;
  y: number;
};

function getRandomFood(snake: CellType[]): CellType {
  while (true) {
    const food = {
      x: Math.floor(Math.random() * GRID),
      y: Math.floor(Math.random() * GRID),
    };

    const isOnSnake = snake.some(
      (segment) => segment.x === food.x && segment.y === food.y
    );

    if (!isOnSnake) return food;
  }
}

function drawStar(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  spikes: number,
  outerRadius: number,
  innerRadius: number
) {
  let rotation = (Math.PI / 2) * 3;
  const step = Math.PI / spikes;

  ctx.beginPath();
  ctx.moveTo(centerX, centerY - outerRadius);

  for (let i = 0; i < spikes; i++) {
    let x = centerX + Math.cos(rotation) * outerRadius;
    let y = centerY + Math.sin(rotation) * outerRadius;
    ctx.lineTo(x, y);
    rotation += step;

    x = centerX + Math.cos(rotation) * innerRadius;
    y = centerY + Math.sin(rotation) * innerRadius;
    ctx.lineTo(x, y);
    rotation += step;
  }

  ctx.lineTo(centerX, centerY - outerRadius);
  ctx.closePath();
}

export default function RadeMachineSite() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const popupAlreadyShownThisSessionRef = useRef(false);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const [snake, setSnake] = useState<CellType[]>([
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 },
  ]);
  const [dir, setDir] = useState<CellType>({ x: 1, y: 0 });
  const [food, setFood] = useState<CellType>({ x: 5, y: 5 });
  const [score, setScore] = useState<number>(0);
  const [bestScore, setBestScore] = useState<number>(0);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [speed, setSpeed] = useState<number>(START_SPEED);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [joined, setJoined] = useState<boolean>(false);
  
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState<RippleType[]>([]);
  const [useCustomCursor, setUseCustomCursor] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  
  const boardSize = useMemo(() => {
    if (typeof window === "undefined") return BASE_SIZE;
    const viewportWidth = window.innerWidth;
    const horizontalPadding = 32;
    const maxWidth = Math.min(BASE_SIZE, viewportWidth - horizontalPadding);
    return Math.max(280, maxWidth);
  }, []);

  function resetGame() {
    const freshSnake = [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 },
    ];

    setSnake(freshSnake);
    setDir({ x: 1, y: 0 });
    setFood(getRandomFood(freshSnake));
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
    setShowForm(false);
    setSpeed(START_SPEED);
  }

  function playAgainFromPopup() {
    const freshSnake = [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 },
    ];

    setSnake(freshSnake);
    setDir({ x: 1, y: 0 });
    setFood(getRandomFood(freshSnake));
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
    setShowForm(false);
    setSpeed(START_SPEED);
  }

  function changeDirection(nextDir: CellType) {
    if (!isPlaying || showForm) return;

    if (nextDir.x === 0 && nextDir.y === -1 && dir.y !== 1) {
      setDir(nextDir);
    }
    if (nextDir.x === 0 && nextDir.y === 1 && dir.y !== -1) {
      setDir(nextDir);
    }
    if (nextDir.x === -1 && nextDir.y === 0 && dir.x !== 1) {
      setDir(nextDir);
    }
    if (nextDir.x === 1 && nextDir.y === 0 && dir.x !== -1) {
      setDir(nextDir);
    }
  }

  useEffect(() => {
    if (typeof window === "undefined") return;
  
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
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("click", handleClick);
    
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("click", handleClick);
    };
    }, [useCustomCursor]);
  
    const handleMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };
  
    const handleClick = (e: MouseEvent) => {
      const newRipple: RippleType = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
      };
  
      setRipples((prev) => [...prev, newRipple]);
    };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") changeDirection({ x: 0, y: -1 });
      if (e.key === "ArrowDown") changeDirection({ x: 0, y: 1 });
      if (e.key === "ArrowLeft") changeDirection({ x: -1, y: 0 });
      if (e.key === "ArrowRight") changeDirection({ x: 1, y: 0 });
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [dir, isPlaying, showForm]);

  useEffect(() => {
    if (!isPlaying || showForm) return;

    const game = window.setInterval(() => {
      setSnake((prev) => {
        const head = {
          x: prev[0].x + dir.x,
          y: prev[0].y + dir.y,
        };

        const hitWall =
          head.x < 0 || head.y < 0 || head.x >= GRID || head.y >= GRID;

        const hitSelf = prev.some(
          (segment) => segment.x === head.x && segment.y === head.y
        );

        if (hitWall || hitSelf) {
          setGameOver(true);
          setIsPlaying(false);
          setScore(0);
          setSpeed(START_SPEED);
          return [
            { x: 10, y: 10 },
            { x: 9, y: 10 },
            { x: 8, y: 10 },
          ];
        }

        const newSnake = [head, ...prev];

        if (head.x === food.x && head.y === food.y) {
          setScore((s) => {
            const newScore = s + 1;
            setBestScore((best) => Math.max(best, newScore));

            if (newScore >= 10 && !popupAlreadyShownThisSessionRef.current) {
              popupAlreadyShownThisSessionRef.current = true;
              setShowForm(true);
              setIsPlaying(false);
            } else {
              setSpeed((current) => Math.max(MIN_SPEED, current - SPEED_STEP));
            }

            return newScore;
          });

          setFood(getRandomFood(newSnake));
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, speed);

    return () => window.clearInterval(game);
  }, [dir, food, isPlaying, showForm, speed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, BASE_SIZE, BASE_SIZE);

    const gradient = ctx.createLinearGradient(0, 0, BASE_SIZE, BASE_SIZE);
    gradient.addColorStop(0, "#050505");
    gradient.addColorStop(1, "#000000");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, BASE_SIZE, BASE_SIZE);

    for (let x = 0; x < GRID; x++) {
      for (let y = 0; y < GRID; y++) {
        ctx.strokeStyle = "rgba(255,255,255,0.05)";
        ctx.strokeRect(x * CELL, y * CELL, CELL, CELL);
      }
    }

    snake.forEach((segment, index) => {
      const px = segment.x * CELL;
      const py = segment.y * CELL;

      ctx.save();
      ctx.shadowColor = "white";
      ctx.shadowBlur = index === 0 ? 16 : 8;
      ctx.fillStyle = index === 0 ? "#ffffff" : "rgba(255,255,255,0.86)";
      ctx.fillRect(px + 2, py + 2, CELL - 4, CELL - 4);
      ctx.restore();
    });

    const starX = food.x * CELL + CELL / 2;
    const starY = food.y * CELL + CELL / 2;

    ctx.save();
    ctx.shadowColor = "white";
    ctx.shadowBlur = 22;
    ctx.fillStyle = "white";
    drawStar(ctx, starX, starY, 5, 8, 4);
    ctx.fill();
    ctx.restore();
  }, [snake, food]);

  useEffect(() => {
    if (ripples.length === 0) return;

    const timeout = setTimeout(() => {
      setRipples((prev) => prev.slice(1));
    }, 500);

    return () => clearTimeout(timeout);
  }, [ripples]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch(FORMSPREE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email,
          score: bestScore,
          project: "Rade Machine whitelist",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit email");
      }

      setJoined(true);
      setEmail("");
    } catch {
      alert("Could not submit email. Check your Formspree form ID.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleTouchStart(e: React.TouchEvent<HTMLDivElement>) {
    const touch = e.touches[0];
    if (!touch) return;

    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
    };
  }

  function handleTouchEnd(e: React.TouchEvent<HTMLDivElement>) {
    const start = touchStartRef.current;
    const touch = e.changedTouches[0];

    if (!start || !touch) return;

    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;

    if (Math.abs(dx) < SWIPE_THRESHOLD && Math.abs(dy) < SWIPE_THRESHOLD) {
      touchStartRef.current = null;
      return;
    }

    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > 0) changeDirection({ x: 1, y: 0 });
      else changeDirection({ x: -1, y: 0 });
    } else {
      if (dy > 0) changeDirection({ x: 0, y: 1 });
      else changeDirection({ x: 0, y: -1 });
    }

    touchStartRef.current = null;
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black px-4 py-8 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_45%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:36px_36px]" />

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
          {ripples.map((ripple) => (
            <span
              key={ripple.id}
              className="pointer-events-none fixed z-30 block h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/60 animate-ping"
              style={{ left: ripple.x, top: ripple.y }}
            />
          ))}
        </>
      )}

      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center">
        <div className="mb-6 text-center md:mb-8">
          <h1
            className="text-4xl font-black uppercase tracking-[0.22em] sm:text-5xl md:text-7xl md:tracking-[0.35em]"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            RADE MACHINE
          </h1>
          <p className="mt-4 text-xs uppercase tracking-[0.18em] text-white/55 sm:text-sm md:text-base md:tracking-[0.25em]">
            Collect 10 glowing stars to unlock the whitelist
          </p>
        </div>

        <div className="mb-5 flex flex-wrap items-center justify-center gap-3 md:mb-6">
          <div className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.16em] text-white/70 backdrop-blur-sm sm:text-sm">
            Score: {score} / 10
          </div>
          <div className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.16em] text-white/70 backdrop-blur-sm sm:text-sm">
            Best: {bestScore}
          </div>
          <div className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.16em] text-white/70 backdrop-blur-sm sm:text-sm">
            Speed: {Math.round((START_SPEED / speed) * 100)}%
          </div>
        </div>

        {!showForm && (
          <>
            <div
              className="rounded-[28px] border border-white/15 bg-white/[0.03] p-3 shadow-[0_0_80px_rgba(255,255,255,0.07)] backdrop-blur-md md:p-4"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <canvas
                ref={canvasRef}
                width={BASE_SIZE}
                height={BASE_SIZE}
                className="block rounded-2xl border border-white/15 bg-black touch-none"
                style={{ width: boardSize, height: boardSize, maxWidth: "100%" }}
              />
            </div>

            <p className="mt-4 text-center text-xs uppercase tracking-[0.16em] text-white/45 sm:text-sm">
              {isMobileDevice ? "Swipe on the board to move" : "Use arrow keys to move"}
            </p>

            {gameOver && (
              <div className="mt-6 flex flex-col items-center gap-3">
                <p className="text-center text-base uppercase tracking-[0.16em] text-white/80 md:text-lg md:tracking-[0.18em]">
                  Game over. You hit the wall.
                </p>
                <button
                  type="button"
                  onClick={resetGame}
                  className="rounded-full border border-white px-6 py-3 text-sm uppercase tracking-[0.22em] transition duration-200 hover:bg-white hover:text-black"
                >
                  Restart
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/90 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-[28px] border border-white/15 bg-black/90 p-6 shadow-[0_0_100px_rgba(255,255,255,0.08)] sm:p-8">
            {!joined ? (
              <form onSubmit={submit} className="flex flex-col gap-4">
                <h2
                  className="text-2xl font-black uppercase tracking-[0.14em] sm:text-3xl sm:tracking-[0.18em]"
                  style={{ fontFamily: "var(--font-orbitron)" }}
                >
                  Join Whitelist
                </h2>

                <p className="text-xs uppercase tracking-[0.12em] text-white/55 sm:text-sm sm:tracking-[0.15em]">
                  You reached 10 points. Enter your email or continue playing.
                </p>

                <input
                  className="rounded-full border border-white/20 bg-white/[0.03] px-5 py-3 text-white outline-none placeholder:text-white/30"
                  placeholder="email@rademachine.com"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-full border border-white bg-white px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-black hover:text-white disabled:opacity-50"
                >
                  {submitting ? "Joining..." : "Join"}
                </button>

                <button
                  type="button"
                  onClick={playAgainFromPopup}
                  className="rounded-full border border-white px-5 py-3 text-sm uppercase tracking-[0.18em] transition hover:bg-white hover:text-black"
                >
                  Play Again
                </button>
              </form>
            ) : (
              <div className="flex flex-col gap-4">
                <h2
                  className="text-2xl font-black uppercase tracking-[0.14em] sm:text-3xl sm:tracking-[0.18em]"
                  style={{ fontFamily: "var(--font-orbitron)" }}
                >
                  You joined
                </h2>

                <p className="text-xs uppercase tracking-[0.12em] text-white/55 sm:text-sm sm:tracking-[0.15em]">
                  Nice run. Your best score was {bestScore}.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setJoined(false);
                    playAgainFromPopup();
                  }}
                  className="rounded-full border border-white px-5 py-3 text-sm uppercase tracking-[0.18em] transition hover:bg-white hover:text-black"
                >
                  Play Again
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
