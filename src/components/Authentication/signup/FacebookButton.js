import React from "react";
import styled from "styled-components";
import { flexRowCenter } from "../../../styles/style";
import { GrFacebook } from "react-icons/gr";

const FacebookButton = () => {
  return (
    <Button>
      <FacebookIcon />
      <Text>Sign up with Facebook</Text>
    </Button>
  );
};

const Button = styled.button`
  ${flexRowCenter};
  width: 100%;
  height: 32px;
  margin: 10px 0;
  padding: 7px 16px;
  border: none;
  border-radius: 10px;

  cursor: pointer;
  background-color: #0095f6;
  color: #fff;
  font-weight: 500;

  &:hover {
    background-color: #1877f2;
  }
`;

const Text = styled.span`
  color: #fff;
  font-weight: 500;
  margin-left: 10px;
`;

const FacebookIcon = styled(GrFacebook)`
  margin-right: 10px;
  height: 24px;
  width: 24px;
`;

export default FacebookButton;
