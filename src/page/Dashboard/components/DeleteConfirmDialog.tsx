import { CustomDialog } from "@/components/Dialog/CustomDialog";

interface DeleteConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isLoading: boolean;
}

const DeleteConfirmDialog = ({
  open,
  onOpenChange,
  onConfirm,
  isLoading,
}: DeleteConfirmDialogProps) => {
  return (
    <CustomDialog open={open} onOpenChange={onOpenChange}>
      <CustomDialog.Content className="sm:max-w-md">
        <CustomDialog.Header>
          <CustomDialog.Title>기록을 삭제하시겠습니까?</CustomDialog.Title>
          <CustomDialog.Description>
            한 번 삭제된 학습 기록은 다시 복구할 수 없습니다. 그래도 계속
            하시겠습니까?
          </CustomDialog.Description>
        </CustomDialog.Header>

        <CustomDialog.Footer className="justify-end">
          <CustomDialog.CancelButton disabled={isLoading}>
            취소
          </CustomDialog.CancelButton>
          <CustomDialog.ConfirmButton
            variant="danger"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? "삭제 중..." : "삭제하기"}
          </CustomDialog.ConfirmButton>
        </CustomDialog.Footer>
      </CustomDialog.Content>
    </CustomDialog>
  );
};

export default DeleteConfirmDialog;
