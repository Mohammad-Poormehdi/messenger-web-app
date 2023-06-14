"use client";

import { ButtonHTMLAttributes, ReactNode, forwardRef } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
  children?: ReactNode;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ fullWidth, children, secondary, danger, disabled }, ref) => {
    return (
      <button
        disabled={disabled}
        className={clsx(
          "flex justify-center rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
          disabled && "opacity-50 cursor-default",
          fullWidth && "w-full",
          secondary ? "text-gray-900" : "text-white",
          danger &&
            "bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600",
          !secondary &&
            !danger &&
            "bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600"
        )}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Input";
export default Button;
