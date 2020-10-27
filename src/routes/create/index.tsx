/* eslint-disable no-await-in-loop */

import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  Flex,
  Box,
} from 'reflexbox';
import {
  providers,
  utils,
  constants,
} from 'ethers';
import styled from 'styled-components';

import {
  Web3Context,
} from '../../store/web3ContextProvider';

import {
  Text,
  Title,
  Subtitle,
  Input,
  NftCard,
  Button,
} from '../../style/components';

import {
  getAssetsOf,
  isApprovedForAllErc721,
  setApprovalForAllErc721,
} from '../../utils/tokenUtils';

import {
  createOffer,
} from '../../utils/dexther';

import config from '../../utils/config';

import DaiIcon from '../../assets/icons/dai.png';

const DaiLogo = styled.img`
  height: 32px;
  vertical-align: middle;
  margin-right: 10px;
`;

function Create() {
  const web3Context = useContext(Web3Context);

  const {
    state,
  } = web3Context;

  const {
    address,
    chainId,
    provider,
    isWalletConnected,
  } = state;

  const [assets, setAssets] = useState<Asset[]>([]);
  const [selectedAssets, setSelectedAssets] = useState<number[]>([]);
  const [estimateValue, setEstimateValue] = useState<string>('');

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [buttonMessage, setButtonMessage] = useState<string>('Swap');

  useEffect(() => {
    async function doGetUserAssets() {
      try {
        const res = await getAssetsOf(
          provider,
          '0x939f7EB5C1C80b1D125F87Da3F739EFFDa026c0f',
          address,
        );
        setAssets(res);
      } catch (e) {
        console.log(e);
      }
    }

    if (address !== '' && isWalletConnected) {
      doGetUserAssets();
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
        <Text>
          Select all the assets that you want to include in your offer. Users will be able to swap them.
        </Text>
      </Box>
      {assets.length > 0 ? assets.map((asset: Asset, index: number) => (
        <Box
          key={asset.tokenId}
          width={[1, 1 / 2]}
          p="10px"
        >
          <NftCard
            imageUrl={asset.imageUrl}
            assetName={asset.name}
            contractName={asset.contract.name}
            isSelected={selectedAssets.includes(index)}
            isSelectable
            onClick={() => {
              if (selectedAssets.includes(index)) {
                const newSelectedAssets = selectedAssets.filter((value) => value !== index);
                setSelectedAssets([...newSelectedAssets]);
              } else {
                setSelectedAssets([...selectedAssets, index]);
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
        <Text>
          This is how you estimate the value of your assets. People wanting to swap your assets will have to deposit this amount as a collateral.
        </Text>
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
          <DaiLogo src={DaiIcon} alt="DAI logo" />
          DAI
        </Button>
      </Box>
      <Box
        width={1}
        pt="5rem"
      >
        <Button
          genre="brand"
          size="m"
          block
          disabled={selectedAssets.length === 0 || estimateValue === ''}
          isLoading={isLoading}
          onClick={async () => {
            setIsLoading(true);

            try {
              const offerTokensAddresses: string[] = [];
              const offerTokensIds: string[] = [];
              const offerTokensValues: string[] = [];

              for (let i = 0; i < selectedAssets.length; i += 1) {
                setButtonMessage('Checking approval...');

                const index: number = selectedAssets[i];
                const asset = assets[index];

                const isApproved = await isApprovedForAllErc721(
                  provider as providers.Web3Provider,
                  asset.contract.address,
                  address,
                  config.contracts.dexther[chainId],
                );

                if (!isApproved) {
                  setButtonMessage('Waiting for approval...');

                  const receipt = await setApprovalForAllErc721(
                    provider as providers.Web3Provider,
                    asset.contract.address,
                    config.contracts.dexther[chainId],
                  );

                  console.log(receipt);
                }

                offerTokensAddresses.push(asset.contract.address);
                offerTokensIds.push(asset.tokenId);
                offerTokensValues.push('1');
              }

              setButtonMessage('Waiting for confirmation...');

              const receipt = await createOffer(
                provider as providers.Web3Provider,
                chainId,
                utils.parseEther(estimateValue),
                config.contracts.tokens.dai[80001],
                offerTokensAddresses,
                offerTokensIds,
                offerTokensValues,
                [],
                constants.AddressZero,
              );

              console.log(receipt);
              setButtonMessage('Yay! Offer was created!');
            } catch (e) {
              console.log(e);
              setButtonMessage('Ooops! Offer could not be created...');
            } finally {
              setIsLoading(false);
            }
          }}
        >
          {buttonMessage}
        </Button>
      </Box>
    </Flex>
  );
}

export default Create;
