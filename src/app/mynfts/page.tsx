"use client";

import React from "react";
import { Header } from "@/app/components/UI/Header";
import { useAccount } from "wagmi";
import { useQuery } from "@tanstack/react-query";
import NftsService from "@/app/API/nftsService";
import testRes from "../../public/jsons/testRes.json";
import { NftsList } from "@/app/components/NftsList";

export default function Page(): React.JSX.Element {
  const account = useAccount();

  const accountAddress: string = account.address || "";

  const { isPending, error, data } = useQuery({
    queryKey: [`getUserNfts`, accountAddress],
    queryFn: () => {
      return NftsService.getUserNfts(accountAddress);
    },
  });

  return (
    <div className="">
      <Header />
      {isPending && <div>Is loading</div>}
      {error && "An error has occurred: " + error.message}
      <NftsList nftsList={data?.result || []} />
    </div>
  );
}
