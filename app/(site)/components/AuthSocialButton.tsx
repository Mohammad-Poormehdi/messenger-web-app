"use client";

import { ButtonHTMLAttributes, ReactNode, forwardRef } from "react";
import { IconType } from "react-icons";

interface AuthSocialButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconType;
  children: ReactNode;
}

const AuthSocialButton = forwardRef<HTMLButtonElement, AuthSocialButtonProps>(
  ({ icon: Icon, children }, ref) => {
    return (
      <button className="inline-flex w-full justify-center items-center gap-x-3 bg-white px-4 py-2 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-offset-0 rounded-md">
        <Icon />
        {children}
      </button>
    );
  }
);
AuthSocialButton.displayName = "AuthSocialButton";
export default AuthSocialButton;
