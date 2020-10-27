export interface DefaultConfig {
  contracts: {
    dexther: {
      [key: string]: string
    },
    tokens: {
      dai: {
        80001: string;
      }
    }
  }
}

const config: DefaultConfig = {
  contracts: {
    dexther: {
      80001: '0x0152869213CC39F0Bd435451eD7866289a4FDEB4',
    },
    tokens: {
      dai: {
        80001: '0x7e0a23045CDe4d16733A079298C1CCe99f3DCE2f',
      },
    },
  },
};

export default config;
