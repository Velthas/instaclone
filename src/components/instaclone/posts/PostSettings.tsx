import styled from "styled-components";
import { flexColumnCenter } from "../../../styles/style";
import { deletePost } from "../../../firebase/firestore";
import { useNavigate } from "react-router-dom";
import { getCurrentUserUsername } from "../../../firebase/authentication";
import { copyPostUrlToClipboard, openNativeShare } from "../../../utils/sharing";
import { deletePostPhoto } from "../../../firebase/storage";
import { fadeIn } from "../../../styles/style";
import { Post } from "../../../utils/types";

type Props = {
  settings: boolean;
  setSettings: (show: boolean) => void;
  post: Post;
};

const PostSettings = ({ settings, setSettings, post }: Props) => {
  const isOwn = post.username === getCurrentUserUsername(); // Display delete button when is own post
  const navigate = useNavigate();

  // Handles deletion from database and cloud storage
  const handleDelete = async (post: Post) => {
    await deletePostPhoto(post.username, post.id); // Storage
    await deletePost(post); // Db
    navigate(`/profile/${post.username}`); // Redirect to user profile
  };

  return (
    <Settings settings={settings} onClick={() => setSettings(false)}>
      <SettingWrapper>
        {isOwn && (
          <Bubble isOwn={isOwn} onClick={() => handleDelete(post)}>
            Delete
          </Bubble>
        )}
        <Bubble onClick={() => copyPostUrlToClipboard(post.username, post.id)}>
          Copy Link
        </Bubble>
        <Bubble onClick={() => openNativeShare(post.username, post.id)}>
          Share
        </Bubble>
        <Bubble onClick={() => setSettings(false)}>Close</Bubble>
      </SettingWrapper>
    </Settings>
  );
};

const Settings = styled.div<{ settings: boolean }>`
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

  background-color: #1d1d1dcf;

  animation-name: ${fadeIn};
  animation-duration: 0.5s;
  transition-timing-function: ease-out;
`;

const SettingWrapper = styled.div`
  ${flexColumnCenter}
  align-items: center;
  background-color: #fafafa;
  border-radius: 20px;
  width: 300px;
  overflow: hidden;

  @media (max-width: 550px) {
    width: 200px;
  }
`;

const Bubble = styled.div<{isOwn?: boolean}>`
  width: 100%;
  padding: 14px 0;
  text-align: center;
  border-bottom: 1px solid #dfdfdf;
  font-size: 0.8rem;
  cursor: pointer;

  ${({ isOwn }) => (isOwn ? "font-weight: 500; color: red;" : "")};
  &:hover {
    background-color: #dfdfdf;
  }
`;

export default PostSettings;
