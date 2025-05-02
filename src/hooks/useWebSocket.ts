import { useEffect, useRef, useState } from "react";

export function useWebSocket<T = any>(
  url: string,
  onMessage?: (data: T) => void
) {
  const socketRef = useRef<WebSocket | null>(null);
  const [connecting, setIsConnecting] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_WSS_SERVER_URL;
    const authToken = localStorage.getItem("authToken");
    const finalUrl = `${baseUrl}/${url}${
      authToken ? "?token=" + authToken : ""
    }`;
    const socket = new WebSocket(finalUrl);
    socketRef.current = socket;

    socket.onopen = () => {
      setIsConnecting(false);
      setIsConnected(true);
      console.log("WebSocket connected");
    };

    socket.onmessage = (event) => {
      try {
        onMessage?.(event.data);
      } catch (err) {
        console.error("WebSocket message error:", err);
      }
    };

    socket.onclose = () => {
      setIsConnected(false);
      console.log("WebSocket disconnected");
    };

    socket.onerror = (error) => {
      setIsConnecting(false);
      setIsConnected(false);
      console.error("WebSocket error:", error);
    };

    return () => {
      socket.close();
    };
  }, []);

  const sendMessage = (data: any) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(data));
    } else {
      console.warn("WebSocket is not open");
    }
  };

  return { sendMessage, isConnected, connecting };
}
