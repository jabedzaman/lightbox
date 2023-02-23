/* eslint-disable @next/next/no-img-element */
import React from "react";

function Post(props) {
  return (
    <div
      className={` bg-white rounded  w-full  max-w-5xl  mx-auto p-5 text-3xl font-bold flex flex-col space-y-3`}
    >
      <div className="flex flex-row space-x-2 items-baseline">
        <div className="text-2xl">
          Posted By : {props.user}
        </div>
      </div>
      <div className="text-2xl text-slate-500 w-full flex">{props.message}</div>
    </div>
  );
}

export default Post;
