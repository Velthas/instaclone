import React from "react";
import styled from "styled-components";
import Buttons from "./Buttons";
import PostPreview from "../posts/PostPreview";
import uniqid from 'uniqid'
import ProfileHeader from "./ProfileHeader";
import ProfileSections from "./ProfileSections";

const Profile = ({user, posts}) => {
  return (
    <Container>
        <ProfileHeader user={user} posts={posts} />
        <ProfileSections />
        <PostList>
          {posts.map(post => {
            return <PostPreview key={uniqid()} post={post}/>
          })}
        </PostList>
    </Container>
  )
}

const Container = styled.div`
  padding: 30px 20px 0;
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
  margin: 0 5%;
`;

export default Profile;