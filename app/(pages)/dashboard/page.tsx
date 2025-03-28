"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import StudentCard from "../../components/StudentCard";
import useSocketIO from "../../contexts/SocketIOContext";
import LatestScannedStudent from "../../components/LatestScannedStudent";
import Menu from "../../components/Menu";
import { motion, AnimatePresence } from "motion/react";
import Loading from "../../components/Loading";
import { useStudentStore } from "../../stores/studentStore";
import { useSelectedClassStore } from "../../stores/selectedClassStore";

export default function Dashboard() {
  const { students, setStudents } = useStudentStore();
  const { lastMessage, setLastMessage } = useSocketIO()!;
  const { selectedClass } = useSelectedClassStore();
  const [showQR, setShowQR] = useState<boolean>(false);

  const getUsers = async () => {
    try {
      const response = await axios.get(
        selectedClass
          ? `${process.env.NEXT_PUBLIC_API_URL}:8000/api/v1/classes/${selectedClass}`
          : `${process.env.NEXT_PUBLIC_API_URL}:8000/api/v1/students`
      );
      if (response.status === 200) {
        setStudents(selectedClass ? response.data.users : response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setStudents([]);
    getUsers();
    setLastMessage("");
  }, [lastMessage, setLastMessage, selectedClass]);

  return (
    <div className="flex h-full items-center gap-12 justify-center ">
      <Menu showQR={showQR} setShowQR={setShowQR} />
      <motion.div
        animate={{
          transition: {
            staggerChildren: 0.3,
          },
        }}
        className="relative flex p-10 flex-col rounded-lg gap-3 max-h-[80dvh] min-w-[40rem] max-w-[40rem] min-h-[80dvh] overflow-scroll scrollbar-hide shadow-xl border border-black"
      >
        <AnimatePresence>
          {!students?.length ? (
            <Loading duration={0.2} text="Loading Students" />
          ) : (
            students.map((student) => (
              <StudentCard showQR={showQR} key={student.id} student={student} />
            ))
          )}
        </AnimatePresence>
      </motion.div>
      <LatestScannedStudent />
    </div>
  );
}
