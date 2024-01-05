import React, { useEffect, useState } from "react";

type CircularProgressbarProps = {
  timeInSeconds: number;
  pause?: boolean;
};

function CircularProgressbar({
  timeInSeconds,
  pause = false,
}: CircularProgressbarProps) {
  const [offset, setOffset] = useState(968);

  const offsetPerSecond = 968 / timeInSeconds;

  useEffect(() => {
    let intervalId: number;
    if (!pause) {
      intervalId = setInterval(() => {
        setOffset((prevOffset) => {
          if (prevOffset <= 0) {
            clearInterval(intervalId);
            console.log("interval cleared");
            return 0;
          }
          console.log("offset");
          return prevOffset - offsetPerSecond / 5;
        });
      }, 200);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId); // cleanup on unmount or when pause is true
      }
    };
  }, [pause]);

  return (
    <svg
      width="340"
      height="340"
      viewBox="0 0 340 340"
      style={{ transform: "rotate(-90deg)" }}
      className="absolute text-accent "
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
        style={{
          transition: "all 300ms linear",
          strokeDasharray: "968px",
          strokeDashoffset: `${offset}px`,
        }}
      ></circle>
    </svg>
  );
}

export default CircularProgressbar;
