import FontSection from "./FontSection";
import ThemeSection from "./ThemeSection";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  // DialogClose,
} from "./ui/Dialog";
import TimeInput from "./ui/TimeInput";

import settingsIcon from "../assets/icon-settings.svg";

// type Props = {};

// function SettingsDialog({}: Props) {
function SettingsDialog() {

  // const a = Dialog

  return (
    <Dialog>
      <DialogTrigger>
        <img src={settingsIcon} alt="" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        <div className="px-8 pb-12 pt-6">
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-sm font-bold tracking-[5px]">TIME (MINUTES)</h2>

            <div className="mt-4 flex w-full flex-col gap-4 md:flex-row">
              <TimeInput
                title="pomodoro"
                inputName="pomodoro"
                defaultValue={25}
              />
              <TimeInput
                title="short break"
                inputName="shortBreak"
                defaultValue={5}
              />
              <TimeInput
                title="long break"
                inputName="longBreak"
                defaultValue={10}
              />
            </div>
          </div>

          <hr className="my-6 border-darkBlue/10" />

          <FontSection />

          <hr className="my-6 border-darkBlue/10" />

          <ThemeSection />
        </div>

        <button className="bg-accent1 absolute -bottom-6 left-1/2 h-14 w-32 -translate-x-1/2 rounded-full font-bold text-white">
          Apply
        </button>
      </DialogContent>
    </Dialog>
  );
}

export default SettingsDialog;
