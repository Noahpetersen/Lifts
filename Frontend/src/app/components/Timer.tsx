import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Timer({ setIsOpen }: { setIsOpen: (open: boolean) => void }) {
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
    <div className="max-w-sm text-white px-6 rounded-xl flex flex-col shadow-lg items-center justify-between gap-6">
      <span className="text-5xl">{formatTime(time)}</span>
      <footer className="w-full">
        {!isRunning ? (
          <Button onClick={() => setIsRunning(true)} className="w-full mb-2">
            {time === 0 ? "Start" : "Resume"}
          </Button>
        ) : (
          <Button onClick={() => setIsRunning(false)} className="w-full mb-2">
            Pause
          </Button>
        )}

        <Button variant="outline" onClick={() => setIsOpen(false)} className="w-full">
          Cancel
        </Button>
      </footer>
    </div>
  );
}
