import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Stats = ({ length, user, followers }) => {
  return (
    <StatsUl>
      <StatsLi>
        <StatEntry>{length}</StatEntry>
        <span>posts</span>
      </StatsLi>
      <StatsLi>
        <StatEntry> {user ? followers : ""} </StatEntry>
        <span>followers</span>
      </StatsLi>
      <StatsLi>
        <StatEntry>{user ? user.follows.length : ""}</StatEntry>
        <span>followed</span>
      </StatsLi>
    </StatsUl>
  );
};

Stats.propTypes = {
  length: PropTypes.number,
  user: PropTypes.object,
  followers: PropTypes.number,
}

const StatsUl = styled.ul`
  display: flex;
  gap: 50px;
  list-style: none;
  margin: 20px 0;

  @media (max-width: 750px) {
    display: none;
  }
`;

const StatsLi = styled.li`
  display: flex;
  gap: 3px;
`;

const StatEntry = styled.span`
  font-weight: bold;
`;

export default Stats;
