/* eslint-disable no-await-in-loop */

import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  useParams,
} from 'react-router-dom';
import {
  Flex,
  Box,
} from 'reflexbox';
import styled from 'styled-components';
import {
  utils,
  providers,
} from 'ethers';

import {
  Web3Context,
} from '../../store/web3ContextProvider';

import {
  getOfferWithAssets,
  getStatus,
  swap,
  finalize,
} from '../../utils/dexther';

import {
  getAssetsOf,
  isApprovedForAllErc721,
  setApprovalForAllErc721,
  balanceOfErc20,
  approveErc20,
  allowanceErc20,
} from '../../utils/tokenUtils';

import {
  Text,
  Title,
  Subtitle,
  Tag,
  NftCard,
  Button,
  Modal,
} from '../../style/components';

import Dai from '../../assets/icons/dai.png';

import config from '../../utils/config';

const OfferTitle = styled(Title)`
  margin: 0;
  font-size: 28px;
  font-weight: 600;
`;

const OfferTag = styled(Tag)`
  vertical-align: text-bottom;
  display: inline-block;
`;

const AssetsSubtitle = styled(Text)`
  display: inline;
  font-size: 16px;
  margin: 0;
  font-weight: 600;
  margin-left: 10px;
`;

const CreatorSubtitle = styled(Subtitle)`
  display: inline;
  font-size: 16px;
  margin: 0;
  color: #595959;
`;

const AssetsTitle = styled(Subtitle)`
  font-size: 20px;
  display: inline-block;
`;

const DaiLogo = styled.img`
  height: 28px;
  margin-right: 10px;
  margin-left: 10px;
`;

const EstimateAmountLabel = styled.span`
  font-family: ${(props) => props.theme.font.family}, sans-serif;
  font-weight: ${(props) => props.theme.font.weight.medium};
  font-size: ${(props) => props.theme.font.size.regular};
  color: ${(props) => props.theme.colors.primary};
  margin: 0;
`;

const EstimateLabel = styled.span`
  font-family: ${(props) => props.theme.font.family}, sans-serif;
  font-weight: ${(props) => props.theme.font.weight.regular};
  font-size: ${(props) => props.theme.font.size.regular};
  color: ${(props) => props.theme.colors.secondary};
  margin: 0;
`;

interface ParamsInterface {
  id: string;
}

