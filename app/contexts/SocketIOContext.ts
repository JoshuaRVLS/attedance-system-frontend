'use client';
import { createContext, useContext } from "react"
import { Socket } from "socket.io-client";
import { Student } from "../types/student";

type SocketIOType = {
    lastStudent: Student | null;
    setLastStudent: (student: Student | null) => void;
    socket: typeof Socket | null;
    sendMessage: (message: string) => void;
    lastMessage: string | null;
    setLastMessage: (message: string) => void;
}

export const SocketIOContext = createContext<SocketIOType | null>(null);

export default function useSocketIO() {
    return useContext(SocketIOContext);
}