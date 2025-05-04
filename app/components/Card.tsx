"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { Student } from "../types/student";
import axios from "axios";

const Card = ({
  data,
  setData,
}: {
  data: Student;
  setData: React.Dispatch<React.SetStateAction<Student | null>>;
}) => {
  useEffect(() => {
    (async () => {
      const data = localStorage.getItem("user");
      const parsedData: Student = JSON.parse(data as string);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/students/${parsedData.id}/photo`
        );
        if (!response.data) {
          localStorage.removeItem("user");
          setData(null);
        }
        parsedData.photo = response.data;
      } catch (error) {
        console.log(error);
      }
      setData(parsedData);
      console.log(data);
    })();
  }, [data, setData]);

  return (
    data && (
      <div className="w-full p-2  h-full flex justify-center items-center font-montserrat font-bold text-2xl">
        <div className="relative bg-primary shadow-lg p-8 pt-12 rounded-md flex flex-col justify-center items-center gap-3">
          <h1>
            Halo, {data?.firstName} {data?.lastName}❤️
          </h1>
          <Image
            className="absolute -top-8 object-contain rounded-md size-20"
            src={"/logo.png"}
            width={70}
            height={70}
            alt="logo tarki"
          />

          <small className="font-montserrat font-light text-sm">
            Kamu hadir pada pada tanggal{" "}
            <span className="font-bold">
              {new Date(data.createdAt).toLocaleString("id-ID", {
                dateStyle: "long",
              })}
            </span>
          </small>
        </div>
      </div>
    )
  );
};

export default Card;
