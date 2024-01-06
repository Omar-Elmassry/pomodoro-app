import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/Dialog";
import TimeInput from "./ui/TimeInput";

// type Props = {};

// function SettingsDialog({}: Props) {
function SettingsDialog() {
  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        <div className="h-96 px-8 pt-6">
          <h2 className="text-sm font-bold tracking-[5px]">TIME (MINUTES)</h2>

          <div className="mt-4 flex gap-4">
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
      </DialogContent>
    </Dialog>
  );
}

export default SettingsDialog;
