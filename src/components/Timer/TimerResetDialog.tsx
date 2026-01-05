import { CustomDialog } from "@/components/Dialog/CustomDialog";

interface TimerResetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

const TimerResetDialog = ({
  open,
  onOpenChange,
  onConfirm,
  isLoading = false,
}: TimerResetDialogProps) => {
  return (
    <CustomDialog open={open} onOpenChange={onOpenChange}>
      <CustomDialog.Content>
        <CustomDialog.Header>
          <CustomDialog.Title>타이머를 초기화하시겠습니까?</CustomDialog.Title>
          <CustomDialog.Description>
            초기화하면 현재까지의 학습 시간, 오늘의 목표, 할 일 목록이 모두
            삭제됩니다. 이 작업은 되돌릴 수 없습니다.
          </CustomDialog.Description>
        </CustomDialog.Header>
        <CustomDialog.Footer>
          <CustomDialog.CancelButton disabled={isLoading}>
            취소
          </CustomDialog.CancelButton>
          <CustomDialog.ConfirmButton
            variant="danger"
            onClick={onConfirm}
            disabled={isLoading}
          >
            초기화
          </CustomDialog.ConfirmButton>
        </CustomDialog.Footer>
      </CustomDialog.Content>
    </CustomDialog>
  );
};

export default TimerResetDialog;