function OfferView() {
  const web3Context = useContext(Web3Context);
  const {
    id,
  } = useParams<ParamsInterface>();

  const {
    state,
  } = web3Context;

  const {
    chainId,
    provider,
    address,
  } = state;

  const [offer, setOffer] = useState<OfferWithAssets>();
  const [isModalOpen, toggle] = useState<boolean>(false);
  const [userAssets, setUserAssets] = useState<Asset[]>([]);
  const [selectedAssets, setSelectedAssets] = useState<number[]>([]);

  const [userTokenBalance, setUserTokenBalance] = useState<string>('0');

  const [isSwapLoading, setIsSwapLoading] = useState<boolean>(false);
  const [swapButtonMessage, setSwapButtonMessage] = useState<string>('Swap');

  const [isCollateralButtonLoading, setIsCollateralButtonLoading] = useState<boolean>(false);
  const [collateralButtonMessage, setCollateralButtonMessage] = useState<string>('Collect the collateral');

  const [isAssetsButtonLoading, setIsAssetsButtonLoading] = useState<boolean>(false);
  const [assetsButtonMessage, setAssetsButtonMessage] = useState<string>('Collect the assets');

  useEffect(() => {
    async function fetchOffer() {
      try {
        const res = await getOfferWithAssets(provider, chainId, id);
        setOffer(res);
      } catch (e) {
        console.log(e);
      }
    }

    if (id !== undefined && id !== '') {
      fetchOffer();
    }
  }, []);

  useEffect(() => {
    async function fetchUserBalance() {
      if (address !== '' && offer !== undefined) {
        try {
          const balance = await balanceOfErc20(
            provider as providers.Web3Provider,
            offer.estimateTokenAddress,
            address,
          );

          setUserTokenBalance(utils.formatEther(balance));
        } catch (e) {
          console.log(e);
        }
      }
    }

    fetchUserBalance();
  }, [provider, chainId, address, offer]);

  useEffect(() => {
    async function doGetUserAssets() {
      const res = await getAssetsOf(
        provider,
        '0x939f7EB5C1C80b1D125F87Da3F739EFFDa026c0f',
        address,
      );
      setUserAssets(res);
    }

    if (isModalOpen && userAssets.length === 0) {
      doGetUserAssets();
    }
  }, [isModalOpen]);

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        title="Swap"
        toggle={() => toggle(!isModalOpen)}
        maxWidth="120vh"
      >
        <Text>
          Select the assets you want to swap against:
        </Text>
        <Flex
          flexWrap="wrap"
        >
          {userAssets.length > 0 ? userAssets.map((asset: Asset, index: number) => (
            <Box
              key={asset.tokenId}
              width={[1, 1 / 3]}
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
        </Flex>
        <Box
          width={1}
          pt={4}
        >
          <Button
            genre="brand"
            size="m"
            isLoading={isSwapLoading}
            disabled={selectedAssets.length === 0}
            onClick={async () => {
              setIsSwapLoading(true);

              try {
                const swapTokensAddresses: string[] = [];
                const swapTokensIds: string[] = [];
                const swapTokensValues: string[] = [];

                for (let i = 0; i < selectedAssets.length; i += 1) {
                  setSwapButtonMessage('Checking assets approval...');

                  const index: number = selectedAssets[i];
                  const asset = userAssets[index];

                  const isApproved = await isApprovedForAllErc721(
                    provider as providers.Web3Provider,
                    asset.contract.address,
                    address,
                    config.contracts.dexther[chainId],
                  );

                  if (!isApproved) {
                    setSwapButtonMessage('Waiting for asset approval...');

                    const receipt = await setApprovalForAllErc721(
                      provider as providers.Web3Provider,
                      asset.contract.address,
                      config.contracts.dexther[chainId],
                    );

                    console.log(receipt);
                  }

                  setSwapButtonMessage('Checking token approval...');

                  const allowance = await allowanceErc20(
                    provider as providers.Web3Provider,
                    offer?.estimateTokenAddress as string,
                    address,
                    config.contracts.dexther[chainId],
                  );

                  if (allowance.lt(utils.parseEther(offer?.estimateAmount as string))) {
                    setSwapButtonMessage('Waiting for token approval...');

                    const receipt = await approveErc20(
                      provider as providers.Web3Provider,
                      offer?.estimateTokenAddress as string,
                      config.contracts.dexther[chainId],
                      utils.parseEther(offer?.estimateAmount as string),
                    );

                    console.log(receipt);
                  }

                  swapTokensAddresses.push(asset.contract.address);
                  swapTokensIds.push(asset.tokenId);
                  swapTokensValues.push('1');
                }

                setSwapButtonMessage('Waiting for confirmation...');

                const receipt = await swap(
                  provider as providers.Web3Provider,
                  chainId,
                  id,
                  swapTokensAddresses,
                  swapTokensIds,
                  swapTokensValues,
                );

                console.log(receipt);

                setSwapButtonMessage('Yay! Swap was successful!');
              } catch (e) {
                setSwapButtonMessage('Ooops! Swap could not performed...');
                console.log(e);
              } finally {
                setIsSwapLoading(false);
              }
            }}
            block
          >
            {swapButtonMessage}
          </Button>
        </Box>
      </Modal>
      <Flex
        flexWrap="wrap"
        alignItems="center"
        width={[1, 1 / 2]}
        mx="auto"
      >
        {offer === undefined ? (
          <Box
            width={1}
          >
            <Text>
              Offer not found...
            </Text>
          </Box>
        ) : (
          <>
            <Box
              width={1 / 2}
              pb={1}
            >
              <OfferTitle>
                {`Offer #${id}`}
              </OfferTitle>
            </Box>

            <Box
              width={1 / 2}
              pb={1}
              textAlign="right"
            >
              <OfferTag genre="default">
                {getStatus(offer.status)}
              </OfferTag>
            </Box>

            <Box
              width={1 / 2}
              pb={4}
            >
              <CreatorSubtitle>
                {offer.creator === address ? (
                  <>
                    Created by you
                  </>
                ) : (
                  <>
                    {`Created by ${offer.creator}`}
                  </>
                )}
              </CreatorSubtitle>
            </Box>

            <Box
              width={1 / 2}
              pb={3}
            >
              <Flex
                alignItems="center"
                justifyContent="flex-end"
              >
                <EstimateLabel>
                  Estimated value
                </EstimateLabel>
                <DaiLogo src={Dai} alt="Dai logo" />
                <EstimateAmountLabel>
                  {`${offer.estimateAmount} DAI`}
                </EstimateAmountLabel>
              </Flex>
            </Box>

            {offer.creator === address && offer.status === '1' && (
              <Box
                width={1}
                pb={5}
              >
                <Subtitle>
                  Congratulations!
                </Subtitle>
                <Text>
                  Your offer has been swapped. You can now choose between the assets proposed by the swapper or the collateral.
                </Text>
                <Flex
                  justifyItems="center"
                >
                  <Box
                    width={1 / 2}
                    px={2}
                  >
                    <Button
                      genre="brand"
                      size="m"
                      isLoading={isCollateralButtonLoading}
                      block
                      onClick={async () => {
                        setIsCollateralButtonLoading(true);
                        setCollateralButtonMessage('Waiting for confirmation...');

                        try {
                          const receipt = await finalize(
                            provider as providers.Web3Provider,
                            chainId,
                            id,
                            false,
                          );

                          console.log(receipt);
                          setCollateralButtonMessage('Collateral was collected!');
                        } catch (e) {
                          setCollateralButtonMessage('Ooops! Collateral could not been collected...');
                          console.log(e);
                        } finally {
                          setIsCollateralButtonLoading(false);
                        }
                      }}
                    >
                      {collateralButtonMessage}
                    </Button>
                  </Box>
                  <Box
                    width={1 / 2}
                    px={2}
                  >
                    <Button
                      genre="brand"
                      size="m"
                      isLoading={isAssetsButtonLoading}
                      block
                      onClick={async () => {
                        setIsAssetsButtonLoading(true);
                        setAssetsButtonMessage('Waiting for confirmation...');

                        try {
                          const receipt = await finalize(
                            provider as providers.Web3Provider,
                            chainId,
                            id,
                            true,
                          );

                          console.log(receipt);
                          setAssetsButtonMessage('Assets were collected!');
                        } catch (e) {
                          setAssetsButtonMessage('Oooops! Assets could not been collected...');
                          console.log(e);
                        } finally {
                          setIsAssetsButtonLoading(false);
                        }
                      }}
                    >
                      {assetsButtonMessage}
                    </Button>
                  </Box>
                </Flex>
              </Box>
            )}

            <Box
              width={1}
              pb={4}
            >
              <AssetsTitle margin="0">
                Assets inside this offer
              </AssetsTitle>
              <AssetsSubtitle>
                {`(${offer.offerAssets.length})`}
              </AssetsSubtitle>
            </Box>

            {offer.offerAssets.map((asset) => (
              <Box
                width={1 / 2}
                pb={2}
                key={`${asset.contract.address}/${asset.tokenId}`}
              >
                <NftCard
                  imageUrl={asset.imageUrl}
                  assetName={asset.name}
                  contractName={asset.contract.name}
                  isSelected={false}
                  onClick={() => {}}
                />
              </Box>
            ))}
            {offer && offer.status !== '0' && (
              <>
                <Box
                  width={1}
                  pb={4}
                  pt={5}
                >
                  <AssetsTitle margin="0">
                    Assets swapped
                  </AssetsTitle>
                  <AssetsSubtitle>
                    {`(${offer.swapAssets.length})`}
                  </AssetsSubtitle>
                </Box>
                {offer.swapAssets.map((asset) => (
                  <Box
                    width={1 / 2}
                    pb={2}
                    key={`${asset.contract.address}/${asset.tokenId}`}
                  >
                    <NftCard
                      imageUrl={asset.imageUrl}
                      assetName={asset.name}
                      contractName={asset.contract.name}
                      isSelected={false}
                      onClick={() => {}}
                    />
                  </Box>
                ))}
              </>
            )}
            {offer && offer.status === '0' && offer.creator !== address && (
              <Box
                width={1}
                pt={5}
              >
                <Button
                  genre="brand"
                  size="m"
                  onClick={() => toggle(!isModalOpen)}
                  disabled={address === '' || parseFloat(userTokenBalance) < parseFloat(offer.estimateAmount)}
                  block
                >
                  Swap
                </Button>
                {parseFloat(userTokenBalance) < parseFloat(offer.estimateAmount) && (
                  <Text>
                    You do not have enough DAI to perform this swap.
                  </Text>
                )}
              </Box>
            )}
          </>
        )}
      </Flex>
    </>
  );
}

export default OfferView;
