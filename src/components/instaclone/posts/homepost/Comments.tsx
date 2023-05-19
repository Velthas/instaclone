import styled from "styled-components";
import { flexColumnCenter } from "../../../../styles/style";
import { likeDiscursiveFormat } from "../../../../utils/formatting";
import { Link } from "react-router-dom";
import { Comments, Post } from "../../../../utils/types";

import MinimalComment from "../comments/MinimalComment";
import Description from "./Description";

type Props = {
  post: Post;
  comments: Comments[] | null;
  liked: boolean;
};

const CommentSection = ({ post, comments, liked }: Props) => {
  const description = { author: post.username, content: post.description };
  return (
    <Container>
      <LikeCount>
        {(post.likedby.length !== 0 || liked === true) &&
          likeDiscursiveFormat(post.likedby, liked)}
      </LikeCount>
      <Description description={description} />
      {comments && comments.length > 2 && (
        <ViewMoreCommentsPara>
          <StyledLink to={`/posts/${post.username}/${post.id}`}>
            {"Show all " + comments.length + " comments"}
          </StyledLink>
        </ViewMoreCommentsPara>
      )}
      <CommentsContainer>
        {comments &&
          comments
            .slice(0, 2)
            .map((comment) => (
              <MinimalComment post={post} key={comment.id} comment={comment} />
            ))}
      </CommentsContainer>
    </Container>
  );
};

const Container = styled.div`
  padding: 0 0 10px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #959595;
`;

const ViewMoreCommentsPara = styled.p`
  color: #959595;
  cursor: pointer;
`;

const LikeCount = styled.p`
  color: #262626;
  font-weight: 500;
`;

const CommentsContainer = styled.div`
  ${flexColumnCenter}
  align-items: flex-start;
  gap: 2px;
`;

export default CommentSection;
