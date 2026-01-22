import { createContext, ReactNode, useContext } from 'react';

type Timer = {
  name: string;
  duration: number;
};

type TimersState = {
  isRunning: boolean;
  timers: Timer[];
};

type TimersContextValue = TimersState & {
  addTimer: (timerData: Timer) => void;
  startTimers: () => void;
  stopTimers: () => void;
};

const TimersContext = createContext<TimersContextValue | null>(null);

export const useTimersContext = () => {
  const timersContext = useContext(TimersContext);

  if (timersContext === null) {
    throw new Error('Timers Context is null - that should be not the case');
  }

  return timersContext;
};

type TimerContextProviderProps = {
  children: ReactNode;
};

const TimerContextProvider = ({ children }: TimerContextProviderProps) => {
  const ctx = {
    timers: [],
    isRunning: false,
    addTimer: (timerData: Timer) => {
      //...
    },
    startTimers: () => {
      // ...
    },
    stopTimers: () => {
      // ..
    },
  };
  return (
    <TimersContext.Provider value={ctx}>{children}</TimersContext.Provider>
  );
};

export default TimerContextProvider;
