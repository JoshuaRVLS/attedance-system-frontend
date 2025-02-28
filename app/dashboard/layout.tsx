import { Metadata } from "next";
import Navbar from "../components/Navbar";
import "@/app/globals.css";
import Footer from "../components/Footer";
import SocketIOProvider from "../providers/SocketIOProvider";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "View and manage your students.",
};

export default function StudentsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
