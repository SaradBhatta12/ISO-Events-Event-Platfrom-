"use client";
import Head from "next/head";
import { useState } from "react";
import { FaUser, FaLock, FaEnvelope, FaGoogle } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
const page = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      // Call API or perform registration logic here

      let res = await axios.post(`/api/auth/login`, {
        username,
        password,
      });
      if (!res.data.success == true) {
        router.push("login");
        toast.success(res.data.message);
      } else {
        router.push("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log("internal server error ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
      <Head>
        <title>Login</title>
      </Head>
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-4 bg-white rounded shadow-md"
      >
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="username"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Username"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
            />
          </div>
        </div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={(event) => setRememberMe(event.target.checked)}
              className="mr-2"
            />
            <label className="text-gray-600 text-sm" htmlFor="remember-me">
              Remember me
            </label>
          </div>
          <button
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Login
          </button>
        </div>

        <button
          type="submit"
          className=" w-full text-white bg-blue-600 p-2 e-950  rounded flex items-center justify-center gap-3"
        >
          <FaGoogle /> Signin with Google{" "}
        </button>
        <p className="text-gray-600 text-sm p-3">
          Have not accoutn yet?{" "}
          <Link
            href="/register"
            className="text-orange-500 hover:text-orange-700"
          >
            Register
          </Link>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
};

export default page;
