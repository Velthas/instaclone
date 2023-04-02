import styled from "styled-components";
import { ChatMessage } from "../../../utils/types";

type Props = {
  message: ChatMessage,
  user: string,
};

const Message = ({ message, user }: Props) => {
  return (
    <Container isOwn={user === message.author}>{message.content}</Container>
  );
};

const LeftAlign = `
  margin-right: auto;
  margin-left: 0;
`;

const RightAlign = `
  margin-right: 0;
  margin-left: auto;
`;

const Container = styled.div<{isOwn: boolean}>`
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
