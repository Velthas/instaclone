import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { flexRowBetween, flexRowCenter } from "../../../../styles/style";
import * as io from "react-icons/io5";

const Icons = ({ liked, changeLiked }) => {
  return (
    <Container>
      <IconContainer>
        {liked 
          ? <HeartFull liked={liked} title='heart' onClick={() => changeLiked(liked)} />
          : <Heart title='heart' onClick={() => changeLiked(liked)} />
        }
        <Chat title="speech bubble" />
        <Share title="go-to" />
      </IconContainer>
      <Bookmark title="bookmark" />
    </Container>
  );
};

Icons.propTypes = {
  liked: PropTypes.bool.isRequired,
  changeLiked: PropTypes.func.isRequired
};

const Container = styled.div`
  ${flexRowBetween}
  padding: 10px 0;
  width: 100%;
`;

const IconContainer = styled.div`
  ${flexRowCenter}
  gap: 10px;
`;

const Icon = `
  height: 24px;
  width: 24px;
  cursor: pointer;
  color: #262626;
  &:hover {
    color: gray;
  }
`;

const Heart = styled(io.IoHeartOutline)`
  ${Icon}
`;

const HeartFull = styled(io.IoHeart)`
  ${Icon}
  color: red;

  &:hover {
    color: crimson;
  }
`;

const Chat = styled(io.IoChatbubbleOutline)`
  ${Icon}
`;

const Share = styled(io.IoShareOutline)`
  ${Icon}
`;

const Bookmark = styled(io.IoBookmarkOutline)`
  ${Icon}
`;

export default Icons;
