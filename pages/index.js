import Head from "next/head";
import "../flow/config";
import { useState, useEffect } from "react";
import * as fcl from "@onflow/fcl";
import Post from "@/components/Post";
import Input from "@/components/Input";
import { db } from "../firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

export default function Home() {
  const [user, setUser] = useState({ loggedIn: null });
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setMessages(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          message: doc.data().message,
          //   name: doc.data().
          name: doc.data().name,
          timestamp: doc.data().timestamp,
        }))
      );
    });
    return unsubscribe;
  }, [db]);
  useEffect(() => fcl.currentUser.subscribe(setUser), []);
  console.log(messages);
  const AuthedState = () => {
    return (
      <div>
        <div className="p-10 flex flex-col space-y-4">
          <Input />
          {messages.map((message) => (
            <Post
              key={message.id}
              message={message.message}
              user={message.name}
            />
          ))}
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
