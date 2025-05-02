import React, { useEffect, useState } from "react";
import { Class } from "../types/class";
import axios from "axios";
import { HiEye, HiEyeOff, HiShare } from "react-icons/hi";
import { generateCSV } from "../utils/csv";
import { useStudentStore } from "../stores/studentStore";
import { useSelectedClassStore } from "../stores/selectedClassStore";

const Menu = ({
  showQR,
  setShowQR,
}: {
  showQR: boolean;
  setShowQR: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [studentClasses, setStudentClasses] = useState<Class[]>([]);
  const { selectedClass, setSelectedClass } = useSelectedClassStore();
  const { students } = useStudentStore();

  const getClasses = async () => {
    try {
      const response = await axios.get(
        `${process.env.API_URL}/api/v1/classes`
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
      <div className="flex-col flex gap-2 items-center">
        <div
          onClick={() => generateCSV(students!, "students.csv")}
          className="p-3 rounded-md bg-primary border border-primary cursor-pointer flex gap-2 hover:opacity-80"
        >
          <HiShare size={25} />
          <span>Export Data to CSV</span>
        </div>
        <div
          onClick={() => setShowQR((prev) => !prev)}
          className="p-3 rounded-md bg-primary border border-primary cursor-pointer flex gap-2 hover:opacity-80"
        >
          {showQR ? <HiEye size={25} /> : <HiEyeOff size={25} />}
          <span>{showQR ? "Hide" : "Show"} QR</span>
        </div>
        <span className="rounded-full p-3 bg-secondary text-primary font-semibold font-roboto shadow-xl border border-primary">
          Hadir: {students?.filter((student) => student.isPresent).length} /{" "}
          {students?.length}
        </span>
      </div>
    </div>
  );
};

export default Menu;
