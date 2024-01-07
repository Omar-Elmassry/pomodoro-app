import React, { useEffect, useState } from "react";

function FontSection() {
  const storedFont = localStorage.getItem("font");

  const [font, setFont] = useState(storedFont || "Kumbh");

  const handleFontChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFont(e.target.value);
  };

  useEffect(() => {
    const saveFont = (font: string) => {
      localStorage.setItem("font", font);
      document.body.dataset.font = font;
    };
    saveFont(font);
  }, [font]);

  return (
    <div className="flex flex-col items-center md:flex-row md:justify-between">
      <h2 className="text-sm font-bold tracking-[5px]">FONT</h2>

      <div className="mt-5 flex gap-4 md:mt-0">
        <label
          className={`flex h-10 w-10 items-center justify-center rounded-full ${
            font === "Kumbh"
              ? "bg-darkBlue font-bold text-white"
              : "bg-grey text-blue"
          }`}
        >
          Aa
          <input
            className="hidden"
            type="radio"
            name="font"
            value={"Kumbh"}
            onChange={handleFontChange}
          />
        </label>
        <label
          className={`flex h-10 w-10 items-center justify-center rounded-full ${
            font === "roboto"
              ? "bg-darkBlue font-bold text-white"
              : "bg-grey text-blue"
          }`}
        >
          Aa
          <input
            className="hidden"
            type="radio"
            name="font"
            value={"roboto"}
            onChange={handleFontChange}
          />
        </label>
        <label
          className={`flex h-10 w-10 items-center justify-center rounded-full ${
            font === "mono"
              ? "bg-darkBlue font-bold text-white"
              : "bg-grey text-blue"
          }`}
        >
          Aa
          <input
            className="hidden"
            type="radio"
            name="font"
            value={"mono"}
            onChange={handleFontChange}
          />
        </label>
      </div>
    </div>
  );
}

export default FontSection;
