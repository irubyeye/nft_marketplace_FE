"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";

function App() {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <>
      <w3m-account-button />
      <w3m-connect-button />
      <w3m-button />
      <w3m-network-button />
    </>
  );
}

export default App;
