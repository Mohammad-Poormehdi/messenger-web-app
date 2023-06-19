"use client";

import { InputHTMLAttributes, forwardRef } from "react";

interface MessageInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
}

const MessageInput = forwardRef<HTMLInputElement, MessageInputProps>(
  ({ id, ...props }, ref) => {
    return (
      <input
        ref={ref}
        {...props}
        autoComplete={id}
        className="text-black font-light py-2 px-4  bg-neutral-100 w-full rounded-full focus:outline-none"
      />
    );
  }
);
MessageInput.displayName = "MessageInput";
export default MessageInput;
