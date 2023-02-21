import React, { useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { getCurrentUserUsername } from "../../../firebase/authentication";
import { useParams } from "react-router-dom";

import PostPreview from "../posts/PostPreview";
import ProfileHeader from "./ProfileHeader";
import ProfileSections from "./ProfileSections";
import MobileTop from "./MobileTop";

const Profile = ({ user, posts, closeSidebar }) => {
  const { username } = useParams();
  const isOwnProfile = getCurrentUserUsername() === username;

  // Sets profile icon as activeì if visiting own profile
  useEffect(() => {
    if (isOwnProfile) closeSidebar("profile");
    else closeSidebar(" "); 
  }, []);

  return (
    <Container onClick={ isOwnProfile ? () => closeSidebar("profile") : () => closeSidebar(" ")}>
        <MobileTop user={user} />
        <ProfileHeader user={user} posts={posts} />
        <ProfileSections />
        <PostList>
          {posts.map(post => {
            return <PostPreview key={post.id} post={post}/>;
          })}
        </PostList>
    </Container>
  );
};

Profile.propTypes = {
  user: PropTypes.object,
  posts: PropTypes.array,
  closeSidebar: PropTypes.func.isRequired,
};

const Container = styled.div`
  padding: 30px 5% 0;
  margin: 0 auto 30px;
  width: 100%;

  display: flex;
  flex-direction: column;

  @media (max-width: 750px) {
    padding: 0 0 50px;
    margin: 0;
  }
`;

const PostList = styled.div`
  align-self: center;
  display: grid;
  gap: 28px;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;

  @media (max-width: 750px) {
    overflow: hidden;
    gap: 2px;
  }
`;

export default Profile;