import React, { useState, useEffect } from "react";
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
import * as fcl from "@onflow/fcl";
import "../flow/config";

import { db } from "../firebase";
import {
  collection,
  addDoc,
  Timestamp,
} from "firebase/firestore";

function Input() {
  const [user, setUser] = useState({ loggedIn: null });
  const [message, setMessage] = useState("");
  console.log(user.addr);
  useEffect(() => fcl.currentUser.subscribe(setUser), []);
  const addMessage = async (e) => {
    const messageRef = collection(db, "messages");
    try {
      await addDoc(messageRef, {
        name: user.addr,
        message: message,
        timestamp: Timestamp.now(),
      });
      console.log("Document written with ID: ", messageRef.id);
    } catch (error) {
      console.log(error);
    }
    console.log(message);
    setMessage("");
  };
  //  fetch messages from firestore
  //   const [messages, setMessages] = useState([]);
  //   useEffect(() => {
  //     const q = query(collection(db, "messages"), orderBy("timestamp", "desc"));
  //     const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //       setMessages(
  //         querySnapshot.docs.map((doc) => ({
  //           id: doc.id,
  //           message: doc.data().message,
  //           name: doc.data().user.addr,
  //           timestamp: doc.data().timestamp,
  //         }))
  //       );
  //     });
  //     return unsubscribe;
  //   }, [db]);
  //   console.log(messages);
  return (
    <div>
      <div className="max-w-5xl mx-auto px-10 py-4 my-10 flex w-full border border-white
      disabled:color-gray-500 disabled:cursor-not-allowed
      ">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full  focus:outline-none px-10"
        />
        <button
          className="text-white bg-blue-500 px-4 py-2 mx-10"
          disabled={!message}
          onClick={() => {
            addMessage();
          }}
        >
          Post
        </button>
      </div>
    </div>
  );
}

export default Input;