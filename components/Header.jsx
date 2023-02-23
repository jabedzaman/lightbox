import React, { useEffect, useState } from "react";
import Link from "next/link";
import * as fcl from "@onflow/fcl";
export default function Header() {
  const [user, setUser] = useState({ loggedIn: null });
  const [name, setName] = useState(null);
  useEffect(() => fcl.currentUser.subscribe(setUser), [])

  const AuthedState = () => {
    return (
      <div>
        <div>Address: {user?.addr ?? "No Address"}</div>
        <div>Profile Name: {name ?? "--"}</div>
        <button onClick={sendQuery}>Send Query</button>
        <button onClick={fcl.unauthenticate}>Log Out</button>
      </div>
    );
  };

  const UnauthenticatedState = () => {
    return (
      <div className="flex flex-row space-x-4">
        <button className="hover:underline underline-offset-4 duration-200 ease-in-out" onClick={fcl.logIn}>Log In</button>
        <button className="hover:underline underline-offset-4 duration-200 ease-in-out" onClick={fcl.signUp}>Sign Up</button>
      </div>
    );
  }

  return (
    <div className="p-5 text-white bg-black border-b">
      <div className="max-w-5xl mx-auto p-5 text-3xl font-bold flex justify-between items-center">
      <Link href="/" className="hover:underline underline-offset-4 duration-200 ease-in-out">lightbox</Link>
      <div className="text-2xl">{user.loggedIn ? <AuthedState /> : <UnauthenticatedState />}</div>
      </div>
    </div>
  );
}
 