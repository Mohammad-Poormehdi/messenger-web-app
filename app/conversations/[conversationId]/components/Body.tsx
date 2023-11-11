"use client";

import useConversations from "@/app/hooks/useConversations";
import { FullMessageType } from "@/types";
import { useRef, useState, useEffect } from "react";
import MessageBox from "./MessageBox";
import axios from "axios";
import { pusherClient } from "@/libs/pusher";
import { bind, find } from "lodash";

interface BodyProps {
  initialMessages: FullMessageType[];
}

function Body({ initialMessages }: BodyProps) {
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { conversationsId } = useConversations();
  useEffect(() => {
    axios.post(`/api/conversations/${conversationsId}/seen`);
  }, [conversationsId]);

  useEffect(() => {
    pusherClient.subscribe(conversationsId);
    bottomRef?.current?.scrollIntoView;

    const messageHandler = (message: FullMessageType) => {
      axios.post(`/api/conversations/${conversationsId}/seen`)
      setMessages((current) => {
        if (find(current, { id: message.id })) {
          return current;
        }
        return [...current, message];
      });
      bottomRef.current?.scrollIntoView();
    };

    pusherClient.bind("messages:new", () => {});
    return () => {
      pusherClient.unsubscribe(conversationsId);
      pusherClient.unbind("messages:new");
    };
  }, [conversationsId]);

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, i) => (
        <MessageBox
          isLast={i === messages.length - 1}
          key={message.id}
          data={message}
        />
      ))}
      <div ref={bottomRef} className="pt-24" />
    </div>
  );
}

export default Body;
