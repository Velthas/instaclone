import styled from "styled-components";
import {
  likeDiscursiveFormat,
  formatDateLong,
} from "../../../../utils/formatting";
import { Post } from "../../../../utils/types";

type Props = {
  post: Post | null;
  liked: boolean;
  openLikes: () => void;
};

const Stats = ({ post, liked, openLikes }: Props) => {
  return (
    <Container>
      <Likes onClick={openLikes}>
        {post ? likeDiscursiveFormat(post.likedby, liked) : ""}
      </Likes>
      <Date>{post ? formatDateLong(post.timestamp) : ""}</Date>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
  padding: 10px 0;
`;

const Likes = styled.p`
  font-weight: 500;
  color: #262626;
  font-size: 1rem;
  cursor: pointer;
`;

const Date = styled.p`
  color: gray;
  text-transform: uppercase;
  font-size: 0.8rem;
`;

export default Stats;
