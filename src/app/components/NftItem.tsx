import { HandleClick, NftData } from "@/app/interfaces/interfaces";
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
  handleClick,
  buttonText,
}: {
  nftItem: NftData;
  write: Function;
  handleClick: HandleClick;
  buttonText: string;
}): React.JSX.Element {
  if (!nftItem) return <div>Loading...</div>;

  const [price, setPrice] = useState<bigint>(BigInt(0));
  const metadata: Metadata = JSON.parse(nftItem.metadata);

  return (
    <div className={"col-span-4"}>
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
              onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                handleClick(e, price);
              }}
            >
              {buttonText}
            </Button>
            <TextField
              className="w-5/12"
              id="outlined-number"
              label=""
              type="number"
              sx={{ input: { color: "whitesmoke" } }}
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
