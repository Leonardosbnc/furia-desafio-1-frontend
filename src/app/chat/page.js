"use client";

import { useWebSocket } from "@/hooks/useWebSocket";
import { showToast } from "@/toast-helper";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [loadingAnswer, setLoadingAnswer] = useState(false);

  const scrollableRef = useRef(null);

  const { sendMessage, hasError, isConnected } = useWebSocket(
    "ws/chat",
    (msg) => {
      setMessages((prev) => [...prev, { sender: "bot", message: msg }]);
      setLoadingAnswer(false);
    }
  );

  const handleSendMessage = async () => {
    if (!isConnected || hasError || loadingAnswer || message.length === 0) {
      return;
    }

    setLoadingAnswer(true);
    setMessages((prev) => [...prev, { sender: "user", message }]);
    sendMessage(message);
    setMessage("");
    setLoadingAnswer(false);
  };

  const onKeyPress = (e) => {
    if (e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    scrollableRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      showToast("error", "Algo deu errado. Tente novamente mais tarde");
      window.location.href = "/";
    }
  }, []);

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      {messages.length > 0 && (
        <div className="flex flex-col p-2 pb-6 space-y-1 h-[85%] bg-[#FAF9F6] border-1 border-gray-300 w-[80%] rounded-t-lg overflow-y-auto">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex ${
                m.sender === "user" ? "justify-start" : "justify-end"
              }`}
              ref={idx + 1 === messages.length ? scrollableRef : null}
            >
              <div
                className={`flex flex-col space-y-1 w-fit p-3 rounded-b-lg max-w-[70%] ${
                  m.sender === "user"
                    ? "bg-gray-900 text-white rounded-tr-lg"
                    : "border-1 border-gray-300 text-black bg-white rounded-tl-lg"
                }`}
              >
                <div
                  className={`flex ${
                    m.sender === "user" ? "justify-start" : "justify-end"
                  }`}
                >
                  <span className="text-lg font-bold">
                    {m.sender === "user" ? "You" : "Furia Bot"}
                  </span>
                </div>
                <span>{m.message}</span>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="flex w-[80%]">
        <textarea
          value={message}
          onChange={({ target: { value } }) => setMessage(value)}
          className={`w-11/12 bg-gray-900  text-white p-2 resize-none ${
            messages.length > 0 ? "rounded-bl-lg" : "rounded-l-lg"
          }`}
          rows={1}
          placeholder="Pergunte aqui"
          onKeyDown={onKeyPress}
        />

        <button
          className={`flex justify-center items-center w-1/12 bg-gray-200 border-1 border-gray-300 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 ${
            messages.length > 0 ? "rounded-br-lg" : "rounded-r-lg"
          }`}
          onClick={handleSendMessage}
          disabled={
            !isConnected || hasError || loadingAnswer || message.length === 0
          }
        >
          <Image src="send.svg" alt="send message" height={24} width={24} />
        </button>
      </div>
    </div>
  );
}
