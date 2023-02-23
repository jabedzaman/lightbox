import React, { useEffect, useState } from "react";
import Link from "next/link";
import * as fcl from "@onflow/fcl";
export default function Header() {
  const [user, setUser] = useState({ loggedIn: null });
  useEffect(() => fcl.currentUser.subscribe(setUser), []);

  const AuthedState = () => {
    return (
      <div className="flex flex-row space-x-3  items-start">
        <div >Address: {user?.addr ?? "No Address"}</div>
      </div>
    );
  };

  const UnauthenticatedState = () => {
    return (
      <div className="flex flex-row space-x-4">
        <button
          className="hover:underline underline-offset-4 duration-200 ease-in-out"
          onClick={fcl.logIn}
        >
          Log In
        </button>
        <button
          className="hover:underline underline-offset-4 duration-200 ease-in-out"
          onClick={fcl.signUp}
        >
          Sign Up
        </button>
      </div>
    );
  };

  return (
    <div className="p-5 text-white fixed w-full z-50 header">
      <div className="max-w-7xl mx-auto text-3xl font-bold flex justify-between items-center">
        <Link
          href="/"
          className="hover:underline underline-offset-4 duration-200 ease-in-out"
        >
          lightbox
        </Link>
        <div className="">
          {user.loggedIn ? <AuthedState /> : <UnauthenticatedState />}
        </div>
      </div>
    </div>
  );
}
