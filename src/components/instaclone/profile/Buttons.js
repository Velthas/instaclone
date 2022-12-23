import React from "react";
import PropTypes from 'prop-types';
import styled from "styled-components";
import { Link } from "react-router-dom";

const Buttons = ({isOwnProfile, isFollowed}) => {
  return(
      <Wrapper>
      { isOwnProfile &&
        <>
        <ShortButton>+</ShortButton>
        <Link to="settings"><LongButton>Edit Profile</LongButton></Link>
        </> 
      }
      { !isOwnProfile &&
      <>
        <LongButton>{isFollowed ? 'Unfollow' : 'Follow'}</LongButton>
        <ShortButton>Chat</ShortButton>
      </>
      }
      </Wrapper>
  )
};

Buttons.propTypes = {
  isOwnProfile: PropTypes.bool.isRequired,
  isFollowed: PropTypes.bool.isRequired,
};

const Wrapper = styled.div`
  height: 200px;
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
  transform: translateY(-50%);
`;

const LongButton = styled.button`
  padding: 0 10px;
  height: 40px;
  font-size: 1.2rem;
  border-radius: 20px;
`;

const ShortButton = styled.button`
  height: 40px;
  width: 40px;
  border-radius: 100%;
  font-size: 2rem;
`;

export default Buttons;
