import { NftData } from "@/app/interfaces/interfaces";
import React from "react";
import { NftItem } from "@/app/components/NftItem";
import { useContractWrite } from "wagmi";
import { nftMarketplaceAddress } from "../../../helper";
import { MarketplaceAbi } from "@/abi/MarketplaceAbi";
import { Address } from "viem";

export function NftsList({
  nftsList,
}: {
  nftsList: NftData[];
}): React.JSX.Element {
  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: nftMarketplaceAddress,
    abi: MarketplaceAbi,
    functionName: "createSellItem",
  });
  function handleClick(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    price: bigint,
  ): void {
    const params: string[] = (e.target as HTMLButtonElement).id.split(" ");
    write({
      args: [params[0] as Address, BigInt(params[1]), price],
    });
  }

  return (
    <div className={"mt-5 grid grid-cols-12 gap-4 place-items-center"}>
      {nftsList.map((el: NftData) => {
        return (
          <NftItem
            tokenAddress={el.token_address}
            tokenId={el.token_id}
            rawMetadata={el.metadata}
            key={el.token_hash}
            buttonText={"Sell"}
            handleClick={handleClick}
          />
        );
      })}
    </div>
  );
}
