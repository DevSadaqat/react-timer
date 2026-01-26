import { createContext, ReactNode, useContext, useReducer } from 'react';
import Timers from '../components/Timers';

type Timer = {
  name: string;
  duration: number;
};

type TimersState = {
  isRunning: boolean;
  timers: Timer[];
};

const initialState: TimersState = {
  isRunning: true,
  timers: [],
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

type StartTimersAction = {
  type: 'START_TIMERS';
};

type StopTimersAction = {
  type: 'STOP_TIMERS';
};

type AddTimerAction = {
  type: 'ADD_TIMER';
  payload: Timer;
};

type Action = StartTimersAction | StopTimersAction | AddTimerAction;

const timeReducer = (state: TimersState, action: Action): TimersState => {
  if (action.type === 'START_TIMERS') {
    return {
      ...state,
      isRunning: true,
    };
  }
  if (action.type === 'STOP_TIMERS') {
    return {
      ...state,
      isRunning: false,
    };
  }
  if (action.type === 'ADD_TIMER') {
    return {
      ...state,
      timers: [
        ...state.timers,
        {
          name: action.payload.name,
          duration: action.payload.duration,
        },
      ],
    };
  }
};

const TimerContextProvider = ({ children }: TimerContextProviderProps) => {
  const [timersState, dispatch] = useReducer(timeReducer, initialState);
  const ctx = {
    timers: timersState.timers,
    isRunning: timersState.isRunning,
    addTimer: (timerData: Timer) => {
      dispatch({ type: 'ADD_TIMER', payload: timerData });
    },
    startTimers: () => {
      dispatch({ type: 'START_TIMERS' });
    },
    stopTimers: () => {
      dispatch({ type: 'STOP_TIMERS' });
    },
  };
  return (
    <TimersContext.Provider value={ctx}>{children}</TimersContext.Provider>
  );
};

export default TimerContextProvider;
