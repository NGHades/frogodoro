import TimerModeButton from "./TimerModeButton";

export default function LongBreakButton(props) {
  return (
    <TimerModeButton mode="longBreak" {...props}>
      Long Break
    </TimerModeButton>
  );
}