import styled from "styled-components";
import { useCommentsLiked } from "../../../../utils/hooks";
import { flexRowBetween } from "../../../../styles/style";
import { Link } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { Comments, Post } from "../../../../utils/types";

type Props = {
  comment: Comments,
  post: Post,
};

const MinimalComment = ({ comment, post }: Props) => {
  const [liked, changeLiked] = useCommentsLiked(comment, post);

  return (
    <Container>
      <div>
        <StyledLink to={`/profile/${comment.author}`}>
          <Username>{comment.author}</Username>
        </StyledLink>
        <Comment>
          {comment.content.length > 25
            ? comment.content.slice(0, 25) + "..."
            : comment.content}
        </Comment>
      </div>
      {liked 
        ? <LikedHeart title="Unlike comment" onClick={() => changeLiked(liked)} />
        : <EmptyHeart title="Like comment" onClick={() => changeLiked(liked)} />
      }
    </Container>
  );
};

const Container = styled.div`
  ${flexRowBetween}
  width: 100%;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #262626;
`;

const Username = styled.p`
  font-weight: 500;
  display: inline-block;
  padding-right: 5px;
`;

const Comment = styled.p`
  color: black;
  display: inline;
  word-break: break-word;
`;

const Icon = `
  cursor: pointer;
  width: 12px;
  height: 12px;
  align-self: center;
`;

const EmptyHeart = styled(FaRegHeart)`
  ${Icon}
  color: #262626;
`;

const LikedHeart = styled(FaHeart)`
  ${Icon}
  color: crimson;
`;

export default MinimalComment;
