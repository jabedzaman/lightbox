/* eslint-disable @next/next/no-img-element */
import React from "react";

function Post(props) {
  return (
    <div>
      <div className="max-w-6xl border border-white  mx-auto p-5 text-3xl font-bold flex flex-col space-y-3">
        <div className="flex flex-row space-x-2 items-baseline">
          <div className="text-2xl text-gray-200">{props?.user || "user"}</div>
          <div className="text-lg text-gray-400">{props?.user || "user no longer exists"}</div>
        </div>
        <div className="text-2xl">{props.post}</div>
        <img src={props.imgsrc} alt="" className="w-full" />
      </div>
    </div>
  );
}

export default Post;
