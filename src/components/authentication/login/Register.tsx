import { Link } from "react-router-dom";
import styled from "styled-components";
import { flexRowCenter } from "../../../styles/style";

const Register = () => {
  return (
    <Container>
      Don't have an account?
      <StyledLink to="/auth/signup">Sign up</StyledLink>
    </Container>
  );
};

const Container = styled.div`
  ${flexRowCenter};
  width: 350px;
  min-height: 50px;
  margin: 15px 0;
  border: 1px solid #dbdbdb;
  font-size: 1rem;

  @media (max-width: 550px) {
    width: 80%;
  }

  @media (max-width: 350px) {
    flex-direction: column;
    width: 90%;
  }
`;

const StyledLink = styled(Link)`
  color: #4295f6;
  font-weight: 500;
  text-decoration: none;
  margin-left: 5px;
`;

export default Register;
