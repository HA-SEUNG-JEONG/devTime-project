import { useEffect, useState } from "react";
import { Code2 } from "lucide-react";
import { CustomDialog } from "@/components/Dialog/CustomDialog";
import CheckboxComponent from "@/components/Checkbox/CheckboxComponent";
import { dashboardService } from "@/services/dashboard";
import type { StudyLogDetail } from "@/types/types";
import { useErrorModal } from "@/contexts/ErrorModalContext";

interface StudyLogDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studyLogId: string | null;
}

const StudyLogDetailDialog = ({
  open,
  onOpenChange,
  studyLogId,
}: StudyLogDetailDialogProps) => {
  const [detail, setDetail] = useState<StudyLogDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { showError } = useErrorModal();

  useEffect(() => {
    if (open && studyLogId) {
      const fetchDetail = async () => {
        setIsLoading(true);
        try {
          const response = await dashboardService.getStudyLogDetail(studyLogId);
          setDetail(response.data);
        } catch {
          showError({
            title: "조회 실패",
            description: "학습 기록을 불러오는데 실패했습니다.",
          });
          onOpenChange(false);
        } finally {
          setIsLoading(false);
        }
      };
      fetchDetail();
    }
  }, [open, studyLogId, showError, onOpenChange]);

  useEffect(() => {
    if (!open) {
      setDetail(null);
    }
  }, [open]);

  return (
    <CustomDialog open={open} onOpenChange={onOpenChange}>
      <CustomDialog.Content className="sm:max-w-lg">
        {isLoading ? (
          <div className="space-y-4 p-4">
            <div className="h-8 animate-pulse rounded bg-gray-200" />
            <div className="h-24 animate-pulse rounded bg-gray-200" />
            <div className="h-16 animate-pulse rounded bg-gray-200" />
          </div>
        ) : detail ? (
          <>
            <CustomDialog.Header>
              <CustomDialog.Title className="typography-title-b text-gray-800">
                {detail.todayGoal}
              </CustomDialog.Title>
            </CustomDialog.Header>

            <CustomDialog.Body className="space-y-4">
              {detail.tasks.length > 0 && (
                <div className="space-y-2">
                  {detail.tasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center gap-3 rounded-lg bg-primary-10 px-4 py-3"
                    >
                      <Code2 className="h-5 w-5 shrink-0 text-primary-0" />
                      <span
                        className={`typography-body-m flex-1 ${
                          task.isCompleted
                            ? "text-gray-400 line-through"
                            : "text-gray-800"
                        }`}
                      >
                        {task.content}
                      </span>
                      <CheckboxComponent
                        checked={task.isCompleted}
                        disabled
                      />
                    </div>
                  ))}
                </div>
              )}

              {detail.review && (
                <div className="border-t border-gray-100 pt-4">
                  <span className="typography-body-small-s mb-2 block text-gray-500">
                    한 줄 회고
                  </span>
                  <p className="typography-body-m text-gray-700">
                    {detail.review}
                  </p>
                </div>
              )}
            </CustomDialog.Body>

            <CustomDialog.Footer className="justify-end">
              <CustomDialog.CancelButton>닫기</CustomDialog.CancelButton>
            </CustomDialog.Footer>
          </>
        ) : null}
      </CustomDialog.Content>
    </CustomDialog>
  );
};

export default StudyLogDetailDialog;
