import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Address, parseEther, formatUnits } from "viem";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useAccount, useContractRead, useContractWrite } from "wagmi";
import { nftMarketplaceAddress } from "../../../../helper";
import { MarketplaceAbi } from "@/abi/MarketplaceAbi";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(): React.JSX.Element {
  const account = useAccount();

  const [open, setOpen] = React.useState(false);
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
    args: [(account.address as Address) || undefined],
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function handleButtonClick(): void {
    write({
      value,
    });
  }
  return (
    <div className={"col-span-2 "}>
      <Button
        className="text-gray-300 font-sans text-l"
        sx={{ fontFamily: "Helvetica Neue" }}
        onClick={handleOpen}
      >
        Deposit ETH
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Your current balance is{" "}
            {`${formatUnits((balanceData as bigint) ?? BigInt(0), 18)}`}
          </Typography>
          <Typography
            className="flex justify-around"
            id="modal-modal-description"
            sx={{ mt: 2 }}
          >
            <TextField
              className="w-5/12"
              id="outlined-number"
              label=""
              type="number"
              onChange={(e): void => {
                setValue(parseEther(e.target.value, "wei"));
              }}
            />
            <Button className="w-5/12" onClick={() => handleButtonClick()}>
              Deposit
            </Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
