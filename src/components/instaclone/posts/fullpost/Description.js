import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { flexRowCenter } from "../../../../styles/style";
import { formatDate } from "../../../../utils/formatting";

const Description = ({ user, post }) => {
  return (
    <Comment>
      <Main>
        <Link>
          <UserPic url={user ? user.pfp : ""} />
        </Link>
        <Wrapper>
          <div>
            <StyledLink>
              <Username>{post ? post.username : ""}</Username>
            </StyledLink>
            <PostDescription>{post ? post.description : ""}</PostDescription>
          </div>
          <Extra>
            <Undercomment>{post ? formatDate(post.timestamp) : ''}</Undercomment>
          </Extra>
        </Wrapper>
      </Main>
    </Comment>
  );
};

const Comment = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  padding: 0 5%;
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

const StyledLink = styled(Link)`
  color: #262626;
`

const Username = styled.div`
  font-weight: 500;
  display: inline-block;
  padding-right: 5px;
`;

const PostDescription = styled.div`
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
  font-size: 0.9rem;
  color: #8e8e8e;
`;

export default Description;