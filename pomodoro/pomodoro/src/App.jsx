import pixel_houseImg from "./assets/pixel_chill_living_room.gif";
import Button from "./components/Button";
import Timer from "./components/Timer";
import { useState } from "react";

function App() {
  const [currentMode, setCurrentMode] = useState('pomodoro');

  return <div className="relative min-h-screen w-full">
    <img
      src={pixel_houseImg}
      alt="Background"
      className="fixed inset-0 w-full h-full object-cover -z-10"
    />
    <div className="flex flex-col items-center gap-8 py-16 px-15">
      <Timer mode={currentMode} />
      
      <div className="flex flex-col gap-4">
        <Button onClick={() => setCurrentMode('pomodoro')}>
          Pomodoro
        </Button>
        <Button onClick={() => setCurrentMode('shortBreak')}>
          Short Break
        </Button>
        <Button onClick={() => setCurrentMode('longBreak')}>
          Long Break
        </Button>
      </div>
    </div>


  </div>
}

export default App

