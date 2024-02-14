import {
  HandleClick,
  NftData,
  SellItem,
  Metadata,
} from "@/app/interfaces/interfaces";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { parseEther } from "viem";
import { TextInput, Button, Spinner } from "flowbite-react";
import { useQuery } from "@tanstack/react-query";
import NftsService from "@/app/API/nftsService";

export function NftItem({
  tokenAddress,
  tokenId,
  rawMetadada,
  handleClick,
  buttonText,
}: {
  tokenAddress: string;
  tokenId: string;
  rawMetadada: string;
  handleClick: HandleClick;
  buttonText: string;
}): React.JSX.Element {
  if (!rawMetadada)
    return (
      <div className={"col-span-12 mt-10"}>
        <Spinner className={"w-32 h-32"} />
      </div>
    );

  const [price, setPrice] = useState<bigint>(BigInt(0));

  const metadata: Metadata = JSON.parse(rawMetadada);
  console.log(rawMetadada);
  return (
    <div className={"col-span-4"}>
      <div className={"bg-blue-800 w-72"}>
        <img className={"h-72"} src={metadata.image} alt="Nft picture" />
        <div className="flex flex-col justify-around text-center text-gray-300 p-3 min-h-48">
          <div className={"text-xl"}>{metadata.name}</div>
          <hr className="mt-1.5 mb-1.5" />
          <div className={""}>{metadata.description}</div>
          <div className="flex justify-around">
            <Button
              id={`${tokenAddress} ${tokenId}`}
              className="w-5/12 bg-blue-500 enabled:hover:bg-blue-600"
              onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                handleClick(e, price);
              }}
            >
              <div className={"text-gray-300"}>{buttonText}</div>
            </Button>
            <TextInput
              className={"w-5/12 text-black focus:border-0 focus:ring-0"}
              type={"number"}
              color={"dark"}
              onChange={(e): void => {
                setPrice(parseEther(e.target.value, "wei"));
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
