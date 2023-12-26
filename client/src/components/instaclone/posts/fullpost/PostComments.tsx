import styled from "styled-components";
import { PostInfo, Comments, Post, InstaUser } from "../../../../utils/types";

import ExtendedComment from "../comments/ExtendedComment";
import Description from "./Description";

type Props = {
  comments: Comments[] | null;
  postInfo: PostInfo;
  post: Post | null;
  user: InstaUser | null;
};

const PostComments = ({ comments, postInfo, post, user }: Props) => {
  return (
    <Container>
      <Description post={post} user={user} />
      {comments &&
        comments.map((comment) => (
          <ExtendedComment post={postInfo} key={comment.id} comment={comment} />
        ))}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 70%;
  border-bottom: 1px solid #dfdfdf;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 750px) {
    min-height: 250px;
    height: auto;
    max-height: 500px;
  }
`;

export default PostComments;
