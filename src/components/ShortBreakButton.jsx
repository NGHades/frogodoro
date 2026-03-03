import TimerModeButton from "./TimerModeButton";

export default function ShortBreakButton(props) {
  return (
    <TimerModeButton mode="shortBreak" {...props}>
      Short Break
    </TimerModeButton>
  );
}