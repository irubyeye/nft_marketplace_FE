"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { Header } from "@/app/components/UI/Header";
import { useRouter } from "next/navigation";
import { DepositModal } from "@/app/components/UI/DepositModal";

function App() {
  const account = useAccount();

  return (
    <div>
      <Header />
    </div>
  );
}

export default App;
