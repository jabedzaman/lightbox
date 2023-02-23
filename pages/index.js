import Head from "next/head";
import "../flow/config";
import { useState, useEffect } from "react";
import * as fcl from "@onflow/fcl";
import Post from "@/components/Post";

export default function Home() {
  const [user, setUser] = useState({ loggedIn: null });

  useEffect(() => fcl.currentUser.subscribe(setUser), []);

  const AuthedState = () => {
    const CreatePost = () => {
      const [post, setPost] = useState("");
      const user = fcl.currentUser().snapshot().addr;
      const submitPost = async (e) => {
        e.preventDefault();
        const txId = await fcl
          .send([
            fcl.transaction`
              import Profile from 0xProfile
              transaction(post: String) {
                prepare(account: AuthAccount) {
                  let profile = Profile.init(account)
                  profile.addPost(post: post)
                }
              }
            `,
            fcl.args([fcl.arg(post, fcl.types.String)]),
            fcl.proposer(fcl.currentUser().authorization),
            fcl.payer(fcl.currentUser().authorization),
            fcl.authorizations([fcl.currentUser().authorization]),
            fcl.limit(35),
          ])
          .then(fcl.decode);
        console.log(txId);
      };

      return (
        <div className="max-w-6xl mx-auto p-10 mt-10 border border-white flex flex-col">
          <div>
            <h1 className="text-4xl">Create Post</h1>
          </div>
          <div className="flex flex-row">
            <input
              className="w-full text-black focus:outline-none px-10 py-2 "
              type="text"
              value={post}
              onChange={(e) => setPost(e.target.value)}
              placeholder="type here something..."
            />
            <button className="px-10 text-2xl" onClick={submitPost}>
              Post
            </button>
          </div>
        </div>
      );
    };
    return (
      <div>
        <CreatePost />
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
