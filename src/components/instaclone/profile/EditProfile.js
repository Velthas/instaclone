import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getCurrentUserUsername } from "../../../firebase/authentication";

import EditProfileForm from "../../forms/EditProfileForm";
import MobileHeader from "../mobile/MobileHeader";

const EditProfile = ({ info, loadInfo, closeSidebar }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const currentUser = getCurrentUserUsername();
    if (info && info.username !== currentUser) // If user tries to access another profile settings
      navigate(`/users/${currentUser}/settings`); // they get redirected to their own page
  }, []);

  return (
    <Backdrop onClick={closeSidebar}>
      <MobileHeader name="Profile Settings" />
      <Container>
        <EditProfileForm info={info} loadInfo={loadInfo} />
      </Container>
    </Backdrop>
  );
};

const Backdrop = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 750px) {
    justify-content: flex-start;
  }
`;
const Container = styled.div`
  padding: 40px;
  border: 1px solid #dfdfdf;
  background-color: white;
  padding-bottom: 20px;

  @media (max-width: 750px) {
    padding: 20px;
    width: 90%;
  }

  @media (max-width: 550px) {
    border: none;
    width: 100%;
  }
`;

export default EditProfile;
