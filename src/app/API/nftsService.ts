import { graphUrl, nftKey } from "../../../helper";
import {
  BuyOrderResponse,
  NftApiResponse,
  SellItemsResponse,
} from "@/app/interfaces/interfaces";
import { Address } from "viem";
import { replaceIpfsDomain } from "@/app/utils/helperFunctions";

export default class NftsService {
  static async getUserNfts(userAddress: Address): Promise<NftApiResponse> {
    const url: string = `https://deep-index.moralis.io/api/v2.2/${userAddress}/nft?chain=sepolia&format=decimal&media_items=false`;

    const response: Response = await fetch(url, {
      method: "GET",
      headers: { Accept: "application/json", "X-API-Key": nftKey },
    });

    return await response.json();
  }

  static async getNftMetadata(url: string): Promise<string> {
    const preparedUrl: string = replaceIpfsDomain(url);

    const response: Response = await fetch(preparedUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    return JSON.stringify(await response.json());
  }

  static async getSellings(): Promise<SellItemsResponse> {
    const response: Response = await fetch(graphUrl, {
      method: "POST",
      body: JSON.stringify({
        query:
          "{\n" +
          "  sellItems(where: {isForSale: true}) {\n" +
          "    id\n" +
          "    tokenId\n" +
          "    initPrice\n" +
          "    seller\n" +
          "    uri\n" +
          "    isForSale\n" +
          "    tokenAddress\n" +
          "  }\n" +
          "}",
      }),
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 10 },
    });
    return response.json();
  }

  static async getBuyOrders(userAddress: Address): Promise<BuyOrderResponse> {
    const response: Response = await fetch(graphUrl, {
      method: "POST",
      body: JSON.stringify({
        query: `{
          buyOrders(
            where: {isClosed: false, isRejected: false, sellItem_: {seller: "${userAddress}", isForSale: true}}
          ) {
            id
            sellOrderId
            proposedPrice
            buyer
            sellItem {
              id
              initPrice
              isForSale
              seller
              tokenAddress
              tokenId
              uri
            }
          }
        }`,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 10 },
    });
    return await response.json();
  }
}
