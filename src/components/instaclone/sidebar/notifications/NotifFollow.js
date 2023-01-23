import React from "react";
import styled from "styled-components";
import { useFollow } from "../../../../utils/hooks";

const NotifFollow = ({ user }) => {
  const [followed, updateFollowed] = useFollow(user);
  return (
    <Button followed={followed} onClick={() => updateFollowed(!followed)}>
      {followed ? "Unfollow" : "Follow"}
    </Button>
  );
};

const Button = styled.button`
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
