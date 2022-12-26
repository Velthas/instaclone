import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { getCurrentUserUsername } from "../../../firebase/authentication";
import Buttons from "./Buttons";

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
            <div>
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
            </div>
            <div>
              Posts
            </div>
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
  justify-content: space-between;
  align-items: center;
  margin: 10px 10%;
`;

export default Profile;