import React from "react";
import styled from "styled-components";
import { flexColumnCenter, flexRowCenter } from "../../../styles/style";
import trashcan from "../../../assets/icons/delete.svg";
import url from "../../../assets/icons/url.svg";
import share from "../../../assets/icons/share.svg";
import closeIcon from "../../../assets/icons/crossIcon.svg";
import { deletePost } from "../../../firebase/firestore";
import { useNavigate } from "react-router-dom";
import { getCurrentUserUsername } from "../../../firebase/authentication";
import { copyPostUrlToClipboard, openNativeShare } from "../../../utils/sharing";

const PostSettings = ({ settings, setSettings, post }) => {
  const isOwn = post.username === getCurrentUserUsername(); // Determine if delete button can be displayed.
  const navigate = useNavigate();

  const handleDelete = async (post) => {
    await deletePost(post); // Once a post is deleted, bring the user back to their profile.
    navigate(`profile/${post.username}`); // The profile component mount will trigger a data fetch.
  };

  return (
    <Settings settings={settings}>
      <CloseFormIcon onClick={() => setSettings(false)} src={closeIcon} alt="close form"/>
      <SettingWrapper>
        <Bubble onClick={() => copyPostUrlToClipboard(post.username, post.id)}>
          <Icon src={url} alt="url"/>
          <p>Copy Link</p>
        </Bubble>
        <Bubble onClick={() => openNativeShare(post.username, post.id)}>
          <Icon src={share} alt="post share"/>
          <p>Share</p>
        </Bubble>
      </SettingWrapper>
      {isOwn && (
        <LongContainer onClick={() => handleDelete(post)}>
          <Icon src={trashcan} alt="delete" />
          <p>Delete</p>
        </LongContainer>
      )}
    </Settings>
  );
};

const CloseFormIcon = styled.img`
  position: absolute;
  height: 35px;
  padding: 5px;
  top: 2%;
  right: 2%;
  background-color: gainsboro;
  border-radius: 100%;
  cursor: pointer;
  &:hover {
    filter: brightness(0.8);
  }
`;

const Settings = styled.div`
  position: absolute;
  z-index: 1;

  width: ${({ settings }) => (settings ? "100%" : "0px")};
  height: ${({ settings }) => (settings ? "100%" : "0px")};
  border-radius: inherit;

  display: ${({ settings }) => (settings ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;

  background-color: #f5f5f5cf;
`;

const Icon = styled.img`
  width: 40px;
`;

const SettingWrapper = styled.div`
  ${flexRowCenter}
  width: 90%;
  gap: 10px;
`;

const Bubble = styled.div`
  width: 50%;
  height: 100px;
  border-radius: 8px;
  border: 1px solid black;
  background-color: transparent;
  transition: ease-out 0.3s;
  cursor: pointer;

  ${flexColumnCenter}
  justify-content: center;
  &:hover {
    transform: scale(1.03);
  }
`;

const LongContainer = styled(Bubble)`
  width: 90%;
  filter: invert(27%) sepia(92%) saturate(7490%) hue-rotate(357deg)
    brightness(93%) contrast(119%);
  border: 1px solid red;
`;

export default PostSettings;
