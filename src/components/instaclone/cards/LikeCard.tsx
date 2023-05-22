import styled from "styled-components";
import { flexRowBetween, flexRowCenter } from "../../../styles/style";
import { useFollow, useUser } from "../../../utils/hooks";
import { Link } from "react-router-dom";

type Props = {
  suggestion: string;
  currentUser: string | null;
};

const LikeCard = ({ suggestion, currentUser }: Props) => {
  const [user, updateUser] = useUser(suggestion); // Houses all information on user
  const [followed, updateFollowed] = useFollow(user ? user : null); // Oversees follow status

  if (!user) return null;
  return (
    <Container>
      <InfoWrapper to={user ? `/profile/${user.username}` : ""}>
        <Picture url={user ? user.pfp : ""} />
        <div>
          <Username>{user ? user.username : ""}</Username>
          <Name>{user ? user.name : ""}</Name>
        </div>
      </InfoWrapper>
      {currentUser && user && user.username !== currentUser && (
        <Button
          onClick={() => {
            updateFollowed(!followed);
          }}
          blue={followed ? false : true}
        >
          {followed ? "Unfollow" : "Follow"}
        </Button>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 48px;
  padding: 8px 0;
  margin-top: 12px;
  ${flexRowBetween}
  gap: 5px;
`;

const InfoWrapper = styled(Link)`
  ${flexRowCenter}
  gap: 8px;
  text-decoration: none;
`;

const Picture = styled.div<{ url: string }>`
  background-image: url(${({ url }) => url});
  background-position: center;
  background-size: cover;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  border: 1px solid #dfdfdf;
  flex-shrink: 0;
`;

const Username = styled.div`
  font-weight: 500;
  font-size: 0.9rem;
  color: #262626;
`;

const Name = styled.div`
  font-size: 0.9rem;
  color: #8e8e8e;
`;

const Button = styled.button<{ blue?: boolean }>`
  min-width: 90px;
  padding: 8px 16px;
  margin-left: 5px;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.9rem;
  cursor: pointer;
  color: ${(props) => (props.blue ? "#fff" : "#000")};
  background-color: ${(props) => (props.blue ? "#0095f6" : "#efefef")};
  &:hover {
    background-color: ${(props) => (props.blue ? "#1877f2" : "#dbdbdb")};
  }
`;

export default LikeCard;
