import { Metadata } from "next";
import Navbar from "../../../components/Navbar";
import "@/app/globals.css";
import Footer from "../../../components/Footer";
import SocketIOProvider from "../../../providers/SocketIOProvider";
import { auth } from "../../../lib/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "View and manage your students.",
};

export default async function StudentsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <div className="w-full h-full">
      <SocketIOProvider>
        <Navbar />
        {children}
        <Footer />
      </SocketIOProvider>
    </div>
  );
}
