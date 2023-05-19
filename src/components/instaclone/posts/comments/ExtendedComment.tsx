import styled from "styled-components";
import { Link } from "react-router-dom";
import { flexRowBetween, flexRowCenter } from "../../../../styles/style";
import { useCommentsLiked, useUser } from "../../../../utils/hooks";
import { likeDiscursiveFormat, formatDateShort } from "../../../../utils/formatting";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { getCurrentUserUsername } from "../../../../firebase/authentication";
import { Comments, PostInfo } from "../../../../utils/types";

type Props = {
  comment: Comments,
  post: PostInfo,
}

const ExtendedComment = ({ comment, post }: Props) => {
  const [user, getUser] = useUser(comment.author);
  const [liked, changeLiked] = useCommentsLiked(comment, post);
  const currentUser = getCurrentUserUsername();
  const likedAmount = comment.likedby.filter(profile => profile !== currentUser).length + (liked ? 1 : 0);

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
              {likedAmount === 0 ? "" : likeDiscursiveFormat(comment.likedby, liked)}
            </Underimportant>
            <Underimportant>Reply</Underimportant>
          </Extra>
        </Wrapper>
      </Main>
      {liked
        ? <LikedHeart title="Unlike comment" onClick={() => changeLiked(liked)} />
        : <EmptyHeart title="Like comment" onClick={() => changeLiked(liked)} />
      }
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

const UserPic = styled.div<{url: string}>`
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
`;

const Username = styled.div`
  font-weight: 500;
  display: inline-block;
  padding-right: 5px;
`;

const Message = styled.div`
  font-size: 1rem;
  display: inline;
  word-break: break-word;
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
`;

const Icon = `
  cursor: pointer;
  width: 12px;
  height: 12px;
  align-self: start;
  margin-top: 6px;
`;

const EmptyHeart = styled(FaRegHeart)` 
  ${Icon}
  color: #262626;
`;

const LikedHeart = styled(FaHeart)`
  ${Icon}  
  color: crimson;
`;

export default ExtendedComment;
