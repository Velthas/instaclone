import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { getCurrentUserUsername } from "../../../firebase/authentication";
import Buttons from "./Buttons";
import PostPreview from "../posts/PostPreview";
import HomePost from "../posts/HomePost";
import uniqid from 'uniqid'

const Profile = ({loading, info, posts}) => {
  let {username} = useParams();
  return (
    <div>
          <ProfileCover role='img' bgurl={loading ? '' : info.pbg} />
          <ImgAndButtons>
            <ProfilePic alt="profile picture" src={loading ? '' : info.pfp} />
            {!loading && 
              <Buttons 
                isFollowed={info.follows.indexOf(username) >= 0}
                isOwnProfile={username === getCurrentUserUsername()} 
              />
            }
          </ImgAndButtons>
          <PostAndInfo>
            <InfoContainer>
              <div>
                <div>
                  <h1>{loading ? '' : info.name}</h1>
                  <h2>{loading ? '' : '@' + username}</h2>
                </div>
                <div>
                  <p>{loading ? '' : posts.length}</p>
                  <p>Posts</p>
                </div>
                <div>
                  <div>
                    <p>{loading ? '' : info.follows.length}</p>
                    <p>Following</p>
                  </div>
                  <div>
                    <p>{loading ? '' :info.followed.length}</p>
                    <p>Followers</p>
                  </div>
                </div>
                <div>
                  <h3>Bio</h3>
                  <p>{loading ? '' : info.description}</p>
                </div>
              </div>
            </InfoContainer>
            <PostList>
              {posts.map(post => {
                return <HomePost key={uniqid()} post={post}/>
              })}
            </PostList>
          </PostAndInfo>
      </div>
  )
}

const ProfileCover = styled.div`
  background: url(${({bgurl}) => bgurl});
  background-size: cover;
  height: 300px;
`;

const ImgAndButtons = styled.div`
  display: flex;
  margin: 0px 10%;
  height: 100px;
  align-items: flex-start;
  justify-content: space-between;
`;

const ProfilePic = styled.img`
  height: 200px;
  width: 200px;
  border-radius: 100%;
  transform: translateY(-50%);
`;

const PostAndInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 10px 10%;
`;

const InfoContainer = styled.div`
  max-width: 300px;
  overflow-wrap: break-word;
`;

const PostList = styled.div`
  width: 100%;
  display: grid;
  gap: 25px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`;

export default Profile;