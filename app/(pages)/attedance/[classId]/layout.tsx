import { Metadata } from "next";
import axios from "axios";
import { Class } from "@/app/types/class";

type Props = {
  params: {
    classId: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { classId } = params;
  const { data }: { data: Class } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}:8000/api/v1/classes/${classId}/?withStudents=false`
  );

  return {
    title: `Attedance for class ${data.value}`,
    description: "Attedance system for class " + data.value,
  };
}

export default async function AttedanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
