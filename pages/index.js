import Head from "next/head";
import "../flow/config";
import { useState, useEffect } from "react";
import * as fcl from "@onflow/fcl";
import Post from "@/components/Post";

export default function Home() {
  const [user, setUser] = useState({ loggedIn: null });

  useEffect(() => fcl.currentUser.subscribe(setUser), []);

  const AuthedState = () => {
    return (
      <div>
        <div className="p-10 flex flex-col space-y-4">
          <Post
            post="piente id voluptates, laboriosam magni dolore eligendi impedit repellendus sed quo quod, dignissimos quisquam ad quasi numquam optio, earum natus totam quidem!"
            user="hosenur"
          />
        </div>
      </div>
    );
  };

  const UnauthenticatedState = () => {
    return (
      <div className="max-w-7xl bg-white mx-auto p-10 text-9xl rounded-3xl min-h-screen flex items-center">
        <span>
          OOOOOOOPS ;( IT SEEMS LIKE YOU ARE NOT LOGGED IN, PLEASE{" "}
          <span className="text-emerald-400">LOGIN</span> TO CONTINUE 😀
        </span>
      </div>
    );
  };

  return (
    <div className="pt-20">
      <Head>
        <title>FCL Quickstart with NextJS</title>
        <meta name="description" content="My first web3 app on Flow!" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      {user.loggedIn ? <AuthedState /> : <UnauthenticatedState />}
    </div>
  );
}
