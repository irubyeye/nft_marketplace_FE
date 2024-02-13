import { graphUrl, nftKey } from "../../../helper";
import { NftApiResponse } from "@/app/interfaces/interfaces";

export default class NftsService {
  static async getUserNfts(userAddress: string): Promise<NftApiResponse> {
    const url: string = `https://deep-index.moralis.io/api/v2.2/${userAddress}/nft?chain=sepolia&format=decimal&media_items=false`;

    const response: Response = await fetch(url, {
      method: "GET",
      headers: { Accept: "application/json", "X-API-Key": nftKey },
    });

    return await response.json();
  }

  static async getSellings(): Promise<Response> {
    const response: Response = await fetch(graphUrl, {
      method: "POST",
      body: JSON.stringify({
        query:
          "{ sellItems(first: 5) {\n" +
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
    });
    return await response.json();
  }
}
