"use client";

import React from "react";
import { Header } from "@/app/components/Header/Header";
import { useAccount } from "wagmi";
import { useQuery } from "@tanstack/react-query";
import NftsService from "@/app/API/nftsService";

export default function Page(): React.JSX.Element {
  const account = useAccount();

  const accountAddress: string = account.address || "";
  // [`getUserNfts`, accountAddress],
  //   () => {
  //     NftsService.getUserNfts(accountAddress).then((r) => r.json());
  //   },

  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: [`getUserNfts`, accountAddress],
    queryFn: () => {
      NftsService.getUserNfts(accountAddress).then((r) => r.json());
    },
  });

  return (
    <>
      <Header />
    </>
  );
}
