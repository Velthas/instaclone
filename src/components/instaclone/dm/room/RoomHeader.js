import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { flexRowBetween, flexRowCenter } from "../../../../styles/style";
import { BsTelephone, BsCameraVideo, BsInfoCircle, BsChevronLeft } from "react-icons/bs";

const RoomHeader = ({ active, backToChatSelection }) => {
  return (
    <Header>
      <BackIcon onClick={backToChatSelection} />
      <Username>{active ? active.username : ""}</Username>
      <Icons>
        <BsTelephone />
        <BsCameraVideo />
        <BsInfoCircle />
      </Icons>
    </Header>
  );
};

RoomHeader.propTypes = {
  active: PropTypes.any,
  backToChatSelection: PropTypes.func.isRequired
};

const Header = styled.div`
  width: 100%;
  height: 60px;
  flex-shrink: 0;
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

const BackIcon = styled(BsChevronLeft)`
  display: none;

  @media (max-width: 750px) {
    display: block;
  }
`;

export default RoomHeader;
