import CircularProgressbar from "./components/CircularProgressbar";
import SettingsDialog from "./components/SettingsDialog";
import TimerButton from "./components/TimerButton";
import Button from "./components/ui/Button";
import { TimerType, useTimerContext } from "./contexts/TimerContext";

const timerTabs = [
  { name: "pomodoro", timerType: "pomodoro" },
  { name: "short break", timerType: "shortBreak" },
  { name: "long break", timerType: "longBreak" },
];

import { useEffect } from "react";

export default function App() {
  const timer = useTimerContext();

  const {
    pause,
    setPause,
    timerType,
    setTimerType,
    timeString,
    finish,
    restartTimer,
  } = timer;

  useEffect(() => {
    if (!pause) {
      document.title = `${timeString} - ${timerTabs.find(
        (t) => t.timerType === timerType,
      )?.name}`;
    }
  }, [timeString, timerType, pause]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center text-6xl text-grayishBlue">
      <h1 className=" text-2xl font-bold md:mt-12 md:text-4xl">pomodoro</h1>

      <nav className="z-10 mt-14">
        <ul className="gap- flex items-center justify-center rounded-full bg-darkBlue p-2 text-xs font-bold md:text-sm">
          {timerTabs.map((tab) => (
            <li key={tab.timerType} className="">
              <TimerButton
                timerType={timerType}
                setTimerType={setTimerType}
                name={tab.name}
                value={tab.timerType as TimerType}
              />
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-11 h-72 w-72 shrink-0 rounded-full bg-clock-gradient p-4 shadow-clock-shadow md:h-[410px] md:w-[410px] md:p-5">
        <div className="isolate flex h-full w-full flex-col items-center justify-center rounded-full bg-darkBlue">
          <CircularProgressbar />
          <div className="w-full text-center text-5xl font-bold md:text-7xl">
            {timeString}
          </div>

          <Button
            className="mt-5 rounded-full pl-3 text-sm font-bold uppercase tracking-[0.8rem] hover:text-accent md:tracking-[0.9rem]"
            onClick={() => {
              if (finish) {
                restartTimer();
              } else {
                setPause(!pause);
              }
            }}
          >
            {pause ? (finish ? "restart" : "start") : "pause"}
          </Button>
        </div>
      </div>

      <div className="mt-14">
        <SettingsDialog />
      </div>
    </div>
  );
}
