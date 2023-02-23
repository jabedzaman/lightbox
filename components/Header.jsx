import React, { useEffect, useState } from "react";
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
      <div>
        <button onClick={fcl.logIn}>Log In</button>
        <button onClick={fcl.signUp}>Sign Up</button>
      </div>
    );
  };

  return (
    <div className="p-5 text-3xl font-bold flex justify-between items-center text-white bg-black border-b">
      <div>lightbox</div>
      <div className="text-2xl">{user.loggedIn ? <AuthedState /> : <UnauthenticatedState />}</div>
    </div>
  );
}
