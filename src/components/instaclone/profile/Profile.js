import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getUserInfo } from "../../../firebase/firestore";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState(null);
  let {username} = useParams();
  useEffect(() => {
    const loadUserInfo = async () => {
      const userInfo = await getUserInfo(username);
      console.log(userInfo);
      setInfo(userInfo);
      setLoading(false);
    }
    loadUserInfo();
  }, []);

  return (
    <div>
        <ProfileCover role='img' bgurl={loading ? '' : info.pbg} />
        <ImgAndButtons>
          <ProfilePic alt="profile picture" src={loading ? '' : info.pfp} />
          <Buttons>
            <button>Follow</button>
            <button>Chat</button>
          </Buttons>
        </ImgAndButtons>
        <PostAndInfo>
          <div>
            <div>
              <div>
                <h1>{loading ? '' :info.name}</h1>
                <h2>{loading ? '' : '@' + username}</h2>
              </div>
              <div>
                <p></p>
                <p>Posts</p>
              </div>
              <div>
                <div>
                  <p></p>
                  <p>Following</p>
                </div>
                <div>
                  <p></p>
                  <p>Followers</p>
                </div>
              </div>
              <div>
                <h3>Bio</h3>
                <p></p>
              </div>
            </div>
            <div>
              Posts
            </div>
          </div>
          <div>

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
  align-items: center;
  justify-content: space-between;
`;

const ProfilePic = styled.img`
  height: 200px;
  width: 200px;
  border-radius: 100%;
  transform: translateY(-50%);
`;

const Buttons = styled.div`
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translateY(-50%);
`;

const PostAndInfo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0px 10%;
`;

const UserInfo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0px 10%;
`;

export default Profile;