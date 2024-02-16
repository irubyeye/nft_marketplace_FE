import { Address } from "viem";
import React from "react";

export interface NftApiResponse {
  status: string;
  page: number;
  page_size: number;
  cursor: null | string;
  result: NftData[];
}
export interface NftData {
  amount: string;
  token_id: string;
  token_address: Address;
  contract_type: string;
  owner_of: Address;
  last_metadata_sync: string;
  last_token_uri_sync: string;
  metadata: string;
  normalized_metadata?: normalizedMetadata;
  block_number: string;
  block_number_minted: string;
  name: string;
  symbol: string;
  token_hash: string;
  token_uri: string;
  minter_address: Address;
  verified_collection: boolean;
  possible_spam: boolean;
  collection_logo: any;
  collection_banner_image: any;
}

interface normalizedMetadata {
  name: string;
  description: string;
  animation_url: string | null;
  external_link: string | null;
  image: string;
  attributes: any[];
}

export interface Metadata {
  name: string;
  description: string;
  image: string;
}

export interface SellItemsResponse {
  data: { sellItems: SellItem[] };
}

export interface SellItem {
  id: string;
  initPrice: string;
  isForSalle: boolean;
  seller: Address;
  tokenAddress: Address;
  uri: string;
  tokenId: string;
}

export interface BuyOrderResponse {
  data: {
    buyOrders: BuyOrder[];
  };
}

export interface BuyOrder {
  id: string;
  sellOrderId: string;
  proposedPrice: string;
  buyer: Address;
  sellItem: SellItem;
}

export interface HandleClick {
  (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, price: bigint): void;
}
