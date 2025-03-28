import { auth } from "@/app/lib/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "View and manage your students.",
};

export default async function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (session) redirect("/dashboard");

  return <div className="w-full h-full">{children}</div>;
}
