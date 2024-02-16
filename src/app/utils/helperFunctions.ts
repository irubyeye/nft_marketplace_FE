import { Address } from "viem";

export function formatAddress(addressToFormat: Address): string {
  const upperCaseAddress: string = addressToFormat.toUpperCase();

  return (
    "0x" +
    upperCaseAddress.slice(2, 7) +
    "..." +
    upperCaseAddress.slice(-5, upperCaseAddress.length)
  );
}

export function replaceIpfsDomain(url: string): string {
  if (url.includes("https://ipfs.io/ipfs/")) {
    return url.replace("https://ipfs.io/ipfs/", "https://4everland.io/ipfs/");
  } else {
    return url;
  }
}
