import styled from "styled-components";
import { useFollow } from "../../../../utils/hooks";
import { InstaUser } from "../../../../utils/types";

type Props = {
  user: InstaUser | null;
};

const NotifFollow = ({ user }: Props) => {
  const [followed, updateFollowed] = useFollow(user);
  return (
    <Button followed={followed} onClick={() => updateFollowed(!followed)}>
      {followed ? "Unfollow" : "Follow"}
    </Button>
  );
};

const Button = styled.button<{ followed: boolean }>`
  cursor: pointer;
  padding: 7px 16px;
  margin-left: 5px;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.9rem;
  color: ${(props) => (!props.followed ? "#fff" : "#000")};
  background-color: ${(props) => (!props.followed ? "#0095f6" : "#efefef")};
  &:hover {
    background-color: ${(props) => (!props.followed ? "#1877f2" : "#dbdbdb")};
  }
`;

export default NotifFollow;
