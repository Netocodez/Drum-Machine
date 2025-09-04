import React, { useEffect, useState } from "react";

type Pad = {
  key: string;
  id: string;
  url: string;
  name: string;
};

export default function DrumMachine() {
  const [display, setDisplay] = useState("Ready");

  const pads: Pad[] = [
    { key: "Q", id: "Heater-1", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3", name: "Heater 1" },
    { key: "W", id: "Heater-2", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3", name: "Heater 2" },
    { key: "E", id: "Heater-3", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3", name: "Heater 3" },
    { key: "A", id: "Heater-4", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3", name: "Heater 4" },
    { key: "S", id: "Clap", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3", name: "Clap" },
    { key: "D", id: "Open-HH", url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3", name: "Open-HH" },
    { key: "Z", id: "Kick-n'-Hat", url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3", name: "Kick-n'-Hat" },
    { key: "X", id: "Kick", url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3", name: "Kick" },
    { key: "C", id: "Closed-HH", url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3", name: "Closed-HH" },
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      const pad = pads.find((p) => p.key === key);
      if (pad) {
        playSound(key, pad.name);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [pads]);

  const playSound = (key: string, name: string) => {
    const audio = document.getElementById(key) as HTMLAudioElement | null;
    if (!audio) return;
    audio.currentTime = 0;
    audio.play().catch(() => {});
    setDisplay(name);

    // Add temporary pressed style
    const padEl = audio.parentElement;
    if (padEl) {
      padEl.classList.add("active");
      setTimeout(() => padEl.classList.remove("active"), 150);
    }
  };

  return (
    <div
      id="drum-machine"
      className="min-vh-100 d-flex justify-content-center align-items-center bg-dark"
    >
      <div className="container bg-secondary rounded-4 shadow-lg p-4">
        <h1 className="text-center text-light mb-4">🎛️ Drum Machine</h1>
        <div className="row">
          <div className="col-md-8">
            <div className="row g-3">
              {pads.map((pad) => (
                <div className="col-4" key={pad.key}>
                  <button
                    id={pad.id}
                    className="drum-pad btn btn-outline-light w-100 py-4 fs-3 fw-bold rounded-4"
                    onClick={() => playSound(pad.key, pad.name)}
                  >
                    {pad.key}
                    <audio
                      className="clip"
                      id={pad.key}
                      src={pad.url}
                      preload="auto"
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-4 d-flex flex-column justify-content-center">
            <div
              id="display"
              className="bg-dark text-success text-center fs-5 p-3 rounded border border-success"
            >
              {display}
            </div>
          </div>
        </div>
        <p className="text-center text-light mt-4 small">
          Click pads or press keys Q W E A S D Z X C
        </p>
      </div>
    </div>
  );
}
