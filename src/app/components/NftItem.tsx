import { NftData } from "@/app/interfaces/interfaces";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { parseEther } from "viem";

interface Metadata {
  name: string;
  description: string;
  image: string;
}
export function NftItem({
  nftItem,
  write,
}: {
  nftItem: NftData;
  write: Function;
}): React.JSX.Element {
  const [price, setPrice] = useState<bigint>(BigInt(0));
  const metadata: Metadata = JSON.parse(nftItem.metadata);

  function handleClick(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void {
    const params: string[] = (e.target as HTMLButtonElement).id.split(" ");
    write({
      args: [params[0], params[1], price],
    });
  }

  return (
    <div className={"col-span-4 rounded-3xl"}>
      <div className={"bg-blue-800 w-72"}>
        <img className={"h-72"} src={metadata.image} alt="Nft picture" />
        <div className="text-center text-gray-300 p-3">
          <div className={"text-xl"}>{metadata.name}</div>
          <hr className="mt-1.5 mb-1.5" />
          <div className={""}>{metadata.description}</div>
          <div className="flex justify-around mt-1.5">
            <Button
              id={`${nftItem.token_address} ${nftItem.token_id}`}
              className=" bg-blue-600 hover:bg-blue-700 w-5/12"
              variant={"contained"}
              onClick={handleClick}
            >
              Sell
            </Button>
            <TextField
              className="w-5/12"
              id="outlined-number"
              label=""
              type="number"
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
