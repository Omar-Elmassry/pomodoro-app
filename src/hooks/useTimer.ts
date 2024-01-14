import { useState } from "react";

import TimerWorker from "@workers/timer.worker?worker";

function useTimer() {
  // start or pause state
  const [start, setStart] = useState(false);

  // time state
  const [time, setTime] = useState(0);

  // timer worker
  const worker = new TimerWorker();

  // start timer
  const startTimer = () => {
    worker.postMessage({ time: time });
    worker.onmessage = (e) => {
      setTime(e.data);
    };
    setStart(true);
  };

  // pause timer
  const pauseTimer = () => {
    worker.terminate();
    setStart(false);
  };

  // reset timer
  const resetTimer = () => {
    worker.terminate();
    setTime(0);
    setStart(false);
  };

  const timeString = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toFixed(0).padStart(2, "0")}:${seconds
      .toFixed(0)
      .padStart(2, "0")}`;
  };

  //

  // return start, time, and functions
  return {
    start,
    time,
    startTimer,
    pauseTimer,
    resetTimer,
    timeString,
  };
}

export default useTimer;
