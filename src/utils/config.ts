export interface DefaultConfig {
  contracts: {
    dexther: {
      [key: string]: string
    }
  }
}

const config: DefaultConfig = {
  contracts: {
    dexther: {
      4: '0xf2303c8D47047f27a058De21984baF4cD21a68c8',
    },
  },
};

export default config;
