import { useEffect, useState } from "react";

function useTheme() {
  const storedTheme = localStorage.getItem("theme");
  const [theme, setTheme] = useState(storedTheme || "default");

  function changeTheme(theme: string) {
    setTheme(theme);
    // document.body.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  /////////////////// Font ///////////////////////

  const storedFont = localStorage.getItem("font");
  const [font, setFont] = useState(storedFont || "default");

  function changeFont(font: string) {
    setFont(font);
    // document.body.dataset.font = font;
    localStorage.setItem("font", font);
  }

  useEffect(() => {
    document.body.dataset.font = font;
  }, [font]);

  return { theme, changeTheme, font, changeFont };
}

export default useTheme;
