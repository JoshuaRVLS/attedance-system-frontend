"use client";

import React, { useState } from "react";
import { Student } from "../types/student";
import Image from "next/image";
// import { HiDownload, HiTrash, HiPencil } from 'react-icons/hi';
import { useQRCode } from "next-qrcode";
import { AnimatePresence, motion } from "motion/react";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";
import ShowPhoto from "./ShowPhoto";

const StudentCard = ({
  student,
  showQR,
}: {
  student: Student;
  showQR: boolean;
}) => {
  const { Canvas } = useQRCode();
  const [showPhoto, setShowPhoto] = useState<boolean>(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
      exit={{ opacity: 0, y: 20 }}
      className="flex flex-col font-montserrat relative justify-center rounded-md items-start gap-2 bg-primary p-2 shadow-lg border border-secondary"
    >
      {showPhoto && (
        <ShowPhoto
          setShowPhoto={setShowPhoto}
          data={student.photo.data}
          mimetype={student.photo.mimetype}
        />
      )}
      <div className="flex justify-between w-full items-center gap-2">
        <div className="flex gap-2 items-center">
          <Image
            className="shadow-lg object-cover rounded-full size-14"
            src={`data:${student.photo.mimetype};base64,${Buffer.from(
              student.photo.data
            ).toString("base64")}`}
            onClick={() => setShowPhoto(true)}
            width={70}
            height={70}
            alt="profile_photo"
          />
          <div className="flex flex-col">
            <span className="font-semibold">
              {student.firstName} {student.lastName}
            </span>
            <small className="font-light">{student.class.value}</small>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <div
            className={`border p-1 rounded-lg ${
              student.isPresent
                ? "text-green-400 border-green-400"
                : "text-red-400 border-red-400"
            }`}
          >
            {student.isPresent ? (
              <HiCheckCircle size={25} />
            ) : (
              <HiXCircle size={25} />
            )}
          </div>
          <AnimatePresence>
            {showQR && (
              <motion.div
                exit={{ opacity: 0, height: 0 }}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
              >
                <Canvas
                  text={student.id}
                  options={{
                    width: 100,
                    type: "image/png",
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      {/* Student Status */}
    </motion.div>
  );
};

export default StudentCard;
