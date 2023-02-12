import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { BsChevronLeft } from "react-icons/bs";

// This component is used to provide the 'slip' on top on mobile view
const MobileHeader = ({ name }) => {
  const navigate = useNavigate();

  return (
    <Container>
      <Back onClick={() => navigate(-1)} />
      <Heading>{name}</Heading>
    </Container>
  );
};

const Container = styled.div`
  display: none;

  @media (max-width: 750px) {
    width: 100%;
    height: 44px;
    padding: 0 16px;
    margin-bottom: 16px;
    border-bottom: 1px solid #dfdfdf;

    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
`;

const Back = styled(BsChevronLeft)`
  height: 24px;
  width: 24px;
  color: #262626;
  cursor: pointer;
  &:hover {
    color: gray;
  }
`;

const Heading = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 1rem;
  font-weight: 500;

  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0;

  height: 100%;
  width: 100%;
`;

export default MobileHeader;
