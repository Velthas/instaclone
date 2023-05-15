import styled from "styled-components";
import { InstaUser } from "../../../../utils/types";

type Props = {
  length: number,
  user: InstaUser | null,
  followers: number | undefined,
};

const Stats = ({ length, user, followers }: Props) => {
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
