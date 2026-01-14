import { useState, useCallback, useEffect } from "react";
import NavBar from "@/components/NavBar";
import RankingList from "@/components/RankingList/RankingList";
import RankingSortTabs from "./RankingSortTabs";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { rankingService } from "@/services/ranking";
import type { RankingEntry, RankingSortBy, PaginationInfo } from "@/types/types";

const ITEMS_PER_PAGE = 10;

const Ranking = () => {
  const [sortBy, setSortBy] = useState<RankingSortBy>("total");
  const [rankings, setRankings] = useState<RankingEntry[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRankings = useCallback(
    async (page: number, reset = false) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await rankingService.getRankings({
          sortBy,
          page,
          limit: ITEMS_PER_PAGE,
        });

        setRankings((prev) =>
          reset ? response.data.rankings : [...prev, ...response.data.rankings]
        );
        setPagination(response.data.pagination);
      } catch {
        setError("랭킹을 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    },
    [sortBy]
  );

  useEffect(() => {
    fetchRankings(1, true);
  }, [fetchRankings]);

  const handleLoadMore = useCallback(() => {
    if (pagination?.hasNext && !isLoading) {
      fetchRankings(pagination.currentPage + 1);
    }
  }, [pagination, isLoading, fetchRankings]);

  const handleSortChange = (newSortBy: RankingSortBy) => {
    if (newSortBy !== sortBy) {
      setSortBy(newSortBy);
    }
  };

  const { sentinelRef } = useInfiniteScroll({
    hasNext: pagination?.hasNext ?? false,
    isLoading,
    onLoadMore: handleLoadMore,
  });

  return (
    <div className="bg-background-timer flex min-h-screen flex-col px-4 py-4 sm:px-6 md:px-8 lg:px-12">
      <NavBar />
      <main className="mx-auto w-full max-w-4xl flex-1 py-8">
        <RankingSortTabs sortBy={sortBy} onSortChange={handleSortChange} />

        {error && (
          <div className="mt-8 rounded-lg bg-red-50 p-4 text-center text-red-600">
            {error}
          </div>
        )}

        <div className="mt-6 flex flex-col gap-4">
          {rankings.map((entry) => (
            <RankingList key={entry.userId} entry={entry} />
          ))}

          {isLoading && (
            <div className="flex justify-center py-4">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-0 border-t-transparent" />
            </div>
          )}

          <div ref={sentinelRef} className="h-1" />

          {!isLoading && rankings.length === 0 && !error && (
            <div className="py-12 text-center text-gray-500">
              아직 랭킹 데이터가 없습니다.
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Ranking;
