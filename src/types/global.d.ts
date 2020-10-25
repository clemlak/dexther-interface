declare interface Window {
  ethereum: any,
  web3: any,
}

declare interface Metadata {
  title: string;
  type: string,
  properties: {
    name: {
      type: string;
      description: string;
    },
    description: {
      type: string;
      description: string;
    },
    image: {
      type: string;
      description: string;
    }
  }
}

declare interface OpenSeaAsset {
  asset_contract: {
    address: string;
    name: string;
    symbol: string;
    image_url: string;
    schema_name: string;
  };
  name: string;
  token_id: string;
  image_url: string;
}

declare interface Asset {
  contract: {
    address: string;
    name: string;
    symbol: string;
    imageUrl: string;
    type: string;
  },
  name: string;
  tokenId: string;
  imageUrl: string;
}
