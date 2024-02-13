"use client";

import React from "react";
import { Header } from "@/app/components/UI/Header";
import { useAccount } from "wagmi";
import { useQuery } from "@tanstack/react-query";
import NftsService from "@/app/API/nftsService";

export default function Page(): React.JSX.Element {
  const { isPending, error, data } = useQuery({
    queryKey: [`getSellings`],
    queryFn: () => {
      return NftsService.getSellings();
    },
  });
  console.log(data);
  return (
    <div>
      <Header />
    </div>
  );
}
