import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { usePost, useComments, useFollow } from "../../../../utils/hooks";
import { flexColumnCenter, flexRowCenter } from "../../../../styles/style";

import PostSettings from "../PostSettings";
import Header from "./Header";
import Comments from "./Comments";
import Icons from "./Icons";
import Stats from "./Stats";
import Add from "./Add";
import MobileHeader from "../../mobile/MobileHeader";

const FullPost = ({ closeSidebar }) => {
  const { postid, username } = useParams();
  const postInfo = { id: postid, username }; // Used to fetch information about the post
  const [settings, setSettings] = useState(false); // Regulates display of post settings
  const [post, user, liked, changeLiked] = usePost(username, postid);
  const [comments, insertComment] = useComments(postInfo, `#a${postInfo.id}`);
  const [followed, updateFollowed] = useFollow(user ? user : null);

  return (
    <Container onClick={closeSidebar}>
      <MobileHeader name="Post" />
      <PostWrapper>
        {post && (
          <PostSettings
            settings={settings}
            setSettings={setSettings}
            post={post}
          />
        )}
        <Photo title="post picture" url={post ? post.photo : ""} />
        <Info>
          <Header
            user={user}
            setSettings={setSettings}
            followed={followed}
            updateFollowed={updateFollowed}
          />
          <Comments
            post={post}
            user={user}
            comments={comments}
            postInfo={postInfo}
          />
          <StatWrapper>
            <Icons liked={liked} changeLiked={changeLiked} />
            <Stats post={post} liked={liked} />
          </StatWrapper>
          <Add postInfo={postInfo} insertComment={insertComment} />
        </Info>
      </PostWrapper>
    </Container>
  );
};

FullPost.propTypes = {
  closeSidebar: PropTypes.func.isRequired,
};

const Container = styled.div`
  ${flexRowCenter}
  min-height: 100vh;
  width: 100%;
  background-color: #fdfdfd;

  @media (max-width: 750px) {
    justify-content: flex-start;
    align-items: center;
    font-size: 0.9rem;
    flex-direction: column;
  }
`;

const PostWrapper = styled.div`
  ${flexRowCenter};
  width: 900px;
  height: 600px;
  position: relative;
  box-shadow: 3px 3px 6px gainsboro;

  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;

  @media (max-width: 1150px) {
    transform: scale(0.75);
  }

  @media (max-width: 750px) {
    flex-direction: column;
    transform: scale(1);
    width: 470px;
    height: auto;
    box-shadow: none;
    margin-bottom: 50px;
  }

  @media (max-width: 550px) {
    width: 95%;
  }
`;

const Photo = styled.div`
  background-image: url(${({ url }) => url});
  background-position: center;
  background-size: cover;
  height: 100%;
  width: 500px;
  border-radius: 3px;

  @media (max-width: 750px) {
    width: 100%;
    height: 400px;
  }
`;

const StatWrapper = styled.div`
  padding: 0 5%;
  border-bottom: 1px solid #dfdfdf;
  width: 100%;

  @media (max-width: 750px) {
    padding: 0;
  }
`;

const Info = styled.div`
  height: 100%;
  width: 400px;
  ${flexColumnCenter};

  @media (max-width: 750px) {
    width: 100%;
    height: auto;
  }
`;

export default FullPost;
