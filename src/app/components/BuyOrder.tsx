import { BuyOrder, Metadata } from "@/app/interfaces/interfaces";
import { useQuery } from "@tanstack/react-query";
import NftsService from "@/app/API/nftsService";
import { formatUnits } from "viem";
import { formatAddress } from "@/app/utils/helperFunctions";
import { Button, Label, Radio } from "flowbite-react";
import React, { useState } from "react";
import { useContractRead, useContractWrite } from "wagmi";
import { nftMarketplaceAddress } from "../../../helper";
import { MarketplaceAbi } from "@/abi/MarketplaceAbi";
import { NftContract } from "@/abi/NfrContract.abi";
import ApprovalModal from "@/app/components/UI/ApprovalModal";
import { AiOutlineLoading } from "react-icons/ai";

export default function BuyOrder({
  buyOrder,
}: {
  buyOrder: BuyOrder;
}): React.JSX.Element {
  if (!buyOrder) return <></>;

  const [action, setAction] = useState<"acceptBuyOrder" | "rejectBuyOrder">(
    "rejectBuyOrder",
  );
  const [openModal, setOpenModal] = useState(false);

  const { isPending, error, data } = useQuery({
    queryKey: [`getNftMetadata`, buyOrder.sellItem.uri],
    queryFn: () => {
      return NftsService.getNftMetadata(buyOrder.sellItem.uri);
    },
  });

  const {
    data: dataAction,
    isLoading: isLoadingDataAction,
    isSuccess: isSuccessDataAction,
    write: writeDataAction,
  } = useContractWrite({
    address: nftMarketplaceAddress,
    abi: MarketplaceAbi,
    functionName: action,
  });

  const {
    data: approveData,
    isLoading: isApproveLoading,
    isSuccess: isSuccessApprove,
    write: writeApprove,
  } = useContractWrite({
    address: buyOrder.sellItem.tokenAddress,
    abi: NftContract,
    args: [nftMarketplaceAddress, BigInt(buyOrder.sellItem.tokenId)],
    functionName: "approve",
  });

  const {
    data: approvedAddress,
    isError: isApprovedAddressError,
    isLoading: isApprovedAddressLoading,
  } = useContractRead({
    address: buyOrder.sellItem.tokenAddress,
    abi: NftContract,
    functionName: "getApproved",
    args: [BigInt(buyOrder.sellItem.tokenId)],
    enabled: buyOrder.sellItem.tokenAddress !== undefined,
  });

  const metadata: Metadata | undefined =
    !isPending && !error ? JSON.parse(data) : undefined;

  function handleSendAction(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void {
    if (
      approvedAddress !== nftMarketplaceAddress &&
      action === "acceptBuyOrder"
    ) {
      setOpenModal(true);
    } else {
      writeDataAction({
        args: [BigInt((e.target as HTMLButtonElement).id)],
      });
    }
  }

  return (
    <div className={"col-span-8 col-start-3 text-white flex"}>
      <ApprovalModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        writeApprove={writeApprove}
      />
      {metadata && (
        <div className={"bg-blue-800 flex pr-5"}>
          <div className={"w-64 h-64 flex-shrink-0"}>
            <img
              src={metadata.image}
              alt="Nft picture"
              className={"w-full h-full object-cover"}
            />
          </div>
          <div className={"ml-4 pt-5 space-y-1"}>
            <div className={"text-xl mb-5"}>
              {formatAddress(buyOrder.buyer)} wants to buy your NFT!
            </div>
            <div>
              NFT #{buyOrder.sellItem.tokenId} at contract address{" "}
              {formatAddress(buyOrder.sellItem.tokenAddress)}
            </div>
            <div>
              {metadata.name}: {metadata.description}
            </div>
            <div>
              Proposed price: {formatUnits(BigInt(buyOrder.proposedPrice), 18)}{" "}
              ETH
            </div>
            <div className={"flex justify-around pt-6"}>
              <div className="flex flex-col space-y-1">
                <div className="flex items-center gap-2">
                  <Radio
                    onChange={() => {
                      setAction("acceptBuyOrder");
                    }}
                    className={
                      "active:ring-blue-500 text-blue-500 focus:bg-blue-600 focus:ring-blue-600 checked:rinh-blue-500"
                    }
                    id={`${buyOrder.sellItem.tokenId} ${buyOrder.sellItem.tokenAddress}`}
                    name={`${buyOrder.sellItem.tokenAddress} ${buyOrder.sellItem.tokenId}`}
                    value="acceptBuyOrder"
                  />
                  <Label className={"text-white"} htmlFor="accept">
                    Accept
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <Radio
                      id={`${buyOrder.sellItem.tokenId} ${buyOrder.sellItem.tokenAddress}`}
                      name={`${buyOrder.sellItem.tokenAddress} ${buyOrder.sellItem.tokenId}`}
                      value="rejectBuyOrder"
                      className={
                        "active:ring-blue-500 text-blue-500 focus:bg-blue-600 focus:ring-blue-600 checked:rinh-blue-500"
                      }
                      onChange={() => {
                        setAction("rejectBuyOrder");
                      }}
                      defaultChecked
                    />
                  </div>
                  <Label className={"text-white"} htmlFor="reject">
                    Reject
                  </Label>
                </div>
              </div>

              <Button
                id={`${buyOrder.id}`}
                isProcessing={isApproveLoading}
                disabled={isApproveLoading}
                processingSpinner={
                  <AiOutlineLoading className="h-6 w-6 animate-spin" />
                }
                className={"w-1/3 bg-blue-500 enabled:hover:bg-blue-600"}
                onClick={(
                  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
                ): void => {
                  handleSendAction(e);
                }}
              >
                <div className={"w-full"} id={`${buyOrder.id}`}>
                  Send tx
                </div>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
