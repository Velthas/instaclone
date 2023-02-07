import React from "react";
import styled from "styled-components";
import PostPreview from "../posts/PostPreview";
import ProfileHeader from "./ProfileHeader";
import ProfileSections from "./ProfileSections";

const Profile = ({user, posts, closeSidebar}) => {
  return (
    <Container onClick={() => closeSidebar("profile")}>
        <ProfileHeader user={user} posts={posts} />
        <ProfileSections />
        <PostList>
          {posts.map(post => {
            return <PostPreview key={post.id} post={post}/>
          })}
        </PostList>
    </Container>
  )
}

const Container = styled.div`
  padding: 30px 5% 0;
  margin: 0 auto 30px;
  width: 100%;

  display: flex;
  flex-direction: column;
`;

const PostList = styled.div`
  align-self: center;
  display: grid;
  gap: 28px;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
`;

export default Profile;