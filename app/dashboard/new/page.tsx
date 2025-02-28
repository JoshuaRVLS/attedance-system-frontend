"use client";

import axios from "axios";
import { FormEvent, useState, useEffect } from "react";
import { Class } from "@/app/types/class";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function NewStudent() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [studentClasses, setStudentClasses] = useState<Class[]>([]);
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [file, setFile] = useState<Blob>();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("studentClassId", selectedClass);
    formData.append("file", file as Blob);

    const response = await axios.post(
      `http://192.168.100.7:8000/api/v1/students`,
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
      router.push("/dashboard");
    }
  };

  const getClasses = async () => {
    try {
      const response = await axios.get(
        "http://192.168.100.7:8000/api/v1/classes"
      );
      if (response.status === 200) {
        setStudentClasses(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getClasses();
  }, []);

  return (
    <div className="flex w-full font-montserrat gap-12 h-full justify-center items-center flex-col">
      <div className="flex flex-col gap-2 items-center">
        <h1 className="text-6xl">Add New Student</h1>
        <small className="font-extralight font-sans text-lg">
          This features is only for debugging and wont be used in production
        </small>
      </div>
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        autoCorrect="off"
        className="flex flex-col gap-2 text-black"
      >
        <input
          className="p-4 font-montserrat stroke-none text-lg"
          required
          placeholder="Nama Depan"
          type="text"
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          className="p-3 font-montserrat stroke-none text-lg"
          required
          placeholder="Nama Belakang"
          type="text"
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <option value="">Pilih kelas</option>
          {studentClasses &&
            studentClasses.map(({ id, value }, idx) => (
              <option key={idx} value={id}>
                {value}
              </option>
            ))}
        </select>
        <input
          className="text-white"
          type="file"
          name="file"
          onChange={(e) => setFile(e.target.files?.[0])}
        />
        <button
          className="text-white bg-primary shadow-xl p-4 mt-4 border border-secondary transition-all duration-300 hover:opacity-80"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
