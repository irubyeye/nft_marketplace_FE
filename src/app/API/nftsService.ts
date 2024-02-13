import { graphUrl, nftKey } from "../../../helper";
import {
  NftApiResponse,
  NftData,
  SellItemsResponse,
} from "@/app/interfaces/interfaces";
import { Address } from "viem";

export default class NftsService {
  static async getUserNfts(userAddress: Address): Promise<NftApiResponse> {
    const url: string = `https://deep-index.moralis.io/api/v2.2/${userAddress}/nft?chain=sepolia&format=decimal&media_items=false`;

    const response: Response = await fetch(url, {
      method: "GET",
      headers: { Accept: "application/json", "X-API-Key": nftKey },
    });

    return await response.json();
  }

  static async getNftMetadata(
    contractAddress: Address,
    tokenId: string,
  ): Promise<NftData> {
    const url: string = `https://deep-index.moralis.io/api/v2.2/nft/${contractAddress}/${tokenId}?chain=sepolia&format=decimal&normalizeMetadata=true&media_items=false`;

    const response: Response = await fetch(url, {
      method: "GET",
      headers: { Accept: "application/json", "X-API-Key": nftKey },
    });

    return await response.json();
  }

  static async getSellings(): Promise<SellItemsResponse> {
    const response: Response = await fetch(graphUrl, {
      method: "POST",
      body: JSON.stringify({
        query:
          "{ sellItems(where: {isForSale: true}) {\n" +
          "    id\n" +
          "    initPrice\n" +
          "    isForSale\n" +
          "    seller\n" +
          "    tokenAddress\n" +
          "    tokenId\n" +
          "  } }",
      }),
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 10 },
    });
    return await response.json();
  }
}
