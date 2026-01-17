import { Card } from "@/components/ui/card";
import type { WeekdayStudyTime } from "@/types/types";
import { WEEKDAY_KEYS, WEEKDAY_SHORT_LABELS } from "../utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface WeekdayChartProps {
  weekdayStudyTime: WeekdayStudyTime;
  isLoading: boolean;
}

const WeekdayChart = ({ weekdayStudyTime, isLoading }: WeekdayChartProps) => {
  const times = WEEKDAY_KEYS.map((day) => weekdayStudyTime[day]);
  const maxTime = Math.max(...times, 1);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}시간 ${String(minutes).padStart(2, "0")}분 ${String(secs).padStart(2, "0")}초`;
  };

  return (
    <Card className="bg-primary-0 gap-0 border-none px-6 py-5 text-white">
      <span className="typography-body-small-m mb-4 text-white/80">
        요일별 공부 시간 평균
      </span>
      {isLoading ? (
        <div className="flex h-32 items-center justify-center">
          <div className="h-full w-full animate-pulse rounded bg-white/20" />
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="mb-2 flex items-end justify-around gap-2">
            <div className="flex flex-col items-end gap-1 text-xs text-white/60">
              <span>24시간</span>
              <span className="mt-6">16시간</span>
              <span className="mt-6">8시간</span>
            </div>
            {times.map((time, index) => {
              const heightPercent = (time / maxTime) * 100;
              return (
                <Tooltip key={WEEKDAY_KEYS[index]} delayDuration={0}>
                  <TooltipTrigger asChild>
                    <div className="flex h-32 w-8 flex-col justify-end">
                      <div
                        className="w-full rounded-t bg-white/90 transition-all hover:bg-white"
                        style={{ height: `${heightPercent}%`, minHeight: time > 0 ? "4px" : "0" }}
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="bg-gray-800 text-white">
                    {formatTime(time)}
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
          <div className="flex justify-around gap-2">
            <div className="w-12" />
            {WEEKDAY_SHORT_LABELS.map((label, index) => (
              <div
                key={index}
                className="flex h-6 w-8 items-center justify-center rounded-full bg-white/20 text-xs font-medium"
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};

export default WeekdayChart;
