import CircularProgressbar from "./components/CircularProgressbar";
import { useEffect, useState } from "react";
import SettingsDialog from "./components/SettingsDialog";
import {
  SettingsContext,
  useSettingsContext,
} from "./contexts/SettingsContext";
import Button from "./components/ui/Button";

type TimerType = "pomodoro" | "shortBreak" | "longBreak";

const timerTabs = [
  { name: "pomodoro", value: "pomodoro" },
  { name: "short break", value: "shortBreak" },
  { name: "long break", value: "longBreak" },
];

function App() {
  const settings = useSettingsContext();

  const [pause, setPause] = useState(true);

  const [timerType, setTimerType] = useState<TimerType>("pomodoro");

  const [time, setTime] = useState(
    settings && settings[timerType as keyof SettingsContext]
      ? (settings[timerType as keyof SettingsContext] as number) * 60
      : 0,
  );

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
            // console.log("time interval cleared");
            return 0;
          }
          // console.log("prevTime");
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

  useEffect(() => {
    setPause(true);
    setTime(
      settings && settings[timerType as keyof SettingsContext]
        ? (settings[timerType as keyof SettingsContext] as number) * 60
        : 0,
    );
  }, [timerType, settings]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center text-6xl text-grayishBlue">
      <h1 className=" text-2xl font-bold md:mt-12 md:text-4xl">pomodoro</h1>

      <nav className="z-10 mt-14">
        <ul className="gap- flex items-center justify-center rounded-full bg-darkBlue p-2 text-xs font-bold md:text-sm">
          {timerTabs.map((tab) => (
            <li key={tab.value} className="">
              <TimerButton
                timerType={timerType}
                setTimerType={setTimerType}
                name={tab.name}
                value={tab.value as TimerType}
              />
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-11 h-72 w-72 shrink-0 rounded-full bg-clock-gradient p-4 shadow-clock-shadow md:h-[410px] md:w-[410px] md:p-5">
        <div className="isolate flex h-full w-full flex-col items-center justify-center rounded-full bg-darkBlue">
          <CircularProgressbar
            timeInSeconds={time}
            pause={pause}
            timerType={timerType}
          />
          <div className="w-full text-center text-5xl font-bold md:text-7xl">
            {timeInMinuetsAndSeconds(time)}
          </div>

          <Button
            className="mt-5 rounded-full pl-3 text-sm font-bold uppercase tracking-[0.9rem] hover:text-accent"
            onClick={() => {
              setPause(!pause);
            }}
          >
            {pause ? "restart" : "pause"}
          </Button>
        </div>
      </div>

      <div className="mt-14">
        <SettingsDialog />
      </div>
    </div>
  );
}

const TimerButton = ({
  timerType,
  setTimerType,
  name,
  value,
}: {
  timerType: TimerType;
  setTimerType: React.Dispatch<React.SetStateAction<TimerType>>;
  name: string;
  value: TimerType;
}) => {
  return (
    <Button
      className={`rounded-full px-4 py-3 ${
        timerType === value
          ? "bg-accent font-bold text-darkBlue"
          : "text-grayishBlue/40"
      }`}
      onClick={() => {
        setTimerType(value);
      }}
    >
      {name}
    </Button>
  );
};

export default App;
