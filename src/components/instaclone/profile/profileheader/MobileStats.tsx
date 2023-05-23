import styled from "styled-components";
import { InstaUser } from "../../../../utils/types";

type Props = {
  length: number,
  user: InstaUser | null,
  followers: number | undefined,
  setFollowersModalOpen: (section: 'followers' | 'following') => void
};

const MobileStats = ({ length, user, followers, setFollowersModalOpen }: Props) => {
  return (
    <StatsUl>
      <StatsLi>
        <StatEntry>{length}</StatEntry>
        <StatLabel>posts</StatLabel>
      </StatsLi>
      <StatsLi onClick={() => setFollowersModalOpen('followers')}>
        <StatEntry> {user ? followers : ""} </StatEntry>
        <StatLabel>followers</StatLabel>
      </StatsLi>
      <StatsLi onClick={() => setFollowersModalOpen('following')}>
        <StatEntry>{user ? user.follows.length : ""}</StatEntry>
        <StatLabel>followed</StatLabel>
      </StatsLi>
    </StatsUl>
  );
};

const StatsUl = styled.ul`
  display: none;
  width: 100%;
  border-top: 1px solid #dfdfdf;

  list-style: none;

  margin: 20px 0;
  padding: 10px 0;

  @media (max-width: 750px) {
    display: flex;
    margin: 10px 0 0 0;
  }
`;

const StatsLi = styled.li`
  display: flex;
  flex-direction: column;
  gap: 3px;

  height: 100%;
  width: 33%;
  text-align: center;

  font-size: 0.9rem;
  cursor: pointer;
`;

const StatEntry = styled.span`
  font-weight: bold;
`;

const StatLabel = styled.span`
  color: #8e8e8e;
`;

export default MobileStats;
