import React from "react";
import { Button, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import { useAccount, useContractRead, useContractWrite } from "wagmi";
import { nftMarketplaceAddress } from "../../../../helper";
import { MarketplaceAbi } from "@/abi/MarketplaceAbi";
import { Address, formatUnits, parseEther } from "viem";

export function DepositModal(): React.JSX.Element {
  const [openModal, setOpenModal] = useState(false);
  const account = useAccount();

  const [value, setValue] = useState<bigint>(BigInt(0));

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: nftMarketplaceAddress,
    abi: MarketplaceAbi,
    functionName: "deposit",
  });

  const {
    data: balanceData,
    isError: isBalanceError,
    isLoading: isBalabceLoading,
  } = useContractRead({
    address: nftMarketplaceAddress,
    abi: MarketplaceAbi,
    functionName: "balances",
    args: [account.address as Address],
    enabled: account.address !== undefined,
  });

  function handleButtonClick(): void {
    write({
      value,
    });
  }

  return (
    <div className={"col-span-2"}>
      <Button
        className={"bg-transparent focus:border-0 focus:ring-0"}
        color={"blue"}
        onClick={() => setOpenModal(true)}
      >
        <div className={"text-gray-300 text-xl font-light"}>Deposit ETH</div>
      </Button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>
          <div className={"text-blue-600"}>
            Your current balance is{" "}
            {`${formatUnits((balanceData as bigint) ?? BigInt(0), 18)}`} ETH
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Here you can deposit ETH to marketplace contract in order to buy
              NFTs.
            </p>
            <TextInput
              className={"w-1/3"}
              type={"number"}
              color={"dark"}
              onChange={(e): void => {
                setValue(parseEther(e.target.value, "wei"));
              }}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            color={"blue"}
            onClick={() => {
              handleButtonClick();
              setOpenModal(false);
            }}
          >
            Deposit
          </Button>
          <Button
            color={"red"}
            onClick={() => {
              setOpenModal(false);
            }}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
