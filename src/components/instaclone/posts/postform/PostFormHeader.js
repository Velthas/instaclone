import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { BsArrowLeft, BsXLg } from "react-icons/bs";
import { flexRowBetween } from "../../../../styles/style";

const PostFormHeader = ({ photo, setPhoto, handleSubmit, closeForm }) => {
  return (
    <FormTitle photo={photo}>
      <XIcon onClick={() => closeForm(false)} />
      {photo && <LeftArrow title="go back" onClick={() => setPhoto(false)} />}
      <Heading>Create a new post</Heading>
      {photo && <SharePost onClick={(e) => handleSubmit(e)}>Share</SharePost>}
    </FormTitle>
  );
};

PostFormHeader.propTypes = {
  photo: PropTypes.any,
  setPhoto: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  closeForm: PropTypes.func.isRequired,
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
  transition: 1s ease-out;
  padding: 0 16px;
  ${({ photo }) =>
    photo
      ? flexRowBetween
      : "display: flex; justify-content: flex-start; align-items: center;"};
  width: 100%;
  height: 45px;
  border-bottom: 1px solid #dfdfdf;
`;

const XIcon = styled(BsXLg)`
  display: none;

  @media (max-width: 550px) {
    display: block;
    color: #262626;
    height: 20px;
    width: 20px;
    cursor: pointer;
  }
`;

const LeftArrow = styled(BsArrowLeft)`
  height: 24px;
  width: 24px;
  color: #262626;
  cursor: pointer;

  @media (max-width: 550px) {
    display: none;
  }
`;

const Heading = styled.h1`
  padding: 10px 0;
  font-size: 1rem;
  font-weight: 500;
  color: #000;
  ${({ photo }) =>
    photo ? "width: auto;" : "width: 90%; text-align: center;"};
`;

export default PostFormHeader;
