import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import playButton from "../../assets/play-button-arrowhead.png"
import pauseButton from "../../assets/pause.png";
import reset from "../../assets/undo.png";

export default function Timer() {
  const [time, setTime] = useState(0); // Time in seconds
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <Card className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-full border-b-0 border-r-0 border-l-0">
        <div className=" max-w-sm text-white px-6 rounded-xl shadow-lg flex items-center justify-between">
            <span className="text-5xl">{formatTime(time)}</span>
            <div className="flex gap-2 ml-auto">
              <Button
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  onClick={() => setIsRunning(!isRunning)}
              >
                  <img src={isRunning ? pauseButton : playButton} alt="" className="w-full h-full object-contain" />
              </Button>
              <Button onClick={() => { setIsRunning(false); setTime(0); }} className="w-12 h-12 rounded-full flex items-center justify-center">
                  <img src={reset} className="w-full h-full object-contain"/>
              </Button>
            </div>
        </div>
    </Card>
  );
}
