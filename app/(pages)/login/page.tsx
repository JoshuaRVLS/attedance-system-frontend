"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";

const LoginPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(username, password);
    try {
      await signIn("credentials", {
        username,
        password,
        redirectTo: "/dashboard",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="font-montserrat flex w-full h-full justify-center items-center">
      <form onSubmit={login} className="bg-bg p-2 flex flex-col gap-4">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-3xl font-semibold">Admin Login</h1>
          <small className="font-light">
            Login untuk masuk ke halaman dashboard.
          </small>
        </div>
        <div className="flex-col flex gap-3 text-black">
          <input
            className="p-3 font-light"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <input
            className="p-3 font-light"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
          />
          <button
            type="submit"
            className="text-white bg-primary shadow-xl p-4 mt-2 border border-secondary transition-all duration-300 hover:opacity-80"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
