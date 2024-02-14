import React from "react";
import Image from "next/image";
import Link from "next/link";

import logo from "../../../public/logo/Ethereum.svg";
import { MyModal } from "@/app/components/UI/MyModal";

export function Header(): React.JSX.Element {
  return (
    <div
      className={"bg-blue-800 min-h-32 grid grid-cols-12 place-items-center"}
    >
      <Link className={"col-start-2 col-span-1"} href={"/sellings"}>
        <Image src={logo} alt={"Logo"} className={""} />
      </Link>

      <div
        className={
          "grid grid-cols-subgrid gap-4 col-start-3 col-span-6 place-items-center"
        }
      >
        <Link
          className=" text-gray-300 text-xl col-span-2 font-light"
          href="/mynfts"
        >
          My NFTs
        </Link>
        <Link
          className=" text-gray-300 text-xl col-span-2 font-light"
          href="/dashboard"
        >
          My Orders
        </Link>
        {/*<BasicModal />*/}
        <MyModal />
      </div>

      <div className={"col-start-9 col-span-3"}>
        <w3m-button loadingLabel="Connecting..." />
      </div>
    </div>
  );
}
