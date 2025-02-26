import React, { useEffect, useState } from "react";
import { Class } from "../types/class";
import { Student } from "../types/student";
import axios from "axios";

const Menu = ({
  students,
  setStudents,
  selectedClass,
  setSelectedClass,
}: {
  students: Student[] | null;
  setStudents: React.Dispatch<React.SetStateAction<Student[] | null>>;
  selectedClass: string;
  setSelectedClass: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [studentClasses, setStudentClasses] = useState<Class[]>([]);

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
    <div className="font-montserrat font-light border rounded-md border-secondary h-[80dvh] min-w-[13rem] shadow-xl p-4 flex flex-col gap-4 items-center justify-between">
      <div className="flex flex-col gap-4">
        <span
          onClick={() => setSelectedClass("")}
          className={`cursor-pointer  shadow-xl p-2 text-center rounded-full ${
            !selectedClass && "bg-primary border border-secondary font-semibold"
          }`}
        >
          All Class
        </span>
        {!studentClasses
          ? "Loading..."
          : studentClasses.map((studentClass, idx) => (
              <div
                className={`${
                  selectedClass === studentClass.id &&
                  "bg-primary border font-semibold border-secondary"
                } cursor-pointer text-center shadow-xl p-2 rounded-full`}
                key={idx}
                onClick={() => setSelectedClass(studentClass.id)}
              >
                <span>{studentClass.value}</span>
              </div>
            ))}
      </div>
      <div className="flex-col flex gap-2">
        <span>
          Yang Hadir: {students?.filter((student) => student.isPresent).length}{" "}
          / {students?.length}
        </span>
      </div>
    </div>
  );
};

export default Menu;
