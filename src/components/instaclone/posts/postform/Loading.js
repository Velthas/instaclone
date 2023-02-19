import React from "react";
import styled from "styled-components";
import loadingImage from "../../../../assets/icons/instaload.gif";

const Loading = ({ loading }) => {
  return (
    <Container loading={loading}>
      <LoadingGif src={loadingImage} />
    </Container>
  );
};

const Container = styled.div`
  display: ${(props) => (props.loading ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;

  @media (max-width: 750px) {
    height: 400px;
    width: 100%;
  }
`;

const LoadingGif = styled.img`
  width: 100px;
  height: 100px;
`;

export default Loading;
