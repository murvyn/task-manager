"use client";

import { loginUser } from "@/helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ZodType, z } from "zod";
import { FaHome } from "react-icons/fa";
import toast from "react-hot-toast";

interface FormData {
  email: string;
  password: string;
}

export default function Login() {
  const schema: ZodType<FormData> = z.object({
    email: z.string().email(),
    password: z.string().nonempty("Password is required"),
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const submitHandler = async ({ email, password }: FormData) => {
    try {
      setLoading(true);
      const res = await loginUser({ email, password });
      if (res?.error === "CredentialsSignin") {
        toast.error("Invalid email or password", {
          duration: 3000,
          position: "bottom-left",
        });
        return;
      } else if (res?.error) {
        toast.error("This is an error, try again!", {
          duration: 3000,
          position: "bottom-left",
        });
        return;
      }
      if (res?.ok) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.log("something went wrong", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="m-3 absolute z-50">
        <span
          className="btn btn-ghost text-lg "
          onClick={() => router.push("/")}
        >
          <FaHome />
        </span>
      </div>
      <div className="fixed top-0 left-0 z-10 w-full h-full  ">
        <div className="items-center h-full w-full justify-center flex flex-col">
          <h1 className="mb-1 text-4xl max-sm:text-3xl font-bold">
            Welcome to Taskify
          </h1>
          <h2 className="text-xl">Log in to Manage Tasks</h2>
          <form
            className="w-96 max-sm:w-72 m-8 space-y-4"
            onSubmit={handleSubmit(submitHandler)}
          >
            <div className="mb-3">
              <input
                {...register("email", { required: true })}
                className="input input-bordered w-full "
                type="email"
                name="email"
                id="email"
                placeholder="Email"
              />
              {errors.email && (
                <span className="text-error text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="mb-3">
              <input
                {...register("password", { required: true })}
                className="input input-bordered w-full "
                type="password"
                name="password"
                id="password"
                placeholder="Password"
              />
              {errors.password && (
                <span className="text-error text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>

            <button
              disabled={loading}
              className="btn btn-primary w-full"
              type="submit"
            >
              {loading && (
                <span className="loading loading-dots loading-sm"></span>
              )}
              Login
            </button>
          </form>
          <div>
            <p>
              Need an account?{" "}
              <Link
                href="/auth/sign-up"
                className="link link-primary hover:cursor-pointer"
              >
                sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
