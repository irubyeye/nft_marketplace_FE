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
  token_address: string;
  contract_type: string;
  owner_of: string;
  last_metadata_sync: string;
  last_token_uri_sync: string;
  metadata: string;
  block_number: string;
  block_number_minted: string;
  name: string;
  symbol: string;
  token_hash: string;
  token_uri: string;
  minter_address: string;
  verified_collection: boolean;
  possible_spam: boolean;
  collection_logo: any;
  collection_banner_image: any;
}
