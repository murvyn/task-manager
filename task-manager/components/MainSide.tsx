"use client";
import Image from "next/image";
import React from "react";
import SidebarLinks from "./SidebarLinks";
import noUser from "@/public/no-user.jpg";
import { LuLogOut } from "react-icons/lu";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { IUser } from "@/types";

const MainSide = ({ show }: { show: boolean }) => {
  const { status, data: session } = useSession();
  const user = session?.user as IUser;
  const router = useRouter();
  const handle = async () => {
    const res = await signOut();
    console.log(res);
    router.push("/");
  };
  return (
    <div
      className={`max-sm:hidden card bg-base-200  ${
        show ? "w-[5rem]" : "w-[15rem]"
      } h-auto items-center justify-between py-5 border border-stone-700 bg-base-300 shadow-xl  `}
    >
      <div
        className={`${
          show && "tooltip  hover:tooltip-open tooltip-primary tooltip-right"
        }`}
        data-tip="User Profile"
      >
        <div
          onClick={() => router.push("/dashboard/profile")}
          className="flex flex-col xl:flex-row justify-around gap-4 items-center my-5 max-sm:flex-row sm:px-4"
        >
          <div className="avatar  w-[3.6rem] h-[3.6rem]">
            <Image
              src={user?.photoUrl ? user?.photoUrl : noUser}
              width={60}
              height={60}
              alt="image"
              className="rounded-full object-cover cursor-pointer"
            />
          </div>
          <span
            className={`${
              show && "hidden"
            } text-xl font-bold text-center  xl:text-left max-sm:text-left cursor-pointer inline-block -sm:hidden`}
          >
            {status === "loading" ? (
              <div className="flex flex-col gap-4 items-center">
                <div className="skeleton h-4 w-20"></div>
                <div className="skeleton h-4 w-28"></div>
              </div>
            ) : (
              <p className="capitalize">
                {user && user.firstName} <br /> {user && user.lastName}
              </p>
            )}
          </span>
        </div>
      </div>
      <SidebarLinks show={show} />
      <div
        className={`${
          show && "tooltip  hover:tooltip-open tooltip-primary tooltip-right"
        } w-full`}
        data-tip="Logout"
      >
        <button
          className={`border-r-4 hover:border-r-primary btn btn-ghost rounded-none flex justify-center w-full items-center space-x-5 text-xl ${
            show && "w-[5rem]"
          } `}
          onClick={handle}
        >
          <LuLogOut className="text-primary" />
          <span className={`${show && "hidden"}`}>logout</span>
        </button>
      </div>
    </div>
  );
};

export default MainSide;
