import { useEffect, useState } from "react";

import upIcon from "../../assets/icon-arrow-up.svg";
import downIcon from "../../assets/icon-arrow-down.svg";
type TimeInputProps = {
  title: string;
  inputName: string;
  defaultValue?: number;
};
function TimeInput({ inputName, title, defaultValue }: TimeInputProps) {
  const [value, setValue] = useState(defaultValue || 0);

  useEffect(() => {
    const value = localStorage.getItem(inputName);
    if (value) {
      setValue(Number(value));
    }
  }, [inputName]);

  useEffect(() => {
    const saveValue = (value: number) => {
      localStorage.setItem(inputName, String(value));
    };
    saveValue(value);
  }, [value, inputName]);

  return (
    <div className="flex items-center justify-between md:flex-col md:items-start">
      <label
        htmlFor={inputName}
        className="text-sm font-bold text-blue/40 md:mb-3"
      >
        {title}
      </label>
      <div className="flex h-12 max-w-36 justify-between rounded-xl bg-grey p-3 px-4">
        <input
          className="w-1/2 bg-transparent text-sm font-bold focus:outline-0"
          id={inputName}
          type="number"
          value={value}
          onChange={(e) => {
            setValue(Number(e.target.value));
          }}
        />
        <div className="flex flex-col gap-2">
          <button
            className=""
            onClick={() => {
              setValue(value + 1);
            }}
          >
            <img src={upIcon} alt="" />
          </button>

          <button
            className=""
            onClick={() => {
              setValue(value - 1);
            }}
          >
            <img src={downIcon} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TimeInput;
