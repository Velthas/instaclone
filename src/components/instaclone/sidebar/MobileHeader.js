import React from "react";
import styled from "styled-components";
import { BsChevronLeft } from "react-icons/bs";

const MobileHeader = ({ toggleSidebar, section, icon }) => {
  return (
    <MobileContainer>
      <BsChevronLeft onClick={() => toggleSidebar(icon)} />
      <MobileHeading>{section}</MobileHeading>
    </MobileContainer>
  );
};

const MobileContainer = styled.div`
  display: none;
  padding: 8px;
  border-bottom: 1px solid #dfdfdf;

  @media (max-width: 750px) {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
`;

const MobileHeading = styled.h1`
  font-size: 1rem;
  font-weight: 500;
  color: #262626;
  width: 85%;
  text-align: center;
  text-transform: capitalize;
`;

export default MobileHeader;
