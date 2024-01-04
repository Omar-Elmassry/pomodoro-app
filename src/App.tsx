import CircularProgressbar from "./components/CircularProgressbar";
import useTheme from "./hooks/useTheme";

import settingsIcon from "./assets/icon-settings.svg";

function App() {
  const theme = useTheme();

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
          <CircularProgressbar timeInMinutes={1} />
          <div className="text-7xl font-bold">25:00</div>
          <div className="mt-5 text-sm font-bold tracking-[0.9rem]">PAUSE</div>
        </div>
      </div>

      <div className="">
        <button className="mt-14 focus:outline-none">
          <img src={settingsIcon} alt="" />
        </button>
      </div>
    </div>
  );
}

export default App;
