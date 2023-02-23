import Head from "next/head";
import "../flow/config";
import { useState, useEffect } from "react";
import * as fcl from "@onflow/fcl";
import Post from "@/components/Post";

export default function Home() {
  const [user, setUser] = useState({ loggedIn: null });
  const [name, setName] = useState(""); // NEW

  useEffect(() => fcl.currentUser.subscribe(setUser), []);

  // NEW
  const sendQuery = async () => {
    const profile = await fcl.query({
      cadence: `
        import Profile from 0xProfile

        pub fun main(address: Address): Profile.ReadOnly? {
          return Profile.read(address)
        }
      `,
      args: (arg, t) => [arg(user.addr, t.Address)],
    });

    setName(profile?.name ?? "No Profile");
  };

  const AuthedState = () => {
    return (
      <div>
        {/* <div>Address: {user?.addr ?? "No Address"}</div> */}
        {/* <div>Profile Name: {name ?? "--"}</div>  */}
        {/* <button onClick={sendQuery}>Send Query</button>  */}
        <div className="p-10 flex flex-col space-y-4">
          <Post
            post="piente id voluptates, laboriosam magni dolore eligendi impedit repellendus sed quo quod, dignissimos quisquam ad quasi numquam optio, earum natus totam quidem!"
            user="hosenur"
            imgsrc="https://jabed.me/spotiloader.png"
          />
          <Post
            post="piente id voluptates, laboriosam magni dolore eligendi impedit repellendus sed quo quod, dignissimos quisquam ad quasi numquam optio, earum natus totam quidem!"
            user="hosenur"
            imgsrc="https://jabed.me/spotiloader.png"
          />
          <Post
            post="piente id voluptates, laboriosam magni dolore eligendi impedit repellendus sed quo quod, dignissimos quisquam ad quasi numquam optio, earum natus totam quidem!"
            user="hosenur"
            imgsrc="https://jabed.me/spotiloader.png"
          />
          <Post
            post="piente id voluptates, laboriosam magni dolore eligendi impedit repellendus sed quo quod, dignissimos quisquam ad quasi numquam optio, earum natus totam quidem!"
            user="hosenur"
            imgsrc="https://jabed.me/spotiloader.png"
          />
        </div>
      </div>
    );
  };

  const UnauthenticatedState = () => {
    return <div></div>;
  };

  return (
    <div className="text-white">
      <Head>
        <title>FCL Quickstart with NextJS</title>
        <meta name="description" content="My first web3 app on Flow!" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      {user.loggedIn ? <AuthedState /> : <UnauthenticatedState />}
    </div>
  );
}
