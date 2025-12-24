import SymbolLogo from "./SymbolLogo";
import EditIcon from "./Icon/EditIcon";
import TrashIcon from "./Icon/TrashIcon";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import CheckIcon from "./Icon/CheckIcon";

interface TodoItemProps {
  backgroundColor?: string;
  textColor?: string;
  checked?: boolean;

  isEditing?: boolean;

  noIcon?: boolean;
}

const TodoItem = ({
  backgroundColor,
  textColor,
  checked,
  isEditing,
  noIcon
}: TodoItemProps) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div
      className={`p-6 flex items-center justify-between rounded-md  ${
        isChecked ? "bg-gray-400" : backgroundColor
      }`}
    >
      <SymbolLogo className="mr-4" />
      <span className={`inline-flex flex-1 typography-body-s ${textColor}`}>
        TODO ITEM
      </span>

      {!isEditing && !checked && !noIcon && (
        <Checkbox
          checked={isChecked}
          onCheckedChange={() => setIsChecked(!isChecked)}
        />
      )}

      {isEditing && !checked && <CheckIcon className="text-white" />}

      {checked && (
        <div className="flex items-center gap-4">
          <EditIcon className="text-white" />
          <TrashIcon className="text-white" />
        </div>
      )}
      {noIcon && <div className="flex items-center gap-4"></div>}
    </div>
  );
};

export default TodoItem;
