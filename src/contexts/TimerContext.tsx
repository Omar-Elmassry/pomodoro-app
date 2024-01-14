import React, { createContext, useContext, useEffect, useState } from "react";
import TimerWorker from "@workers/timer.worker?worker";
import OffsetWorker from "@workers/offset.worker?worker";
import { useSettingsContext } from "./SettingsContext";

export type TimerType = "pomodoro" | "shortBreak" | "longBreak";

type TimerContextType = {
  start: boolean;
  time: number;
  pause: boolean;
  setPause: (pause: boolean) => void;
  startTimer: () => void;
  pauseTimer: () => void;
  restartTimer: () => void;
  timeString: string;
  timerType: TimerType;
  setTimerType: (timerType: TimerType) => void;
  offset: number;
  timerRuns: number;
  finish: boolean;
};

const TimerContext = createContext({} as TimerContextType);

const secondsMultiplier = 60;

export const TimerProvider = ({ children }: { children: React.ReactNode }) => {
  const settings = useSettingsContext();

  const { pomodoro, shortBreak, longBreak } = settings;

  // number of timerRuns
  const [timerRuns, setTimerRuns] = useState(0);

  // start or pause state
  const [restart, setRestart] = useState(false);

  // finish or not state
  const [finish, setFinish] = useState(false);

  // pause state
  const [pause, setPause] = useState(true);

  // time state
  const [time, setTime] = useState(0);
  // console.log("🚀 ~ TimerProvider ~ time:", time);

  // timer type state
  const [timerType, setTimerType] = useState<TimerType>("pomodoro");

  // time string state
  const [timeString, setTimeString] = useState("");
  // console.log("🚀 ~ TimerProvider ~ timeString:", timeString);

  // offset state
  const [offset, setOffset] = useState(968);

  const startTimer = () => {
    setRestart(true);
  };

  // pause timer
  const pauseTimer = () => {
    setPause(true);
  };

  // reset timer
  const restartTimer = () => {
    setRestart(true);
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (restart) {
      timeoutId = setTimeout(() => {
        setOffset(968);
        setPause(false);
        setFinish(false);
      }, 100);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [restart]);

  const getTimeString = (time: number) => {
    const minutes = Math.floor(time / secondsMultiplier);
    const seconds = time % secondsMultiplier;
    return `${minutes.toFixed(0).padStart(2, "0")}:${seconds
      .toFixed(0)
      .padStart(2, "0")}`;
  };

  const getActiveTimerTypeTime = () => {
    if (timerType === "pomodoro") {
      return pomodoro;
    } else if (timerType === "shortBreak") {
      return shortBreak;
    } else if (timerType === "longBreak") {
      return longBreak;
    }
    return 0;
  };

  const setTimeBasedOnTimerType = () => {
    if (timerType === "pomodoro") {
      setTime(pomodoro * secondsMultiplier);
    } else if (timerType === "shortBreak") {
      setTime(shortBreak * secondsMultiplier);
    } else if (timerType === "longBreak") {
      setTime(longBreak * secondsMultiplier);
    }
  };

  const activeTimerTypeTime = getActiveTimerTypeTime();

  const timeInSeconds = activeTimerTypeTime * secondsMultiplier;

  const offsetPerSecond = 968 / timeInSeconds;

  // use worker to update time
  useEffect(() => {
    console.log("🚀 ~ useEffect ~ time:", time);
    let worker: Worker;
    if (!pause) {
      console.log("🚀 ~ useEffect ~ pause:", pause);
      worker = new TimerWorker();
      worker.postMessage({ pause, time });
      worker.onmessage = (e) => {
        if (e.data > 0) {
          setTime((prevTime) => {
            if (prevTime <= 0) {
              return 0;
            }
            return prevTime - 1;
          });
        } else {
          if (restart) setRestart(false);
          setTime(0);
          setPause(true);
          setTimerRuns((prevTimerRuns) => prevTimerRuns + 1);
          setFinish(true);
        }
      };
    }
    return () => {
      if (worker) {
        worker.terminate();
        console.log("🚀 ~ return ~ worker.terminate()");
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pause, timerType, settings]);

  // use worker to update offset
  useEffect(() => {
    let worker: Worker;
    if (!pause) {
      worker = new OffsetWorker();
      worker.postMessage({ pause, offset, offsetPerSecond });
      worker.onmessage = (e) => {
        if (e.data === "tick") {
          setOffset((prevOffset) => {
            if (prevOffset <= 0) {
              return 0;
            }
            return prevOffset - offsetPerSecond / 10;
          });
        }
      };
    }
    return () => {
      if (worker) {
        worker.terminate();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pause, timerType, offsetPerSecond]);

  useEffect(() => {
    setTimeBasedOnTimerType();
    setPause(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerType, pomodoro, shortBreak, longBreak]);

  useEffect(() => {
    setTimeBasedOnTimerType();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restart]);

  useEffect(() => {
    setOffset(968);
  }, [timerType, activeTimerTypeTime]);

  useEffect(() => {
    setTimerRuns(0);
    setFinish(false);
  }, [timerType]);

  useEffect(() => {
    setTimeString(getTimeString(time));
  }, [time]);

  useEffect(() => {
    setPause(true);
  }, [pomodoro, shortBreak, longBreak]);

  return (
    <TimerContext.Provider
      value={{
        start: restart,
        time,
        pause,
        setPause,
        startTimer,
        pauseTimer,
        restartTimer,
        timeString,
        timerType,
        setTimerType,
        offset,
        timerRuns,
        finish,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export const useTimerContext = () => useContext(TimerContext);
