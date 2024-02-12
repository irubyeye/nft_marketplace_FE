import React from "react";
import Image from "next/image";
import Link from "next/link";

import logo from "../../../public/logo/Ethereum.svg";

export function Header(): React.JSX.Element {
  return (
    <div
      className={"bg-blue-800 min-h-24 grid grid-cols-12 place-items-center"}
    >
      <Link className={"col-start-2 col-span-1"} href={"/"}>
        <Image src={logo} alt={"Logo"} className={"w-2/3 h-2/3"} />
      </Link>

      <div
        className={
          "grid grid-cols-subgrid gap-4 col-start-4 col-span-3 place-items-center"
        }
      >
        <Link className=" text-gray-300 text-xl col-span-2" href="/mynfts">
          My NFTs
        </Link>
        <Link className=" text-gray-300 text-xl" href="/dashboard">
          My Orders
        </Link>
      </div>

      <div className={"col-start-9 col-span-3"}>
        <w3m-button loadingLabel="Connecting..." />
      </div>
    </div>
  );
}
