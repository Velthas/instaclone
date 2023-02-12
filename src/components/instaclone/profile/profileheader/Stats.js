import React from "react";
import styled from "styled-components";

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
