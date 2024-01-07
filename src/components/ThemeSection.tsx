import React, { useEffect, useState } from "react";

function ThemeSection() {
  const storedTheme = localStorage.getItem("theme");

  const [theme, setTheme] = useState(storedTheme || "default");

  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTheme(e.target.value);
  };

  useEffect(() => {
    const saveTheme = (theme: string) => {
      localStorage.setItem("theme", theme);
      document.body.dataset.theme = theme;
    };
    saveTheme(theme);
  }, [theme]);

  return (
    <div className="flex flex-col items-center md:flex-row md:justify-between">
      <h2 className="text-sm font-bold tracking-[5px]">COLOR</h2>

      <div className="mt-5 flex gap-4 md:mt-0">
        <label className="bg-accent1 flex h-10 w-10 items-center justify-center rounded-full font-bold text-blue">
          <input
            className="peer hidden"
            type="radio"
            name="theme"
            value={"default"}
            onChange={handleThemeChange}
            checked={theme === "default"}
          />
          <CheckMark />
        </label>
        <label className="bg-accent2 flex h-10 w-10 items-center justify-center rounded-full font-bold text-blue">
          <input
            className="peer hidden"
            type="radio"
            name="theme"
            value={"teal-theme"}
            onChange={handleThemeChange}
            checked={theme === "teal-theme"}
          />
          <CheckMark />
        </label>
        <label className="bg-accent3 flex h-10 w-10 items-center justify-center rounded-full font-bold text-blue">
          <input
            className="peer hidden"
            type="radio"
            name="theme"
            value={"purple-theme"}
            onChange={handleThemeChange}
            checked={theme === "purple-theme"}
          />
          <CheckMark />
        </label>
      </div>
    </div>
  );
}

function CheckMark() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="11"
      fill="none"
      className="hidden peer-checked:block"
    >
      <path stroke="#161932" strokeWidth="2" d="m1 5.5 3.953 3.953L13.405 1" />
    </svg>
  );
}

export default ThemeSection;
