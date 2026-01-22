import { useTimersContext } from '../store/timers-context.tsx';
import Button from './UI/Button.tsx';

export default function Header() {
  const timersContext = useTimersContext();
  return (
    <header>
      <h1>ReactTimer</h1>

      <Button>{timersContext.isRunning ? 'Stop' : 'Start'}Stop Timers</Button>
    </header>
  );
}
