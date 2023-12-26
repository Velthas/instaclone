import styled from "styled-components";
import { flexRowCenter } from "../../../styles/style";
import { GrFacebook } from "react-icons/gr";

const Facebook = () => {
  return (
    <>
      <Container>
        <Separator />
        <Text>O</Text>
        <Separator />
      </Container>
      <FacebookWrapper>
        <FacebookIcon />
        <FacebookSpan>Log in with Facebook</FacebookSpan>
      </FacebookWrapper>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  height: 30px;
  margin: 10px 40px 18px;
  ${flexRowCenter}
`;

const Separator = styled.div`
  width: 100%;
  height: 1px;
  border-top: 1px solid #dbdbdb;
`;

const Text = styled.span`
  margin: 0 10px;
  font-weight: 500;
  font-size: 1rem;
  color: #8e8e8e;
`;

const FacebookWrapper = styled.div`
  margin: 0 0 8px 0;
  color: #385185;
  cursor: pointer;
  ${flexRowCenter}
`;

const FacebookIcon = styled(GrFacebook)`
  margin-right: 10px;
  height: 24px;
  width: 24px;
`;

const FacebookSpan = styled.span`
  font-weight: 500;
`;

export default Facebook;
