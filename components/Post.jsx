/* eslint-disable @next/next/no-img-element */
import React from "react";

function Post({ user, post }) {
  return (
    <div className={`max-w-6xl bg-white rounded   mx-auto p-5 text-3xl font-bold flex flex-col space-y-3`}>
      <div className="flex flex-row space-x-2 items-baseline">
        <div className="text-2xl">  Posted By : 0xfd70a206bade12af</div>
      </div>
      <div className="text-2xl text-slate-500">{post}</div>
    </div>
  );
}

export default Post;
