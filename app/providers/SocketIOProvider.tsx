"use client";

import React, { useState, useEffect } from "react";
import { SocketIOContext } from "../contexts/SocketIOContext";
import io, { Socket } from "socket.io-client";
import { Student } from "../types/student";

const SocketIOProvider = ({ children }: { children: React.ReactNode }) => {
  const [lastMessage, setLastMessage] = useState<string | null>(null);
  const [lastStudent, setLastStudent] = useState<Student | null>(null);
  const [socket, setSocket] = useState<typeof Socket | null>(null);

  useEffect(() => {
    const newSocket = io("http://192.168.100.7:8000");
    newSocket.on("connect", () => {
      console.log("connected");
      setSocket(newSocket);
    });

    newSocket.on("newPresentStudent", (student: Student) => {
      setLastMessage("newPresentStudent");
      console.log(student);
      setLastStudent(student);
    });

    newSocket.on("newStudent", () => {
      setLastMessage("newStudent");
    });
  }, []);

  const sendMessage = (message: string) => {
    socket?.emit("message", message);
  };

  return (
    <SocketIOContext.Provider
      value={{
        socket,
        lastMessage,
        sendMessage,
        setLastMessage,
        lastStudent,
        setLastStudent,
      }}
    >
      {children}
    </SocketIOContext.Provider>
  );
};

export default SocketIOProvider;
