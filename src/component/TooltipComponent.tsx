import {
  Tooltip,
  TooltipTrigger,
  TooltipContent
} from "@/components/ui/tooltip";
import { Button } from "./Button";

const TooltipComponent = () => {
  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger>
        <Button label="Hover" variant="primary" />
      </TooltipTrigger>
      <TooltipContent side="bottom">Hover</TooltipContent>
    </Tooltip>
  );
};

export default TooltipComponent;
