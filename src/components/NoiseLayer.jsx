export default function NoiseLayer() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        opacity: 0.18,
        backgroundImage:
          "linear-gradient(to bottom, rgba(255,255,255,0.04), transparent, rgba(255,255,255,0.03))",
      }}
    />
  );
}