import { NftData, SellItem } from "@/app/interfaces/interfaces";
import { useQuery } from "@tanstack/react-query";
import NftsService from "@/app/API/nftsService";
import { NftItem } from "@/app/components/NftItem";
import { useContractWrite } from "wagmi";
import { nftMarketplaceAddress } from "../../../helper";
import { MarketplaceAbi } from "@/abi/MarketplaceAbi";
import React from "react";

export function SellingItem({ sellItem }: { sellItem: SellItem }) {
  console.log(sellItem.tokenAddress, sellItem.tokenId);
  const { isPending, error, data } = useQuery({
    queryKey: [`getNftMetadata`],
    queryFn: () => {
      return NftsService.getNftMetadata(
        sellItem.tokenAddress,
        sellItem.tokenId,
      );
    },
  });

  const {
    data: dataCreatingBuyOrder,
    isLoading,
    isSuccess,
    write,
  } = useContractWrite({
    address: nftMarketplaceAddress,
    abi: MarketplaceAbi,
    functionName: "createBuyOrder",
  });

  function handleClick(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    price: bigint,
  ): void {
    const params: string[] = (e.target as HTMLButtonElement).id.split(" ");
    write({
      args: [BigInt(sellItem.id), price],
    });
  }

  console.log(data);
  return (
    <>
      <NftItem
        nftItem={data as NftData}
        write={write}
        buttonText={"Buy"}
        handleClick={handleClick}
      />
    </>
  );
}
