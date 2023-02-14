import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { flexRowBetween, flexRowCenter } from "../../../../styles/style";
import { useCommentsLiked, useUser } from "../../../../utils/hooks";
import { likeDiscursiveFormat, formatDateShort } from "../../../../utils/formatting";
import heart from "../../../../assets/icons/heart.svg";
import fillheart from "../../../../assets/icons/fillheart.svg";

const ExtendedComment = ({ comment, post }) => {
  const [user, getUser] = useUser(comment.author);
  const [liked, changeLiked] = useCommentsLiked(comment, post);
  return (
    <Comment>
      <Main>
        <Link to={`/profile/${comment.author}`}>
          <UserPic title={`${comment.author}'s profile picture`} url={user ? user.pfp : ""} />
        </Link>
        <Wrapper>
          <div>
            <StyledLink to={`/profile/${comment.author}`}>
              <Username>{comment.author}</Username>
            </StyledLink>
            <Message>{comment.content}</Message>
          </div>
          <Extra>
            <Undercomment>
              {formatDateShort(comment.timestamp)}
            </Undercomment>
            <Underimportant>
              {comment.likedby.length === 0 ? '' : likeDiscursiveFormat(comment.likedby, liked)}
            </Underimportant>
            <Underimportant>Reply</Underimportant>
          </Extra>
        </Wrapper>
      </Main>
      <LikeIcon
        liked={liked}
        onClick={() => changeLiked(liked)}
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

  
  @media (max-width: 750px) {
    padding: 0;
  }
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

const StyledLink = styled(Link)`
  color: #262626;
`

const Username = styled.div`
  font-weight: 500;
  display: inline-block;
  padding-right: 5px;
`;

const Message = styled.div`
  font-size: 1rem;
  display: inline;
`;

const Extra = styled.div`
  ${flexRowCenter};
  justify-content: flex-start;
  gap: 5px;
`;

const Undercomment = styled.div`
  margin-top: 5px;
  color: #8e8e8e;
  font-size: 0.9rem;
`;

const Underimportant = styled(Undercomment)`
  font-weight: 500;
`

const LikeIcon = styled.img`
  cursor: pointer;
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
