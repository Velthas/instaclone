import React, { useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { usePost, useComments, useFollow } from "../../../utils/hooks";
import { flexColumnCenter, flexRowCenter} from "../../../styles/style";
import PostSettings from "./PostSettings";
import Header from "./fullpost/Header";
import Comments from "./fullpost/Comments";
import Icons from "./fullpost/Icons";
import Stats from "./fullpost/Stats";
import Add from "./fullpost/Add";

const FullPost = () => {
  const { postid, username } = useParams();
  const postInfo = { id: postid, username };
  const [settings, setSettings] = useState(false);
  const [post, user, liked, changeLiked] = usePost(username, postid);
  const [comments, insertComment] = useComments(postInfo, `#a${postInfo.id}`);
  const [followed, setFollowed] = useFollow(user ? user : null);

  return (
    <Container>
      <PostWrapper>
        {post && (
          <PostSettings
            settings={settings}
            setSettings={setSettings}
            post={post}
          />
        )}
        <Photo url={post ? post.photo : ""} />
        <Info>
          <Header user={user} setSettings={setSettings} followed={followed} setFollowed={setFollowed} />
          <Comments comments={comments} postInfo={postInfo} />
          <Icons liked={liked} changeLiked={changeLiked} />
          <Stats post={post} liked={liked} />
          <Add postInfo={postInfo} insertComment={insertComment} />
        </Info>
      </PostWrapper>
    </Container>
  );
};

const Container = styled.div`
  ${flexRowCenter};
  min-height: 90vh;
  background-color: #fdfdfd;
`;

const PostWrapper = styled.div`
  ${flexRowCenter};
  width: 900px;
  height: 600px;
  position: relative;
  box-shadow: 3px 3px 6px gainsboro;
`;

const Photo = styled.div`
  background-image: url(${({ url }) => url});
  background-position: center;
  background-size: cover;
  height: 100%;
  width: 500px;

  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
`;

const Info = styled.div`
  height: 100%;
  width: 400px;
  ${flexColumnCenter};
`;

export default FullPost;
