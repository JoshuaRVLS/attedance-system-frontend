"use client";

import { Class } from "@/app/types/class";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import WebCam from "react-webcam";
import { HiCamera, HiXMark } from "react-icons/hi2";
import { AnimatePresence, motion } from "framer-motion"; // Note: Correct import is from 'framer-motion'
import Image from "next/image";
import Loading from "@/app/components/Loading";
import toast from "react-hot-toast";
import { Student } from "@/app/types/student";
import Card from "@/app/components/Card";

type FormStep = "info" | "camera";

const AttendancePage = ({
  params,
}: {
  params: Promise<{ classId: string }>;
}) => {
  const { classId } = React.use(params);
  const webCamRef = useRef<WebCam>(null);
  const [currentClass, setCurrentClass] = useState<Class | null>(null);
  const [currentStep, setCurrentStep] = useState<FormStep>("info");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [imageSrc, setImageSrc] = useState<string>("");
  const [cameraLoading, setCameraLoading] = useState<boolean>(true);
  const [data, setData] = useState<Student | null>(null);

  useEffect(() => {
    console.log(data);
    (async () => {
      const data = localStorage.getItem("user");
      if (!data) return setData(null);
      const parsedData: Student = JSON.parse(data);
      setData(parsedData);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get<Class>(
          `${process.env.API_URL}/api/v1/classes/${classId}/?withStudents=false`
        );
        setCurrentClass(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [classId]);

  const submitData = async () => {
    const formData = new FormData();
    const imageBlog = await (await fetch(imageSrc)).blob();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("studentClassId", classId);
    formData.append("file", imageBlog);
    try {
      const response = await axios.post(
        `${process.env.API_URL}/api/v1/students`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        toast.success("Student added successfully", {
          duration: 3000,
          position: "top-center",
        });
      }
      setData(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  const capture = async () => {
    const image = webCamRef.current?.getScreenshot();
    if (image) setImageSrc(image);
  };

  const handleNext = async () => {
    if (currentStep === "info") {
      setCurrentStep("camera");
    } else {
      await submitData();
    }
  };

  const handleBack = () => {
    setCurrentStep("info");
  };

  return !data ? (
    <div className="w-full h-full flex flex-col justify-center gap-4 items-center">
      <div className="flex flex-col gap-1 items-center">
        <h1 className="font-montserrat text-2xl font-bold stroke-secondary stroke-2">
          Absen untuk kelas {currentClass?.value}
        </h1>
        <small className="font-light font-montserrat tracking-wide">
          Tolong masukan data dengan benar dan crosscheck.
        </small>
      </div>

      <div className="w-full max-w-md h-fit">
        <AnimatePresence mode="wait" initial={false}>
          {currentStep === "info" && (
            <motion.div
              key="info-form"
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full flex flex-col gap-3 p-4"
            >
              <input
                className="border p-3 rounded-sm text-black"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                placeholder="Nama Depan"
              />
              <input
                className="border p-3 rounded-sm text-black"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                placeholder="Nama Belakang"
              />
            </motion.div>
          )}
          {currentStep === "camera" && (
            <motion.div
              key="camera-step"
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full relative flex flex-col border-secondary border"
            >
              {cameraLoading && (
                <Loading text="Loading Camera" duration={0.3} />
              )}
              {imageSrc ? (
                <Image
                  src={imageSrc}
                  alt="Gambar"
                  className="w-full h-60 object-cover"
                  width={50}
                  height={50}
                />
              ) : (
                <WebCam
                  audio={false}
                  ref={webCamRef}
                  mirrored={true}
                  onUserMedia={() => setCameraLoading(false)}
                  screenshotFormat="image/jpeg"
                  className="w-full h-60 object-cover rounded-md"
                />
              )}
              <div className="w-full absolute bottom-2 left-0 flex gap-2 justify-center">
                {!imageSrc ? (
                  <HiCamera
                    onClick={capture}
                    className="mt-4  bg-blue-500 text-white p-2 rounded-full"
                    size={40}
                  />
                ) : (
                  <HiXMark
                    onClick={() => setImageSrc("")}
                    className="mt-4 bg-blue-500 text-white p-2 rounded-full"
                    size={40}
                  />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex gap-4 w-[90%] md:w-fit md:min-w-40">
        {currentStep === "camera" && (
          <>
            <button
              onClick={handleBack}
              className="bg-gray-500 shadow-md w-full transition-all duration-300 hover:opacity-80 rounded-md h-12"
            >
              Kembali
            </button>
            <motion.button
              onClick={handleNext}
              disabled={!imageSrc}
              animate={{
                opacity: !imageSrc ? 0.8 : 1,
              }}
              className={` bg-secondary shadow-md w-full transition-all duration-300 hover:opacity-80 rounded-md h-12`}
            >
              Submit
            </motion.button>
          </>
        )}
        {currentStep === "info" && (
          <motion.button
            onClick={handleNext}
            disabled={!firstName || !lastName}
            animate={{
              opacity: !firstName || !lastName ? 0.8 : 1,
            }}
            className={` bg-secondary shadow-md w-full transition-all duration-300 hover:opacity-80 rounded-md h-12`}
          >
            Lanjut
          </motion.button>
        )}
      </div>
    </div>
  ) : (
    <Card data={data} setData={setData} />
  );
};

export default AttendancePage;
