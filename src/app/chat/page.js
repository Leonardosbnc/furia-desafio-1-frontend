"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [loadingAnswer, setLoadingAnswer] = useState(false);
  const [connecting, setConnecting] = useState(true);

  const handleSendMessage = async () => {
    setLoadingAnswer(true);
    setMessages((prev) => [...prev, { sender: "user", message }]);
    setMessage("");
    setLoadingAnswer(false);
  };

  const handleLoad = async () => {
    setConnecting(false);
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <div className="flex flex-col p-2 space-y-1 h-[85%] bg-[#FAF9F6] border-1 border-gray-300 w-[80%] rounded-t-lg">
        {messages.map((m, idx) => (
          <div
            className={`flex ${
              m.sender === "user" ? "justify-start" : "justify-end"
            }`}
          >
            <div
              key={idx}
              className="w-fit text-white bg-gray-900 p-2 rounded-lg max-w-[70%]"
            >
              {m.message}
            </div>
          </div>
        ))}
      </div>
      <div className="flex w-[80%]">
        <textarea
          value={message}
          onChange={({ target: { value } }) => setMessage(value)}
          className="w-11/12 bg-gray-900 rounded-bl-lg text-white p-2 resize-none"
          rows={1}
        />

        <button
          className="flex justify-center items-center w-1/12 rounded-br-lg bg-gray-200 border-1 border-gray-300 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          onClick={handleSendMessage}
          disabled={connecting || loadingAnswer || message.length === 0}
        >
          <Image src="send.svg" alt="send message" height={24} width={24} />
        </button>
      </div>
    </div>
  );
}
