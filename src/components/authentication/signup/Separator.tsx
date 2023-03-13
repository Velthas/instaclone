import styled from "styled-components";
import { flexRowCenter } from "../../../styles/style";

const Separator = () => {
  return (
    <Container>
      <Sideburns />
      <Text>O</Text>
      <Sideburns />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 30px;
  margin: 10px 40px 18px;
  ${flexRowCenter}
`;

const Sideburns = styled.div`
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

export default Separator;
