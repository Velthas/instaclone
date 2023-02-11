import React from "react";
import styled from "styled-components";
import { flexColumnCenter, flexRowBetween } from "../../../styles/style";
import { useUser } from "../../../utils/hooks";
import SuggestionCard from "./SuggestionCard";
import { Link } from "react-router-dom";

const Suggestions = ({ currentUser }) => {
  const [user, updateUser] = useUser(
    currentUser ? currentUser.displayName : null
  );
  const userList = ["test", "panampalmer"];
  return (
    <Container>
      <StyledLink to={user ? `/profile/${user.username}` : ""}>
        <Picture url={user ? user.pfp : ""} />
        <div>
          <Username>{user ? user.username : ""}</Username>
          <Name>{user ? user.name : ""}</Name>
        </div>
      </StyledLink>
      <Wrapper>
        <ForYou>Suggested for you</ForYou>
        <More>Show all</More>
      </Wrapper>
      <SuggestionsWrapper>
        {userList.map((suggestion, index) => (
          <SuggestionCard
            currentUser={currentUser}
            key={index}
            suggestion={suggestion}
          />
        ))}
      </SuggestionsWrapper>
    </Container>
  );
};

const Container = styled.div`
  ${flexColumnCenter};
  width: 350px;
  min-height: 100vh;
  padding-top: 30px;
  gap: 8px;

  
  @media(max-width: 950px) {
    height: min-content;
    width: 470px;
    min-height: auto;
  }

  @media(max-width: 550px) {
    display: none;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  width: 100%;
  height: 56px;
  padding: 16px 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
`;

const SuggestionsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Picture = styled.div`
  background-image: url(${({ url }) => url});
  background-position: center;
  background-size: cover;
  height: 56px;
  width: 56px;
  border-radius: 100%;
  border: 1px solid #dfdfdf;
`;

const Username = styled.div`
  font-weight: 500;
  font-size: 1rem;
  color: #262626;
`;

const Name = styled.div`
  font-size: 0.9rem;
  color: #8e8e8e;
`;

const Wrapper = styled.div`
  ${flexRowBetween};
  width: 100%;
`;

const ForYou = styled(Name)`
  font-weight: 500;
  font-size: 0.9rem;
`
const More = styled(Username)`
  cursor: pointer;
  font-size: 0.8rem;
  &:hover{
    color: #8e8e8e;
  }
`

export default Suggestions;
