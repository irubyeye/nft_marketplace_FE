export default class NftsService {
  private static nftKey: string =
    "1eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjI2N2EyZjIyLTgwOGUtNDgxNC1hMmZiLTNhMzA4ZGE4ODI2NiIsIm9yZ0lkIjoiMzc2Mzc5IiwidXNlcklkIjoiMzg2Nzg0IiwidHlwZUlkIjoiYzdlNzMzNmItMjYyMy00ODBkLTg4MzYtZjEyMDBiNDBkNGJlIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MDc0MDgyMTcsImV4cCI6NDg2MzE2ODIxN30.6v0qbq83vV--XdCkcD4SpFUZ6lRJ-VHTDKXMsnGGvKM";
  static async getUserNfts(userAddress: string): Promise<Response> {
    const url: string = `https://deep-index.moralis.io/api/v2.2/${userAddress}/nft?chain=sepolia&format=decimal&media_items=false`;

    return await fetch(url, {
      method: "GET",
      headers: { Accept: "application/json", "X-API-Key": this.nftKey },
    });
  }
}
