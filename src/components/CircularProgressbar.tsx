import { useEffect, useState } from "react";
import {
  SettingsContext,
  useSettingsContext,
} from "../contexts/SettingsContext";

type CircularProgressbarProps = {
  timeInSeconds: number;
  pause?: boolean;
  timerType: "pomodoro" | "shortBreak" | "longBreak";
};

function CircularProgressbar({
  timeInSeconds,
  pause = false,
  timerType = "pomodoro",
}: CircularProgressbarProps) {
  const settings = useSettingsContext();

  const time =
    settings && settings[timerType as keyof SettingsContext]
      ? (settings[timerType as keyof SettingsContext] as number) * 60
      : 0;

  const [offset, setOffset] = useState(968);

  const offsetPerSecond = 968 / timeInSeconds;

  useEffect(() => {
    let intervalId: number;
    if (!pause) {
      intervalId = setInterval(() => {
        console.log("interval running");

        setOffset((prevOffset) => {
          if (prevOffset <= 0) {
            clearInterval(intervalId);
            // console.log("interval cleared");
            return 0;
          }
          // console.log("offset");
          return prevOffset - offsetPerSecond / 10;
        });
      }, 100);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId); // cleanup on unmount or when pause is true
      }
    };
  }, [pause, timerType]);

  useEffect(() => {
    setOffset(968);
  }, [timerType, time]);

  return (
    <svg
      width="340"
      height="340"
      viewBox="0 0 340 340"
      className="absolute -z-10 -rotate-90 scale-[72%] text-accent md:scale-[107%]"
    >
      <circle
        r="154"
        cx="170"
        cy="170"
        fill="transparent"
        stroke="transparent"
        strokeWidth="12px"
      ></circle>
      <circle
        r="154"
        cx="170"
        cy="170"
        fill="transparent"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="13px"
        strokeDasharray={968}
        strokeDashoffset={offset}
        // style={{
        //   // transition: "all 300ms linear",
        //   strokeDasharray: "968px",
        //   strokeDashoffset: `${offset}px`,
        // }}
      ></circle>
    </svg>
  );
}

export default CircularProgressbar;
