import React from "react";
import styled from "styled-components";
import { flexRowBetween, flexRowCenter } from "../../../../styles/style";
import { openNativeShare } from "../../../../utils/sharing";

import heart from "../../../../assets/icons/heart.svg";
import fillheart from "../../../../assets/icons/fillheart.svg";
import share from "../../../../assets/icons/share.svg";
import comment from "../../../../assets/icons/chat.png";
import share2 from "../../../../assets/icons/share2.svg";

const Icons = ({ liked, changeLiked }) => {
  return (
    <Container>
      <IconContainer>
        <Icon
          liked={liked}
          src={liked ? fillheart : heart}
          onClick={() => changeLiked(liked)}
          alt="heart"
        />
        <Icon src={comment} alt="speech bubble" />
        <Icon src={share} alt="go-to" />
      </IconContainer>
      <Icon src={share2} alt="share with device" onClick={openNativeShare} />
    </Container>
  );
};

const Container = styled.div`
  ${flexRowBetween}
  padding: 10px 5%;
  width: 100%;
`;

const IconContainer = styled.div`
  ${flexRowCenter}
  gap: 10px;
`;

const Icon = styled.img`
  height: 24px;
  width: 24px;
  cursor: pointer;
  ${({ liked }) => {
    return liked
      ? "filter: invert(50%) sepia(87%) saturate(5070%) hue-rotate(332deg) brightness(99%) contrast(85%);"
      : "";
  }}
`;

export default Icons;
