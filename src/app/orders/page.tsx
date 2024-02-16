"use client";

import React from "react";
import { Header } from "@/app/components/UI/Header";
import { useQuery } from "@tanstack/react-query";
import NftsService from "@/app/API/nftsService";
import { Spinner } from "flowbite-react";
import { useAccount } from "wagmi";
import { Address } from "viem";
import { BuyOrdersList } from "@/app/components/BuyOrdersList";

export default function Page(): React.JSX.Element {
  const account = useAccount();

  const { isPending, error, data } = useQuery({
    queryKey: [`getBuyOrders`, account.address],
    queryFn: () => {
      return NftsService.getBuyOrders(account.address as Address);
    },
    enabled: account.address !== undefined,
  });

  return (
    <div>
      <Header />
      {isPending && (
        <div className={"flex justify-center items-center h-screen"}>
          <div>
            <Spinner className={"w-32 h-32"} />
          </div>
        </div>
      )}
      {error && "An error has occurred: " + error.message}
      <BuyOrdersList buyOrders={data?.data.buyOrders || []} />
    </div>
  );
}
