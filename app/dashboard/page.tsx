"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import StudentCard from "../components/StudentCard";
import { Student } from "../types/student";
import useSocketIO from "../contexts/SocketIOContext";
import LatestScannedStudent from "../components/LatestScannedStudent";
import Menu from "../components/Menu";

export default function Dashboard() {
  const [students, setStudents] = useState<Student[] | null>(null);
  const { lastMessage, setLastMessage } = useSocketIO()!;

  const getUsers = async () => {
    try {
      const response = await axios.get(
        `http://192.168.100.7:8000/api/v1/students`
      );
      if (response.status === 200) {
        setStudents(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
    setLastMessage("");
  }, [lastMessage, setLastMessage]);

  return (
    <div className="flex mt-20 items-center gap-12 justify-center">
      <Menu students={students} setStudents={setStudents} />
      <div className="flex p-10 flex-col rounded-lg gap-3 max-h-[80dvh] min-w-[40rem] max-w-[40rem] min-h-[80dvh] overflow-scroll scrollbar-hide shadow-xl border border-black">
        {students && students.length === 0 && "No Students"}
        {!students
          ? "Loading User"
          : students.map((student) => (
              <StudentCard key={student.id} student={student} />
            ))}
      </div>
      <LatestScannedStudent />
    </div>
  );
}
