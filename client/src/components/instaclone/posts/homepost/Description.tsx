import { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

type Props = {
  description: {
    content: string;
    author: string;
  };
};

const Description = ({ description }: Props) => {
  const [limit, setLimit] = useState(100);
  return (
    <Container>
      {description.content.length > 0 && (
        <>
          <StyledLink to={`/profile/${description.author}`}>
            <Username>{description.author}</Username>
          </StyledLink>
          <PostDescription>
            {description.content.length > limit
              ? description.content.slice(0, limit) + "..."
              : description.content}
            {description.content.length > limit ? (
              <More onClick={() => setLimit(2201)}>Show more</More>
            ) : (
              ""
            )}
          </PostDescription>
        </>
      )}
    </Container>
  );
};

Description.propTypes = {
  description: PropTypes.object,
};

const Container = styled.div`
  width: 100%;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #262626;
`;

const Username = styled.p`
  font-weight: 500;
  display: inline-block;
  margin-right: 5px;
`;

const More = styled.button`
  border: none;
  background-color: transparent;
  color: gray;
  cursor: pointer;
`;

const PostDescription = styled.p`
  color: black;
  display: inline;
  word-break: break-word;
`;

export default Description;
