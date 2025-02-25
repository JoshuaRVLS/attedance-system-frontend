"use client";

import React from "react";
import { Student } from "../types/student";
import Image from "next/image";
// import { HiDownload, HiTrash, HiPencil } from 'react-icons/hi';
import { useQRCode } from "next-qrcode";

const StudentCard = ({ student }: { student: Student }) => {
  const { Canvas } = useQRCode();

  return (
    <div className="flex flex-col font-montserrat relative justify-center rounded-md items-start gap-2 bg-primary p-2 shadow-lg border border-secondary">
      <div className="flex justify-between w-full items-center gap-2">
        <div className="flex gap-2 items-center">
          <Image
            className="border-black shadow-lg border object-cover rounded-full size-12"
            src={`data:${student.photo.mimetype};base64,${Buffer.from(
              student.photo.data
            ).toString("base64")}`}
            width={50}
            height={50}
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
            className={`border p-2 rounded-md ${
              student.isPresent ? "bg-green-500" : "bg-red-500"
            }`}
          >
            <span className="font-montserrat font-semibold">
              {student.isPresent ? "Sudah Hadir" : "Belum Hadir"}
            </span>
          </div>
          <Canvas
            text={student.id}
            options={{
              width: 100,
            }}
          />
        </div>
      </div>

      {/* Student Status */}
    </div>
  );
};

export default StudentCard;
