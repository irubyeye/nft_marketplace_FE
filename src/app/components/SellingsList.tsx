import React from "react";
import { NftData, SellItem } from "@/app/interfaces/interfaces";
import { SellingItem } from "@/app/components/SellingItem";
import { NftItem } from "@/app/components/NftItem";

export function SellingsList({
  data,
}: {
  data: SellItem[];
}): React.JSX.Element {
  return (
    <div className={"pt-5"}>
      <h1 className="text-2xl text-center">Current list of nfts for sale</h1>
      <div className={"mt-5 grid grid-cols-12 gap-4 place-items-center"}>
        {data.map((el: SellItem, i: number) => {
          return (
            <SellingItem
              sellItem={el}
              key={`${el.token_address + el.token_id}`}
            />
          );
        })}
      </div>
    </div>
  );
}
