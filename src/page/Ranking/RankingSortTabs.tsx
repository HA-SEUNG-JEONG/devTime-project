import { Button } from "@/components/ui/button";
import type { RankingSortBy } from "@/types/types";

interface RankingSortTabsProps {
  sortBy: RankingSortBy;
  onSortChange: (sortBy: RankingSortBy) => void;
}

const SORT_OPTIONS: { value: RankingSortBy; label: string }[] = [
  { value: "total", label: "총 학습 시간" },
  { value: "avg", label: "일 평균 학습 시간" },
];

const RankingSortTabs = ({ sortBy, onSortChange }: RankingSortTabsProps) => {
  return (
    <div className="flex gap-2">
      {SORT_OPTIONS.map((option) => (
        <Button
          key={option.value}
          variant={sortBy === option.value ? "primary" : "secondary"}
          onClick={() => onSortChange(option.value)}
          className={
            sortBy === option.value
              ? ""
              : "bg-white text-gray-600 hover:bg-gray-50"
          }
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
};

export default RankingSortTabs;
