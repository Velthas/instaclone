import styled from "styled-components";
import { flexRowBetween, flexRowCenter } from "../../../../styles/style";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";
import { getCurrentUserUsername } from "../../../../firebase/authentication";
import { InstaUser } from "../../../../utils/types";

type Props = {
  user: InstaUser | null;
  setSettings: (show: boolean) => void;
  followed: boolean;
  updateFollowed: (followed: boolean) => void;
};

const Header = ({ user, setSettings, followed, updateFollowed }: Props) => {
  const currentUser = getCurrentUserUsername();

  return (
    <Container>
      <User>
        <Link to={user ? `/profile/${user.username}` : ""}>
          <UserPhoto title="profile picture" url={user ? user.pfp : ""} />
        </Link>
        <StyledLink to={user ? `/profile/${user.username}` : ""}>
          <Username>{user ? user.username : ""}</Username>
        </StyledLink>
        {user && currentUser && user.username !== currentUser && (
          <>
            <span>•</span>
            <Button onClick={() => updateFollowed(!followed)}>
              {followed ? "Unfollow" : "Follow"}
            </Button>
          </>
        )}
      </User>
      <Dots title="settings" onClick={() => setSettings(true)} />
    </Container>
  );
};

const Container = styled.div`
  ${flexRowBetween}
  width: 100%;
  padding: 0px 5%;
  height: 10%;
  border-bottom: 1px solid #efefef;
  padding: 0px 5%;

  @media (max-width: 750px) {
    padding: 10px 0;
    height: 50px;
  }
`;

const StyledLink = styled(Link)`
  color: #262626;
  text-decoration: none;
`;

const User = styled.div`
  ${flexRowCenter};
  gap: 8px;
`;

const Username = styled.p`
  font-weight: 500;
  color: #262626;
`;

const UserPhoto = styled.div<{ url: string }>`
  width: 32px;
  height 32px;
  border-radius: 100%;
  background-image: url(${({ url }) => url});
  background-position: center;
  background-size: cover;
`;

const Dots = styled(BsThreeDots)`
  cursor: pointer;
  width: 18px;
  height: 18px;
  color: black;
  &:hover {
    color: gray;
  }
`;
const Button = styled.button`
  font-weight: bold;
  color: #3897f0;
  border: none;
  border-radius: 3px;
  background-color: transparent;
  cursor: pointer;
  &:hover {
    color: #00376b;
  }
`;

export default Header;
