import React from "react";
import { BuyOrder as BuyOrderType } from "@/app/interfaces/interfaces";
import BuyOrder from "@/app/components/BuyOrder";

export function BuyOrdersList({
  buyOrders,
}: {
  buyOrders: BuyOrderType[];
}): React.JSX.Element {
  return (
    <>
      <h1 className="text-2xl text-center mt-5">Your buy orders list</h1>
      <div className={"mt-5 grid grid-cols-12 gap-4 place-items-center"}>
        {buyOrders.map((el: BuyOrderType) => {
          return <BuyOrder buyOrder={el} key={`${el.id}`} />;
        })}
      </div>
    </>
  );
}
