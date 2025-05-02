import { useEffect, useRef, useState } from "react";

export function useWebSocket(url, onMessage) {
  const socketRef = useRef(null);
  const [hasError, setHasError] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_WSS_SERVER_URL;
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      return;
    }
    const finalUrl = `${baseUrl}/${url}?token=${authToken}`;
    const socket = new WebSocket(finalUrl);
    socketRef.current = socket;

    socket.onopen = () => {
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
      setHasError(true);
      setIsConnected(false);
      console.error("WebSocket error:", error);
    };

    return () => {
      socket.close();
    };
  }, []);

  const sendMessage = (data) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(data));
    } else {
      console.warn("WebSocket is not open");
    }
  };

  return { sendMessage, isConnected, hasError };
}
