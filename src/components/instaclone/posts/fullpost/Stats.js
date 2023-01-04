import React from "react";
import styled from "styled-components";
import { likeDiscursiveFormat, formatDateLong } from "../../../../utils/formatting";

const Stats = ({ post, liked }) => {
  return (
  <Container>
    <Likes>{post ? likeDiscursiveFormat(post.likedby, liked) : ""}</Likes>
    <Date>{post ? formatDateLong(post.timestamp) : ""}</Date>
  </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
  padding: 10px 5%;
  border-bottom: 1px solid #dfdfdf;
`;

const Likes = styled.p`
  font-weight: bold;
  color: #262626;
  font-size: 0.9rem;
`;

const Date = styled.p`
  color: gray;
  text-transform: uppercase;
  font-size: 0.6rem;
`;

export default Stats;
