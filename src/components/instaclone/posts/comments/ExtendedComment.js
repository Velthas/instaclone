import React from "react";
import styled from "styled-components";
import { flexRowBetween, flexRowCenter } from "../../../../styles/style";
import { useCommentsLiked, useUser } from "../../../../utils/hooks";
import { likeSimpleFormat, formatDate } from "../../../../utils/formatting";
import heart from "../../../../assets/icons/heart.svg";
import fillheart from "../../../../assets/icons/fillheart.svg";

const ExtendedComment = ({ comment, post }) => {
  const [user, getUser] = useUser(comment.author);
  const [liked, setLiked] = useCommentsLiked(comment, post);
  return (
    <Comment>
      <Main>
        <UserPic url={user ? user.pfp : ""} />
        <Wrapper>
          <div>
            <Username>{comment.author}</Username>
            <Message>{comment.content}</Message>
          </div>
          <Extra>
            <Undercomment>
              {formatDate(comment.timestamp)}
            </Undercomment>
            <Underimportant>
              {likeSimpleFormat(comment.likedby, liked)}
            </Underimportant>
            <Underimportant>Reply</Underimportant>
          </Extra>
        </Wrapper>
      </Main>
      <LikeIcon
        liked={liked}
        onClick={() => setLiked(!liked)}
        src={liked ? fillheart : heart}
        alt="like comment"
      />
    </Comment>
  );
};

const Comment = styled.div`
  width: 100%;
  padding: 0 5%;
  ${flexRowBetween};
  align-items: flex-start;
  margin: 15px 0;
`;

const Main = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 8px;
  width: 100%;
`;

const UserPic = styled.div`
  background-image: url(${({ url }) => url});
  background-position: center;
  background-size: cover;
  height: 32px;
  width: 32px;
  border-radius: 100%;
  flex-shrink: 0;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Username = styled.div`
  font-weight: bold;
  display: inline-block;
  padding-right: 5px;
`;

const Message = styled.div`
  font-size: 0.9rem;
  display: inline;
`;

const Extra = styled.div`
  ${flexRowCenter};
  justify-content: flex-start;
  gap: 5px;
`;

const Undercomment = styled.div`
  margin-top: 5px;
  font-size: 0.7rem;
  color: gray;
`;

const Underimportant = styled(Undercomment)`
  font-weight: bold;
`

const LikeIcon = styled.img`
  width: 12px;
  height: 12px;
  align-self: center;
  ${({ liked }) => {
    return liked
      ? "filter: invert(50%) sepia(87%) saturate(5070%) hue-rotate(332deg) brightness(99%) contrast(85%)"
      : "";
  }};
`;

export default ExtendedComment;
