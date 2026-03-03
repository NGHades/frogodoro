import TimerModeButton from "./TimerModeButton";

export default function PomodoroButton(props) {
  return (
    <TimerModeButton mode="focus" {...props}>
      Pomodoro
    </TimerModeButton>
  );
}
