"use client";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { nanoid } from "nanoid";
import React, { FC, HTMLAttributes, useState } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";

interface ChatInputProps extends HTMLAttributes<HTMLDivElement> {}

const ChatInput: FC<ChatInputProps> = ({ className, ...props }) => {
  const [input, setInput] = useState<string>("");

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      const message = {
        id: nanoid(),
        isUserInput: true,
        text: input,
      };

      // sendMessage(message);
    }
  };

  const { mutate: sendMessage, isPending } = useMutation({
    mutationFn: async (message) => {
      const response = await fetch("/api/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: "hello" }),
      });
      return response.body;
    },
    onSuccess: () => {
      console.log("success");
    },
  });

  return (
    <div {...props} className={cn("border-t border-zinc-300", className)}>
      <div className="relative mt-4 flex-1 overflow-hidden rounded-lg border-none outline-none">
        <ReactTextareaAutosize
          rows={2}
          onKeyDown={handleKeyDown}
          maxRows={4}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoFocus
          placeholder="Write a message..."
          className="peer disabled:opacity-50 pr-14 resize-none block w-full border-0 bg-zinc-100 py-1.5 text-gray-900 focus:ring-0 text-sm sm:leading-6 "
        />
      </div>
    </div>
  );
};

export default ChatInput;
