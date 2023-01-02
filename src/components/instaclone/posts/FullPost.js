import React, {useState} from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { usePost, useComments} from "../../../utils/hooks";
import { flexColumnCenter, flexRowCenter, flexRowBetween } from "../../../styles/style";
import ExtendedComment from "./comments/ExtendedComment";
import PostSettings from "./PostSettings";
import { formatDate, likeSimpleFormat } from "../../../utils/formatting";
import sendcomment from "../../../assets/icons/instashare.svg";
import dots from "../../../assets/icons/dots.svg";
import heart from "../../../assets/icons/heart.svg";
import fillheart from "../../../assets/icons/fillheart.svg";

const FullPost = () => {
  const {postid, username} = useParams();
  const [settings, setSettings] = useState(false);
  const postInfo = { id: postid, username }
  const [post, user, liked, changeLiked] = usePost(username, postid);
  const [comments, insertComment] = useComments(postInfo, `#a${postInfo.id}`);

  return(
  <Container>
    <PostWrapper>
    { post  &&
      <PostSettings
        settings={settings}
        setSettings={setSettings}
        post={post}
      />
    }
      <Photo url={ post ? post.photo : ''} />
      <Info>
        <BigWrapper>
          <User>
            <UserPhoto url={ user ? user.pfp : ''} />
            <Bold>{ user ? user.username : ''}</Bold>
          </User>
          <Follow>Follow</Follow>
        </BigWrapper>
        <SmallWrapper>
          <Bold>{post ? likeSimpleFormat(post.likedby, liked) : ''}</Bold>
          <Gray>{post ? formatDate(post.timestamp) : ''}</Gray>
        </SmallWrapper>
        <DescriptionContainer>
           <p>{post ? post.description : ''}</p>
        </DescriptionContainer>
        <Comments>
          {comments && comments.map(comment => <ExtendedComment post={postInfo} key={comment.id} comment={comment} />)}
        </Comments>
        <BigWrapper>
          <Icon liked={liked} src={liked ? fillheart : heart} onClick={(() => changeLiked(liked))} />
          <CommentBox type="text" id={'a' + postInfo.id} maxLength={150} placeholder="Add your comment..." />
          <Icon src={sendcomment} onClick={() => insertComment()} />
          <Icon src={dots} onClick={() => setSettings(true)}/>
        </BigWrapper>
      </Info>
    </PostWrapper>
  </Container>
  )
}

const Container = styled.div`
  ${flexRowCenter};
  min-height: 90vh;
  background-color: #fdfdfd
`;

const PostWrapper = styled.div`
  ${flexRowCenter};
  width: 900px;
  height: 600px;
  position: relative;
  box-shadow: 3px 3px 6px gainsboro;
`;

const Photo = styled.div`
  background-image: url(${({url}) => url});
  background-position: center;
  background-size: cover;
  height: 100%;
  width: 500px;

  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
`

const Info = styled.div`
  height: 100%;
  width: 400px;
  ${flexColumnCenter};
`

const SmallWrapper = styled.div`
  width: 90%;
  height: 5%;
  ${flexRowBetween}
`

const DescriptionContainer = styled(SmallWrapper)`
  padding: 10px 0;
  height: min-content;
  border-bottom: 1px solid #ebeaea;
`

const BigWrapper = styled(SmallWrapper)`
  height: 10%;
`

const User = styled.div`
  ${flexRowCenter};
  gap: 8px;
`

const UserPhoto = styled(Photo)`
  width: 36px;
  height 36px;
  border-radius: 100%;
`

const Bold = styled.p`
  font-weight: bold;
`

const Gray = styled.p`
  color: gray;
`

const Follow = styled.button`
  padding: 6px 8px;
  font-weight: bold;
  background-color: #3897f0;
  color: white;
  border: none;
  border-radius: 3px;
`

const Comments = styled.div`
  width: 90%;
  height: 70%;
  overflow-y: scroll;
  -ms-overflow-style: none;  
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`

const Icon = styled.img`
  height: 24px;
  width: 24px;
  cursor: pointer;
  ${({ liked }) => {
    return liked
      ? "filter: invert(50%) sepia(87%) saturate(5070%) hue-rotate(332deg) brightness(99%) contrast(85%);"
      : "";
  }}
`;

const CommentBox = styled.input`
  border: none;
  outline: none;
  padding: 8px;
  width: 70%;
  background-color: transparent;
`;


export default FullPost