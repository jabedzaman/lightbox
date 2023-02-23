import Head from "next/head";
import "../flow/config";
import { useState, useEffect } from "react";
import * as fcl from "@onflow/fcl";
import Post from "@/components/Post";

export default function Home() {
  const [user, setUser] = useState({ loggedIn: null });

  useEffect(() => fcl.currentUser.subscribe(setUser), []);
  const postToFlow = async (post) => {
    const txId = await fcl
      .send([
        fcl.transaction`
        import Profile from 0xba1132bc08f82fe2
        transaction(post: String) {
          prepare(account: AuthAccount) {
            let profile = Profile.init()
            profile.save(post: post)
            account.save(<-profile, to: /storage/Profile)
            account.link<&Profile.Base{Profile.Public}>(/public/Profile, target: /storage/Profile)
          }
        }
      `,
        fcl.args([fcl.arg("hi", fcl.types.String)]),
        fcl.proposer(fcl.authz),
        fcl.payer(fcl.authz),
        fcl.authorizations([fcl.authz]),
        fcl.limit(35),
      ])
      .then(fcl.decode);
    return txId;
  };

  return (
    <div>
      <div className="pt-20 flex flex-col space-y-4">
        <button
          className="text-white"
          onClick={() => {
            postToFlow("hello world");
          }}
        >
          Post
        </button>
        <Post
          post="piente id voluptates, laboriosam magni dolore eligendi impedit repellendus sed quo quod, dignissimos quisquam ad quasi numquam optio, earum natus totam quidem!"
          user="hosenur"
        />
        <Post
          post="piente id voluptates, laboriosam magni dolore eligendi impedit repellendus sed quo quod, dignissimos quisquam ad quasi numquam optio, earum natus totam quidem!"
          user="hosenur"
        />
        <Post
          post="piente id voluptates, laboriosam magni dolore eligendi impedit repellendus sed quo quod, dignissimos quisquam ad quasi numquam optio, earum natus totam quidem!"
          user="hosenur"
        />
        <Post
          post="piente id voluptates, laboriosam magni dolore eligendi impedit repellendus sed quo quod, dignissimos quisquam ad quasi numquam optio, earum natus totam quidem!"
          user="hosenur"
        />
        <Post
          post="piente id voluptates, laboriosam magni dolore eligendi impedit repellendus sed quo quod, dignissimos quisquam ad quasi numquam optio, earum natus totam quidem!"
          user="hosenur"
        />
      </div>
    </div>
  );
}
