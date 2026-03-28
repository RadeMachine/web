import { useState } from "react";
import PortalScene from "./components/PortalScene";
import Landing from "./components/Landing";

export default function App() {
  const [screen, setScreen] = useState("portal");
  const [points, setPoints] = useState(0);
  

  return (
    <div>
      {screen === "portal" && (
        <PortalScene onComplete={() => setScreen("landing")} />
      )}

      {screen === "landing" && (
        <Landing onExplore={() => setScreen("avatar")} />
      )}

    </div>
  );
}