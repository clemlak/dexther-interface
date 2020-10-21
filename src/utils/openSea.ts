import axios from 'axios';

async function getAssets(network: string, owner: string) {
  try {
    const api = network === 'mainnet' ? 'api' : 'rinkeby-api';

    const res = await axios({
      method: 'get',
      url: `https://${api}.opensea.io/api/v1/assets?owner=${owner}&order_direction=desc&offset=0&limit=20`,
    });

    return res.data;
  } catch (e) {
    console.log(e);
  }
}

export {
  getAssets,
};
