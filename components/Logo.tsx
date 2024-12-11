import Link from "next/link";
import React from "react";

function Logo() {
  return (
    <Link
      href={"/"}
      className="font-bold text-3xl  hover:cursor-pointer"
    >
      <span className="bg-gradient-to-r from-indigo-700 to-cyan-400 text-transparent bg-clip-text">NextForm</span>🤩
    </Link>
  );
}

export default Logo;
