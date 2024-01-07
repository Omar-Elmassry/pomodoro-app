import CircularProgressbar from "./components/CircularProgressbar";
import useTheme from "./hooks/useTheme";

import { useEffect, useState } from "react";
import SettingsDialog from "./components/SettingsDialog";

function App() {
  const theme = useTheme();

  // settings modal state
  // const [showSettings, setShowSettings] = useState(false);

  const [pause, setPause] = useState(true);

  const [time, setTime] = useState(1 * 60);

  function timeInMinuetsAndSeconds(time: number) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toFixed(0).padStart(2, "0")}:${seconds
      .toFixed(0)
      .padStart(2, "0")}`;
  }

  // start timer
  useEffect(() => {
    let intervalId: number;
    if (!pause) {
      intervalId = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(intervalId);
            console.log("time interval cleared");
            return 0;
          }
          console.log("prevTime");
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId); // cleanup on unmount or when pause is true
      }
    };
  }, [pause]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center text-6xl text-grayishBlue">
      <h1 className="mt-12 text-4xl font-bold">pomodoro</h1>

      <nav className="z-10 mt-14">
        <ul className="gap- flex items-center justify-center rounded-full bg-darkBlue p-2 text-sm font-bold">
          <li className="">
            <button className="rounded-full bg-accent px-4 py-3 font-bold text-darkBlue focus:outline-none ">
              pomodoro
            </button>
          </li>
          <li className="">
            <button className="px-4 py-3 opacity-40 focus:outline-none">
              short break
            </button>
          </li>
          <li className="">
            <button className="px-4 py-3 opacity-40 focus:outline-none">
              long break
            </button>
          </li>
        </ul>
      </nav>

      <div className="mt-11 h-[410px] w-[410px] rounded-full bg-clock-gradient p-6 shadow-clock-shadow">
        <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-darkBlue">
          <CircularProgressbar timeInSeconds={time} pause={pause} />
          <div className="w-full text-center text-7xl font-bold">
            {timeInMinuetsAndSeconds(time)}
          </div>
          <div className="mt-5 text-sm font-bold uppercase tracking-[0.9rem]">
            {pause ? "restart" : "pause"}
          </div>
        </div>
      </div>

      <div className="mt-14">
        {/* <button
          className=" focus:outline-none"
          onClick={() => {
            setPause(!pause);
          }}
        >
        </button> */}

        <SettingsDialog />
      </div>
    </div>
  );
}

export default App;
