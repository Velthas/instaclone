import React, { useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { getCurrentUserUsername } from "../../../firebase/authentication";

import EditProfileForm from "../../forms/EditProfileForm";
import MobileHeader from "../mobile/MobileHeader";

const EditProfile = ({ info, loadInfo, closeSidebar, refresh }) => {
  const navigate = useNavigate();
  // Redirects user to own settings if they try to access another user's
  useEffect(() => {
    const currentUser = getCurrentUserUsername();
    if (info && info.username !== currentUser)
      navigate(`/users/${currentUser}/settings`);
  }, []);

  return (
    <Backdrop onClick={closeSidebar}>
      <MobileHeader name="Profile Settings" />
      <Container>
        <EditProfileForm info={info} loadInfo={loadInfo} refresh={refresh} />
      </Container>
    </Backdrop>
  );
};

EditProfile.propTypes = {
  info: PropTypes.object,
  loadInfo: PropTypes.func,
  closeSidebar: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired,
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
    margin-top: 20px;
    width: 90%;
  }

  @media (max-width: 550px) {
    border: none;
    width: 100%;
  }
`;

export default EditProfile;
