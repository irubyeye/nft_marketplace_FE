"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { Header } from "@/app/components/Header/Header";
import { useRouter } from "next/navigation";

function App() {
  const router = useRouter();

  const account = useAccount();

  return (
    <div>
      <Header />
    </div>
  );
}

export default App;
