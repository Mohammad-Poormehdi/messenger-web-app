import clsx from "clsx";
import { HTMLAttributes, InputHTMLAttributes, forwardRef } from "react";
import { FieldErrors } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  errors: FieldErrors;
  disabled?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, label, errors, disabled, ...props }, ref) => {
    return (
      <div className="">
        <label
          htmlFor={id}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {label}
        </label>
        <div className="mt-2">
          <input
            className={clsx(
              "form-input block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus-within:ring-sky-600 sm:text-sm sm:leading-6",
              errors[id] && "focus:ring-rose-500",
              disabled && "opacity-50 cursor-default"
            )}
            id={id}
            disabled={disabled}
            ref={ref}
            autoComplete={id}
            {...props}
          />
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
