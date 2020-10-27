import axios from 'axios';

async function getUserAssets(network: string, owner: string): Promise<Asset[]> {
  try {
    const api = network === '1' ? 'api' : 'rinkeby-api';

    const res = await axios({
      method: 'get',
      url: `https://${api}.opensea.io/api/v1/assets?owner=${owner}&order_direction=desc&offset=0&limit=20`,
    });

    const openSeaAssets: OpenSeaAsset[] = res.data.assets;
    const formattedAssets: Asset[] = [];

    for (let i = 0; i < openSeaAssets.length; i += 1) {
      const asset: Asset = {
        contract: {
          address: openSeaAssets[i].asset_contract.address,
          name: openSeaAssets[i].asset_contract.name,
          symbol: openSeaAssets[i].asset_contract.symbol,
          imageUrl: openSeaAssets[i].asset_contract.image_url,
          type: openSeaAssets[i].asset_contract.schema_name,
        },
        name: openSeaAssets[i].name ? openSeaAssets[i].name : 'Untiltled',
        tokenId: openSeaAssets[i].token_id,
        imageUrl: openSeaAssets[i].image_url ? openSeaAssets[i].image_url : 'https://breakthrough.org/wp-content/uploads/2018/10/default-placeholder-image.png',
      };

      formattedAssets.push(asset);
    }

    return formattedAssets;
  } catch (e) {
    console.log(e);
    throw new Error('Cannot get user assets');
  }
}

export {
  getUserAssets,
};
