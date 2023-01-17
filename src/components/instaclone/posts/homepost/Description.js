import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Description = ({ description }) => {
  const [limit, setLimit] = useState(100)
  return (
    <Container>
      <StyledLink to={`/profile/${description.author}`}>
        <Username>{description.author}</Username>
      </StyledLink>
      <PostDescription>
        {description.content.length > limit
          ? description.content.slice(0, limit) + "..."
          : description.content}
          {description.content.length > limit
          ? <More onClick={() => setLimit(2201)}>Show more</More> 
          : ''}
      </PostDescription>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #262626;
`;

const Username = styled.p`
  font-size: 1rem;
  font-weight: 500;
  display: inline-block;
  padding-right: 5px;
`;

const More = styled.button`
  border: none;
  background-color: transparent;
  color: gray;
  cursor: pointer;
`

const PostDescription = styled.p`
  font-size: 0.9rem;
  color: black;
  display: inline;
  word-break: break-word;
`;

export default Description;