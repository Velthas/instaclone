import React from "react";
import styled from "styled-components";
import { BsArrowLeft } from "react-icons/bs";
import { flexRowBetween, flexRowCenter } from "../../../../styles/style";

const PostFormHeader = ({ photo, setPhoto, handleSubmit }) => {
  return (
    <FormTitle photo={photo}>
      {photo && <BsArrowLeft size={24} onClick={() => setPhoto(false)} />}
      <Heading>Create a new post</Heading>
      {photo && <SharePost onClick={(e) => handleSubmit(e)}>Share</SharePost>}
    </FormTitle>
  );
};

const SharePost = styled.p`
  cursor: pointer;
  color: #0095f6;
  font-weight: 500;
  font-size: 0.9rem;
  &:hover {
    color: #000;
  }
`;

const FormTitle = styled.div`
  padding: 0 16px;
  ${({ photo }) => (photo ? flexRowBetween : flexRowCenter)};
  width: 100%;
  height: 45px;
  border-bottom: 1px solid #dfdfdf;
`;

const Heading = styled.h1`
  padding: 10px 0;
  font-size: 1rem;
  font-weight: 500;
  color: #000;
`;

export default PostFormHeader;
