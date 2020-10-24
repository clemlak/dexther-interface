import React, {
  useContext, useEffect, useState,
} from 'react';
import {
  Flex,
  Box,
} from 'reflexbox';

import {
  Web3Context,
} from '../../store/web3ContextProvider';

import {
  Text,
  Title,
  Subtitle,
  Input,
  NftCard,
  Dropdown,
  Button,
} from '../../style/components';

import {
  getAssets,
} from '../../utils/openSea';

import {
  createOffer,
} from '../../utils/dexther';

interface OpenSeaAsset {
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

interface Asset {
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

function Create() {
  const web3Context = useContext(Web3Context);

  const {
    state,
    dispatch,
  } = web3Context;

  const {
    address,
    chainId,
    provider,
    isWalletConnected,
  } = state;

  const [assets, setAssets] = useState<Asset[]>([]);
  const [selectedTokens, setSelectedTokens] = useState<Number[]>([]);

  const [estimateValue, setEstimateValue] = useState<string>('');

  useEffect(() => {
    async function getUserAssets() {
      try {
        const res = await getAssets(chainId, address);
        const openSeaAssets: OpenSeaAsset[] = res.assets;

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
            name: openSeaAssets[i].name,
            tokenId: openSeaAssets[i].token_id,
            imageUrl: openSeaAssets[i].image_url,
          };

          formattedAssets.push(asset);
        }

        setAssets(formattedAssets);
      } catch (e) {
        console.log(e);
      }
    }

    if (address !== '' && isWalletConnected) {
      getUserAssets();
    }
  }, [provider, chainId, address, isWalletConnected]);

  if (!isWalletConnected) {
    return (
      <Flex>
        <Box>
          <Text>
            Your wallet is not connected!
          </Text>
        </Box>
      </Flex>
    );
  }

  return (
    <Flex
      flexWrap="wrap"
      alignItems="center"
      width={[1, 1 / 2]}
      mx="auto"
    >
      <Box
        width={1}
      >
        <Title>
          Create an offer
        </Title>
      </Box>
      <Box
        width={1}
      >
        <Subtitle>
          Your assets
        </Subtitle>
      </Box>
      {assets.length > 0 ? assets.map((asset: Asset, index: number) => (
        <Box
          key={asset.tokenId}
          width={1 / 2}
        >
          <NftCard
            imageUrl={asset.imageUrl}
            assetName={asset.name}
            contractName={asset.contract.name}
            isSelected={selectedTokens.includes(index)}
            onClick={() => {
              if (selectedTokens.includes(index)) {
                const newSelectedTokens = selectedTokens.filter((value) => value !== index);
                console.log(newSelectedTokens);
                setSelectedTokens([...newSelectedTokens]);
              } else {
                setSelectedTokens([...selectedTokens, index]);
              }
            }}
          />
        </Box>
      )) : (
        <Text>
          You do not have any assets :(
        </Text>
      )}
      <Box
        width={1}
        pt="2rem"
      >
        <Subtitle>
          Estimated value
        </Subtitle>
        <Text>This is how you estimate the value of your assets. People wanting to swap your assets will have to deposit this amount as a collateral.</Text>
      </Box>
      <Box
        width={[1 / 2]}
        pr="5px"
      >
        <Input
          placeholder="Enter value here"
          value={estimateValue}
          onChange={(e) => setEstimateValue(e.target.value)}
          type="number"
          block
        />
      </Box>
      <Box
        width={[1 / 2]}
        pl="5px"
      >
        <Button
          genre="primary"
          size="m"
          block
        >
          DAI
        </Button>
      </Box>
      <Box
        width={1}
        pt="2rem"
      >
        <Button
          genre="inverted"
          size="m"
          block
          disabled={selectedTokens.length === 0 || estimateValue === ''}
          onClick={async () => {}}
        >
          Create offer
        </Button>
      </Box>
    </Flex>
  );
}

export default Create;
