import { NftData } from "@/app/interfaces/interfaces";
import React from "react";
import { NftItem } from "@/app/components/NftItem";
import { useContractWrite } from "wagmi";
import { nftMarketplaceAddress } from "../../../helper";
import MarketplaceAbi from "../../abi/MarketplaceAbi.json";

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
  return (
    <div className={"mt-5 grid grid-cols-12 gap-4 place-items-center"}>
      {nftsList.map((el: NftData, i: number) => {
        return (
          <NftItem nftItem={el} write={write} key={el.token_hash + `${i}`} />
        );
      })}
    </div>
  );
}
