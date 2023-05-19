import styled from "styled-components";
import { flexColumnCenter } from "../../../styles/style";

const LoadingPost = () => {
  return (
    <Container>
      <Header>
        <FakePfp />
        <Info>
          <LoadingInfo />
          <ShortLoadingInfo />
        </Info>
      </Header>
      <LoadingPicture />
    </Container>
  );
};

const Container = styled.div`
  ${flexColumnCenter}
  width: 470px;
  position: relative;
  font-size: 0.9rem;
  margin-bottom: 20px;

  @media (max-width: 550px) {
    width: 95%;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 50px;
  width: 100%;
  padding: 5px 0;
`;

const FakePfp = styled.div`
  width: 32px;
  height 32px;
  border-radius: 50%;
  background-color: #e9e9e9;
  margin-right: 16px;

  flex-shrink: 0;
`;

const Info = styled.div`
  ${flexColumnCenter};
  align-items: flex-start;
  justify-content: center;
  height: 100%;
  gap: 8px;
  font-size: 0.9rem;
  width: 100%;
`;

const LoadingPicture = styled.div`
  width: 100%;
  height: 400px;
  aspect-ratio: 1/1;
  border-radius: 3px;
  cursor: pointer;
  background-color: #e9e9e9;
`;

const LoadingInfo = styled.div`
  width: min(120px, 50%);
  height: 10px;
  background-color: #e9e9e9;
`;

const ShortLoadingInfo = styled(LoadingInfo)`
  width: min(75px, 35%);
`;

export default LoadingPost;
