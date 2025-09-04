
# Drum Machine

A simple React + TypeScript drum machine built for the FreeCodeCamp Frontend Libraries curriculum. Click pads or press the keyboard to play drum sounds.


## Features

- 9 Drum Pads – Trigger sounds by clicking or pressing keys Q W E A S D Z X C.
- Keyboard Support – Plays the same sounds when keys are pressed.
- Live Display – Shows the name of the currently played sound.
- Pressed Animation – Pads briefly highlight when activated.
- Bootstrap Styling – Uses Bootstrap classes for responsive layout and styling.


## Demo

[https://netocodez.github.io/Drum-Machine/](https://netocodez.github.io/Drum-Machine/)


## Installation

```bash
# Clone this repository
git clone https://github.com/Netocodez/Drum-Machine.git

# Go into the repository
cd drum-machine

# Install dependencies
npm install

# Run the development server
npm start

```
Then open http://localhost:3000
 to see it in the browser.
    
## Project Logic

This document explains how the Drum Machine React component works under the hood so that other developers can maintain or extend it.

1. ### Component Overview
The project consists mainly of a single functional component:

`export default function DrumMachine() { … }`

It renders:
- A grid of 9 drum pads (buttons + audio elements).
- A display box that shows the name of the sound being played.
- It uses React hooks (useState and useEffect) for state and side effects.

2. ### Data Model
The list of pads is defined once:
```
type Pad = {
  key: string;
  id: string;
  url: string;
  name: string;
};

const pads: Pad[] = [ … ];
```

- key – The keyboard key that triggers the pad (Q, W, E…).
- id – The button’s id (needed for FCC test suite).
- url – URL of the audio file to load.
- name – The display name shown in the display panel.

Using a typed array means the pad buttons and their keyboard mapping are all driven by this single source of truth.

3. ### State Management
`const [display, setDisplay] = useState("Ready");`
- display holds the string displayed in the right-hand panel.
- Updated every time a pad is triggered.

4. ### Keyboard Event Handling
In useEffect:
```
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    const key = e.key.toUpperCase();
    const pad = pads.find((p) => p.key === key);
    if (pad) playSound(key, pad.name);
  };

  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
}, [pads]);
```
- Registers a global keydown listener when the component mounts.
- Converts the pressed key to uppercase and finds the matching pad.
- Calls playSound for the matching pad.
- Cleans up the listener on unmount.

This gives full keyboard support.

5. ### Playing Sounds
```
const playSound = (key: string, name: string) => {
  const audio = document.getElementById(key) as HTMLAudioElement | null;
  if (!audio) return;
  audio.currentTime = 0;        // restart from the beginning
  audio.play().catch(() => {}); // play sound safely
  setDisplay(name);             // update display

  // Visual “pressed” effect
  const padEl = audio.parentElement;
  if (padEl) {
    padEl.classList.add("active");
    setTimeout(() => padEl.classList.remove("active"), 150);
  }
};
```
- Finds the <audio> element for the pad by its id (same as the key).
- Resets and plays the sound.
- Updates the display with the pad name.
- Adds and removes a CSS class to the button to create a pressed animation.

6. ### Rendering Pads
In JSX:
```
{pads.map((pad) => (
  <div className="col-4" key={pad.key}>
    <button
      id={pad.id}
      className="drum-pad btn btn-outline-light w-100 py-4 fs-3 fw-bold rounded-4"
      onClick={() => playSound(pad.key, pad.name)}
    >
      {pad.key}
      <audio className="clip" id={pad.key} src={pad.url} preload="auto" />
    </button>
  </div>
))}
```
- Loops over the pads array to generate one button per pad.
- Button displays the key letter.
- Contains a hidden <audio> element with the URL and id = key.
- Clicking the button calls playSound with that pad’s key and name.

7. ### Display Panel
```
<div id="display" className="bg-dark text-success text-center fs-5 p-3 rounded border border-success">
  {display}
</div>
```
Shows the current display state (initially “Ready”, then updates to “Heater 1”, “Kick”, etc.).

8. ### Styling
- Bootstrap handles the grid and base styles.
- A custom .active class (added/removed in playSound) is used for pressed animation.
- The component also uses IDs required by FreeCodeCamp’s testing script: #drum-machine and #display.
## Usage/Examples

- Click on any drum pad to play the sound.
- Or press the matching key on your keyboard.
- The display on the right shows which sound is playing.


## Project Structure

```
src/
 ├─ App.tsx / DrumMachine.tsx    # Main drum machine component
 ├─ index.tsx                    # React entry point
 └─ App.css                      # Styles (Bootstrap + custom)

```
## Tech Stack

- React (Functional Components, Hooks)
- TypeScript
- Bootstrap 5 for layout & styling


## License

This project is open-source and available under the MIT License.

