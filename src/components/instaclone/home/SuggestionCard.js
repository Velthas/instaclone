import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { flexRowBetween, flexRowCenter } from "../../../styles/style";
import { useFollow, useUser } from "../../../utils/hooks";
import { Link } from "react-router-dom";

const SuggestionCard = ({ suggestion, currentUser }) => {
  const [user, updateUser] = useUser(suggestion); // Houses all information on user
  const [followed, updateFollowed] = useFollow(user ? user : null); // Oversees follow status
  return (
    <Container>
      <InfoWrapper to={user ? `/profile/${user.username}` : ""}>
        <Picture url={user ? user.pfp : ""} />
        <div>
          <Username>{user ? user.username : ""}</Username>
          <Name>Popular</Name>
        </div>
      </InfoWrapper>
      {currentUser && user && user.username !== currentUser.displayName && (
        <FollowButton onClick={() => updateFollowed(!followed)}>
          {followed ? "Unfollow" : "Follow"}
        </FollowButton>
      )}
    </Container>
  );
};

SuggestionCard.propTypes = {
  suggestion: PropTypes.string.isRequired,
  currentUser: PropTypes.any,
};

const Container = styled.div`
  width: 100%;
  height: 48px;
  padding: 4px 0;
  ${flexRowBetween}
  gap: 5px;
`;

const InfoWrapper = styled(Link)`
  ${flexRowCenter}
  gap: 8px;
  text-decoration: none;
`;

const Picture = styled.div`
  background-image: url(${({ url }) => url});
  background-position: center;
  background-size: cover;
  height: 32px;
  width: 32px;
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

const FollowButton = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
  color: #0095f6;
  border: none;
  background-color: transparent;
  cursor: pointer;
  ${flexRowCenter};
  height: 100%;

  &:hover {
    color: #000;
  }
`;

export default SuggestionCard;
