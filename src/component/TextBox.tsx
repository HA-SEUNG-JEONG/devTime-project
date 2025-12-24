import * as React from "react";
import { cn } from "@/lib/utils";
import {
  InputGroup,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { CustomButton } from "./CustomButton";

interface TextBoxContextValue {
  id: string;
  value?: string;
  defaultValue?: string;
}

const TextBoxContext = React.createContext<TextBoxContextValue | null>(null);

const useTextBoxContext = () => {
  const context = React.useContext(TextBoxContext);
  if (!context) {
    throw new Error("TextBox subcomponents must be used within TextBox");
  }
  return context;
};

interface TextBoxProps {
  id?: string;
  value?: string;
  defaultValue?: string;
  className?: string;
  children: React.ReactNode;
}

const TextBox = ({
  id = "text-box",
  value,
  defaultValue,
  className,
  children,
}: TextBoxProps) => {
  const contextValue = React.useMemo(
    () => ({ id, value, defaultValue }),
    [id, value, defaultValue],
  );

  return (
    <TextBoxContext.Provider value={contextValue}>
      <div className={cn("flex flex-col gap-1", className)}>{children}</div>
    </TextBoxContext.Provider>
  );
};

interface TextBoxLabelProps {
  className?: string;
  children: React.ReactNode;
}

const TextBoxLabel = ({ className, children }: TextBoxLabelProps) => {
  const { id } = useTextBoxContext();

  return (
    <label
      htmlFor={id}
      className={cn("typography-body-m text-gray-700", className)}
    >
      {children}
    </label>
  );
};

interface TextBoxInputProps extends Omit<React.ComponentProps<"input">, "id"> {
  className?: string;
  hasButton?: boolean;
}

const TextBoxInput = ({
  className,
  hasButton = false,
  ...props
}: TextBoxInputProps) => {
  const { id } = useTextBoxContext();

  if (hasButton) {
    return (
      <InputGroup className="bg-gray-dark border-none">
        <InputGroupInput
          type="text"
          id={id}
          className={cn("text-border-300 typography-body-m", className)}
          {...props}
        />
      </InputGroup>
    );
  }

  return (
    <InputGroup className="bg-gray-dark mr-3 rounded-[5px]">
      <InputGroupInput
        type="text"
        id={id}
        className={cn(
          "placeholder:typography-body-m typography-body-m",
          className,
        )}
        {...props}
      />
    </InputGroup>
  );
};

interface TextBoxButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  variant?: "primary" | "secondary" | "tertiary";
  type?: "inline" | "external";
}

const TextBoxButton = ({
  children,
  onClick,
  disabled,
  className,
  variant = "secondary",
  type = "inline",
}: TextBoxButtonProps) => {
  const { value, defaultValue } = useTextBoxContext();
  const inputValue = value ?? defaultValue;

  if (type === "inline") {
    return (
      <InputGroupButton
        onClick={onClick}
        disabled={disabled}
        className={cn(
          "typography-caption-m",
          inputValue && inputValue.trim() ? "text-primary-0" : "text-disabled",
          className,
        )}
      >
        {children}
      </InputGroupButton>
    );
  }

  return (
    <CustomButton
      variant={variant}
      label={typeof children === "string" ? children : "Button"}
      onClick={onClick}
      disabled={disabled ?? !inputValue?.trim()}
      className={className}
    />
  );
};

interface TextBoxHelperTextProps {
  className?: string;
  children: React.ReactNode;
  variant?: "default" | "success" | "error" | "warning";
}

const TextBoxHelperText = ({
  className,
  children,
  variant = "default",
}: TextBoxHelperTextProps) => {
  const variantClasses = {
    default: "text-primary-0",
    success: "text-secondary-positive",
    error: "text-secondary-negative",
    warning: "text-secondary-notice",
  }[variant];

  return (
    <span className={cn("typography-body-s", variantClasses, className)}>
      {children}
    </span>
  );
};

TextBox.Label = TextBoxLabel;
TextBox.Input = TextBoxInput;
TextBox.Button = TextBoxButton;
TextBox.HelperText = TextBoxHelperText;

export default TextBox;
