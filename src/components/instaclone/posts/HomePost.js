import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getCurrentUserUsername } from "../../../firebase/authentication";
import { getUserInfo } from "../../../firebase/firestore";
import { useLiked, useComments } from "../../../utils/hooks";
import { flexRowCenter, flexColumnCenter, flexRowBetween } from "../../../styles/style";
import { openNativeShare } from "../../../utils/sharing";
import dots from "../../../assets/icons/dots.svg";
import heart from "../../../assets/icons/heart.svg";
import fillheart from "../../../assets/icons/fillheart.svg";
import comment from "../../../assets/icons/chat.png";
import sendcomment from "../../../assets/icons/instashare.svg";
import share from "../../../assets/icons/share.svg";
import share2 from "../../../assets/icons/share2.svg";
import Input from "../../inputs/Input";
import MinimalComment from "./comments/MinimalComment";
import PostSettings from "./PostSettings";

const HomePost = ({ post }) => {
  const currentUser = getCurrentUserUsername();
  const [settings, setSettings] = useState(false);
  const [liked, setLiked] = useLiked(post); // We put an a at the beginning to ensure id starts with letter
  const [comments, insertComment] = useComments(post, `#a${post.id}`); // If not, it will throw an err.
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getPosterInfo = async () => {
      const username = post.username;
      const info = await getUserInfo(username);
      setUser(info);
      setLoading(false);
    };
    getPosterInfo();
  }, []);

  return (
    <Container>
      <PostSettings
        settings={settings}
        setSettings={setSettings}
        post={post}
      />
      <Postheader>
        <PosterInfo>
          <PosterIcon>
            <Picture
              src={loading ? "" : user.pfp}
              alt="poster profile picture"
            />
          </PosterIcon>
          <div>
            <PosterName>{loading ? "" : user.name}</PosterName>
            <PosterUsername>
              {loading ? "" : "@" + user.username}
            </PosterUsername>
          </div>
        </PosterInfo>
        <SmallerIcon
          src={dots}
          onClick={() => setSettings(true)}
          alt="settings"
        />
      </Postheader>
      <PhotoContainer>
        <Picture src={loading ? "" : post.photo} alt="post picture" />
      </PhotoContainer>
      <Postheader>
        <IconContainer>
          <Heart
            liked={liked}
            src={liked ? fillheart : heart}
            onClick={() => setLiked(!liked)}
            alt="heart"
          />
          <Icon src={comment} alt="speech bubble" />
          <Icon src={share} alt="go-to" />
        </IconContainer>
        <Icon src={share2} alt="share" onClick={() => openNativeShare(post.username, post.id)} />
      </Postheader>
      <CommentSection>
        <p>
          {(liked
            ? post.likedby.filter((user) => user !== currentUser).length + 1
            : post.likedby.filter((user) => user !== currentUser).length) +
            " likes"}
        </p>
        {!loading && comments.length > 2 && (
          <ViewMoreCommentsPara>View All Comments</ViewMoreCommentsPara>
        )}
        {!loading &&
          comments
            .slice(0, 2)
            .map((comment) => (
              <MinimalComment key={comment.id} comment={comment} />
            ))}
      </CommentSection>
      <AddComment>
        <div>
          <Input
            type="text"
            id={'a' + post.id}
            placeholder="Add your comment here..."
            styling={CommentInput}
          />
        </div>
        <SmallerIcon
          src={sendcomment}
          onClick={insertComment}
          alt="send-comment"
        />
      </AddComment>
    </Container>
  );
};

const Container = styled.div`
  ${flexColumnCenter}
  width: 550px;
  border-radius: 16px;
  box-shadow: 3px 3px 10px #adaaaa;
  position: relative;
`;

const PosterInfo = styled.div`
  ${flexRowCenter}
  gap: 5px;
`;

const PosterName = styled.p`
  font-size: 1.1rem;
  color: black;
  font-weight: bold;
`;

const PosterUsername = styled.p`
  font-size: 0.9rem;
  color: gray;
  font-weight: bold;
`;

const PosterIcon = styled.div`
  height: 38px;
  width: 38px;
`;

const Picture = styled.img`
  object-fit: cover;
  height: inherit;
  width: inherit;
`;

const Icon = styled.img`
  height: 24px;
  width: 24px;
`;

const SmallerIcon = styled.img`
  height: 18px;
  width: 18px;
`;

const Heart = styled(Icon)`
  transition: 0.3s;
  ${({ liked }) => {
    return liked
      ? "filter: invert(50%) sepia(87%) saturate(5070%) hue-rotate(332deg) brightness(99%) contrast(85%);"
      : "";
  }};
`;

const Postheader = styled.div`
  ${flexRowBetween}
  width: 90%;
  height: 50px;
  margin: 0 10%;
`;

const ViewMoreCommentsPara = styled.p`
  font-size: 0.9rem;
  color: gray;
`;

const CommentSection = styled.div`
  width: 90%;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const PhotoContainer = styled.div`
  width: 100%;
  height: 500px;
`;

const IconContainer = styled.div`
  ${flexRowCenter}
  gap: 10px;
`;
const AddComment = styled.div`
  ${flexRowBetween}
  width: 90%;
  height: 25px;
  padding: 20px 0 5% 0;
  border-top: 1px solid gray;
`;

const CommentInput = `
  width: 470px;
  border: none;
`;

export default HomePost;
