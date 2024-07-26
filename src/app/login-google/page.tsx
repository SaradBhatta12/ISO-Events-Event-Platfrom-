"use client";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
const page = () => {
  const { data: session } = useSession();

  session ? (
    <div className="main text-white ">
      <h1>heyy {session.user?.email}</h1>
    </div>
  ) : (
    <div className="login text-white">
      <button onClick={() => signIn("google")}>continue with google</button>
    </div>
  );
};

export default page;
