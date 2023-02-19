import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Message = ({ message, user }) => {
  return (
    <Container isOwn={user === message.author}>{message.content}</Container>
  );
};

Message.propTypes = {
  user: PropTypes.string.isRequired,
  message: PropTypes.object.isRequired,
};

const LeftAlign = `
  margin-right: auto;
  margin-left: 0;
`;

const RightAlign = `
  margin-right: 0;
  margin-left: auto;
`;

const Container = styled.div`
  padding: 16px;
  border: 1px solid #efefef;
  border-radius: 24px;
  background-color: ${({ isOwn }) => (isOwn ? "#efefef" : "#fff")};
  color: #262626;
  ${({ isOwn }) => (isOwn ? RightAlign : LeftAlign)};
  width: fit-content;
  max-width: 70%;
  white-space: break-spaces;
  word-break: break-word;
  margin-bottom: 8px;
  font-size: 14px;
`;

export default Message;
