"use client";

import React from "react";
import { Header } from "@/app/components/UI/Header";
import { useAccount } from "wagmi";
import { useQuery } from "@tanstack/react-query";
import NftsService from "@/app/API/nftsService";
import { NftsList } from "@/app/components/NftsList";
import { Address } from "viem";
import { Spinner } from "flowbite-react";

export default function Page(): React.JSX.Element {
  const account = useAccount();

  const { isPending, error, data } = useQuery({
    queryKey: [`getUserNfts`, account.address],
    queryFn: () => {
      return NftsService.getUserNfts(account.address as Address);
    },
    enabled: account.address !== undefined,
  });

  return (
    <div className="">
      <Header />
      {isPending && (
        <div className={"flex justify-center items-center h-screen"}>
          <div>
            <Spinner className={"w-32 h-32"} />
          </div>
        </div>
      )}
      {error && "An error has occurred: " + error.message}
      <NftsList nftsList={data?.result || []} />
    </div>
  );
}
