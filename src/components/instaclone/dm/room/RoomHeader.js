import React from "react";
import styled from "styled-components";
import { flexRowBetween, flexRowCenter } from "../../../../styles/style";
import { BsTelephone, BsCameraVideo, BsInfoCircle } from "react-icons/bs";

const RoomHeader = ({active}) => {
  return (
    <Header>
      <Username>{active.username}</Username>
      <Icons>
        <BsTelephone />
        <BsCameraVideo />
        <BsInfoCircle />
      </Icons>
    </Header>
  );
};

export default RoomHeader;

const Header = styled.div`
  width: 100%;
  height: 60px;
  padding: 0 5%;
  border-bottom: 1px solid #dfdfdf;

  ${flexRowBetween}
`;

const Username = styled.span`
  font-weight: 500;
  font-size: 1rem;
`;

const Icons = styled.div`
  ${flexRowCenter};
  gap: 10px;
`;
