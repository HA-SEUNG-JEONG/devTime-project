import type { WeekdayStudyTime } from "@/types/types";

export const formatStudyTime = (
  seconds: number,
): { hours: number; minutes: number } => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return { hours, minutes };
};

export const formatStudyTimeString = (seconds: number): string => {
  const { hours, minutes } = formatStudyTime(seconds);
  if (hours > 0) {
    return `${hours}시간 ${minutes}분`;
  }
  return `${minutes}분`;
};

export const formatDate = (dateString: string): string => {
  const [year, month, day] = dateString.split("-");
  return `${year}.${month}.${day}`;
};

export const formatDateFull = (dateString: string): string => {
  const [year, month, day] = dateString.split("-");
  return `${year}년 ${parseInt(month)}월 ${parseInt(day)}일`;
};

export const WEEKDAY_LABELS = [
  "일",
  "월",
  "화",
  "수",
  "목",
  "금",
  "토",
] as const;

export const WEEKDAY_KEYS: (keyof WeekdayStudyTime)[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const WEEKDAY_SHORT_LABELS = [
  "M",
  "T",
  "W",
  "T",
  "F",
  "S",
  "S",
] as const;

export const generateYearDates = (): Date[] => {
  const dates: Date[] = [];
  const today = new Date();
  const oneYearAgo = new Date(today);
  oneYearAgo.setFullYear(today.getFullYear() - 1);

  const startDate = new Date(oneYearAgo);
  startDate.setDate(startDate.getDate() - startDate.getDay());

  const currentDate = new Date(startDate);
  while (currentDate <= today) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

export const formatDateToKey = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const getMonthLabels = (
  dates: Date[],
): { month: number; weekIndex: number }[] => {
  const labels: { month: number; weekIndex: number }[] = [];
  let currentMonth = -1;
  let weekIndex = 0;

  for (let i = 0; i < dates.length; i++) {
    const date = dates[i];
    const month = date.getMonth();

    if (date.getDay() === 0) {
      if (month !== currentMonth) {
        labels.push({ month: month + 1, weekIndex });
        currentMonth = month;
      }
      weekIndex++;
    }
  }

  return labels;
};
