import { Card } from "@/components/ui/card";
import { formatStudyTime } from "../utils";

interface StatsCardsProps {
  totalStudyTime: number;
  consecutiveDays: number;
  averageDailyStudyTime: number;
  taskCompletionRate: number;
  isLoading: boolean;
}

interface StatCardProps {
  label: string;
  value: React.ReactNode;
  isLoading: boolean;
}

const StatCard = ({ label, value, isLoading }: StatCardProps) => {
  return (
    <Card className="gap-2 p-6">
      <span className="typography-body-small-m text-left text-gray-500">
        {label}
      </span>
      {isLoading ? (
        <div className="h-10 animate-pulse rounded bg-gray-200" />
      ) : (
        <div className="typography-heading-b text-right text-gray-800">
          {value}
        </div>
      )}
    </Card>
  );
};

const StatsCards = ({
  totalStudyTime,
  consecutiveDays,
  averageDailyStudyTime,
  taskCompletionRate,
  isLoading,
}: StatsCardsProps) => {
  const totalTime = formatStudyTime(totalStudyTime);
  const avgTime = formatStudyTime(averageDailyStudyTime);

  return (
    <div className="grid grid-cols-2 gap-4">
      <StatCard
        label="누적 공부 시간"
        value={
          <span className="*:text-secondary-indigo">
            <span className="typography-heading-b">{totalTime.hours}</span>
            <span className="typography-body-small-m text-gray-500">시간 </span>
            <span className="typography-heading-b">{totalTime.minutes}</span>
            <span className="typography-body-small-m text-gray-500">분</span>
          </span>
        }
        isLoading={isLoading}
      />
      <StatCard
        label="누적 공부 일수"
        value={
          <span className="*:text-secondary-indigo">
            <span className="typography-heading-b">{consecutiveDays}</span>
            <span className="typography-body-small-m text-gray-500">일째</span>
          </span>
        }
        isLoading={isLoading}
      />
      <StatCard
        label="하루 평균 공부 시간"
        value={
          <span className="*:text-secondary-indigo">
            <span className="typography-heading-b">{avgTime.hours}</span>
            <span className="typography-body-small-m text-gray-500">시간 </span>
            <span className="typography-heading-b">{avgTime.minutes}</span>
            <span className="typography-body-small-m text-gray-500">분</span>
          </span>
        }
        isLoading={isLoading}
      />
      <StatCard
        label="목표 달성률"
        value={
          <span className="*:text-secondary-indigo">
            <span className="typography-heading-b">
              {Math.round(taskCompletionRate)}
            </span>
            <span className="typography-body-small-m text-gray-500">%</span>
          </span>
        }
        isLoading={isLoading}
      />
    </div>
  );
};

export default StatsCards;
