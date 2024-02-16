"use client";

import React from "react";
import { Header } from "@/app/components/UI/Header";
import { useQuery } from "@tanstack/react-query";
import NftsService from "@/app/API/nftsService";
import { SellingsList } from "@/app/components/SellingsList";
import { Spinner } from "flowbite-react";

export default function Page(): React.JSX.Element {
  const { isPending, error, data } = useQuery({
    queryKey: [`getSellings`],
    queryFn: () => {
      return NftsService.getSellings();
    },
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
      <SellingsList data={data?.data.sellItems || []} />
    </div>
  );
}
