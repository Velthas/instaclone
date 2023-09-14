import { useState } from "react";
import styled from "styled-components";
import { BsEmojiSmile, BsGeoAlt, BsChevronDown } from "react-icons/bs";
import { flexRowBetween } from "../../../../styles/style";
import { InstaUser } from "../../../../utils/types";

type Props = {
  user: InstaUser | null | undefined;
  loading: boolean;
  photo: false | string;
};

function PostInfo({ user, loading, photo }: Props) {
  const [value, setValue] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setValue(e.target.value);

  return (
    <Container loading={loading} photo={photo}>
      <TextBox>
        <UserInfo>
          <UserPic url={user ? user.pfp : ""}></UserPic>
          <Username>{user ? user.username : ""}</Username>
        </UserInfo>
        <TextArea
          onChange={(e) => handleChange(e)}
          value={value}
          maxLength={2200}
          id="post-description"
          placeholder="Add a description..."
        />
        <Extra>
          <BsEmojiSmile title="emoji" size={20} />
          <WordCount>{value.length}/2200</WordCount>
        </Extra>
      </TextBox>
      <Options>
        <span>Add a location</span>
        <BsGeoAlt size={20}></BsGeoAlt>
      </Options>
      <Options>
        <span>Accessibility</span>
        <BsChevronDown size={20}></BsChevronDown>
      </Options>
      <Options>
        <span>Advanced Options</span>
        <BsChevronDown size={20}></BsChevronDown>
      </Options>
    </Container>
  );
}

const Container = styled.div<{ photo: false | string; loading: boolean }>`
  flex-shrink: 0;
  height: 100%;
  width: 0%;
  height: 0%;
  transition: 0.3s ease-out;
  border-left: 1px solid #dfdfdf;
  ${({ photo }) =>
    photo ? "width: 300px; opacity: 1; height: 100%;" : "opacity: 0;"};
  ${({ loading }) => (loading ? "display: none" : "")};
  background-color: #fff;

  @media (max-width: 750px) {
    border-left: none;
    width: 100%;
    ${({ photo }) => (photo ? "opacity: 1; height: 100%;" : "opacity: 0;")};
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  @media (max-width: 550px) {
    border-radius: 0;
  }
`;

const TextBox = styled.div`
  height: 50%;
  width: 100%;
  padding-bottom: 10px;
`;

const UserInfo = styled.div`
  height: 20%;
  width: 100%;
  padding: 0 16px;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  @media (max-width: 750px) {
    padding: 8px 16px;
  }
`;

const TextArea = styled.textarea`
  border: none;
  word-break: break-word;
  height: 60%;
  width: 100%;
  padding: 0 16px;
  outline: none;
  resize: none;
  font-size: 1rem;
  &::placeholder {
    color: #c7c7c7;
  }

  @media (max-width: 750px) {
    min-height: 70px;
    ${flexRowBetween}
  }
`;

const Extra = styled.div`
  height: 15%;
  padding: 0 16px;
  color: #ababab;

  display: flex;
  gap: 8px;
  justify-content: flex-start;
  align-items: center;
`;

const UserPic = styled.div<{ url: false | string }>`
  background-image: url(${(props) => (props.url ? props.url : "")});
  background-position: center;
  background-size: cover;
  height: 28px;
  width: 28px;
  border-radius: 100%;
  border: 1px solid #dfdfdf;
  margin-right: 10px;
`;

const Username = styled.span`
  color: #2e2e2e;
  font-size: 0.9rem;
  font-weight: 500;
`;

const WordCount = styled.span`
  font-size: 0.8rem;
`;

const Options = styled(Extra)`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: space-between;

  color: #2e2e2e;
  border-bottom: 1px solid #dfdfdf;
  border-top: 1px solid #dfdfdf;
  margin-top: -1px;
  height: 50px;

  @media (max-width: 750px) {
    border-bottom: none;
  }

  @media (max-width: 550px) {
    border-bottom: 1px solid #dfdfdf;
  }
`;

export default PostInfo;
