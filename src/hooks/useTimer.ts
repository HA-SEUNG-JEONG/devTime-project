import { useState, useCallback, useRef, useEffect } from "react";
import { timerService } from "@/services/timer";
import type { Task } from "@/components/Timer/TaskItem";

export type TimerStatus = "ready" | "in-progress" | "paused";

interface TimerState {
  status: TimerStatus;
  timerId: string | null;
  studyLogId: string | null;
  startTime: string | null;
  todayGoal: string;
  tasks: Task[];
  elapsedSeconds: number;
}

interface UseTimerReturn {
  status: TimerStatus;
  timerId: string | null;
  studyLogId: string | null;
  todayGoal: string;
  tasks: Task[];
  hours: number;
  minutes: number;
  seconds: number;
  isLoading: boolean;
  error: string | null;
  startTimer: (goal: string, taskContents: string[]) => Promise<void>;
  pauseTimer: () => void;
  resumeTimer: () => void;
}

const initialState: TimerState = {
  status: "ready",
  timerId: null,
  studyLogId: null,
  startTime: null,
  todayGoal: "",
  tasks: [],
  elapsedSeconds: 0,
};

export const useTimer = (): UseTimerReturn => {
  const [state, setState] = useState<TimerState>(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<number | null>(null);

  const clearTimerInterval = useCallback(() => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startTimerInterval = useCallback(() => {
    clearTimerInterval();
    intervalRef.current = window.setInterval(() => {
      setState((prev) => ({
        ...prev,
        elapsedSeconds: prev.elapsedSeconds + 1,
      }));
    }, 1000);
  }, [clearTimerInterval]);

  useEffect(() => {
    return () => {
      clearTimerInterval();
    };
  }, [clearTimerInterval]);

  const startTimer = useCallback(
    async (goal: string, taskContents: string[]) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await timerService.start({
          todayGoal: goal,
          tasks: taskContents.length > 0 ? taskContents : undefined,
        });

        const tasks: Task[] = taskContents.map((content, index) => ({
          id: `task-${index}-${Date.now()}`,
          content,
          isCompleted: false,
        }));

        setState({
          status: "in-progress",
          timerId: response.timerId,
          studyLogId: response.studyLogId,
          startTime: response.startTime,
          todayGoal: goal,
          tasks,
          elapsedSeconds: 0,
        });

        startTimerInterval();
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "타이머 시작에 실패했습니다.";
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [startTimerInterval],
  );

  const pauseTimer = useCallback(() => {
    clearTimerInterval();
    setState((prev) => ({
      ...prev,
      status: "paused",
    }));
  }, [clearTimerInterval]);

  const resumeTimer = useCallback(() => {
    startTimerInterval();
    setState((prev) => ({
      ...prev,
      status: "in-progress",
    }));
  }, [startTimerInterval]);

  const hours = Math.floor(state.elapsedSeconds / 3600);
  const minutes = Math.floor((state.elapsedSeconds % 3600) / 60);
  const seconds = state.elapsedSeconds % 60;

  return {
    status: state.status,
    timerId: state.timerId,
    studyLogId: state.studyLogId,
    todayGoal: state.todayGoal,
    tasks: state.tasks,
    hours,
    minutes,
    seconds,
    isLoading,
    error,
    startTimer,
    pauseTimer,
    resumeTimer,
  };
};
