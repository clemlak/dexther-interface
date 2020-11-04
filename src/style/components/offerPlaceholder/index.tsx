import React from 'react';
import styled from 'styled-components';

import PlaceholderImage from '../../../assets/img/placeholder.jpg';
import PlaceholderAltImage from '../../../assets/img/placeholder_alt.jpg';

const OfferWrapper = styled.div`
  box-sizing: border-box;
  border: none;
  border-radius: ${(props) => (props.theme.border.radius)};
  width: 100%;
  padding: 30px;
  background-color: ${(props) => (props.theme.colors.light)};
`;

const Thumbnail = styled.img`
  display: block;
  width: 100%;
  height: auto;
  border-radius: ${(props) => props.theme.border.radius};
`;

function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

function OfferPlaceholder() {
  const random = getRandomInt(2);

  return (
    <OfferWrapper>
      <Thumbnail src={random === 0 ? PlaceholderImage : PlaceholderAltImage} alt="Thumbnail placeholder" />
    </OfferWrapper>
  );
}

export default OfferPlaceholder;
