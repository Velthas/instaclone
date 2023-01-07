import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getCurrentUserUsername } from "../../../firebase/authentication";
import EditProfileForm from "../../forms/EditProfileForm";

const EditProfile = ({info, loadInfo}) => {
 const navigate = useNavigate()
  useEffect(() => {
    const currentUser = getCurrentUserUsername();
    if(info && info.username !== currentUser) navigate(`/users/${currentUser}/settings`);
  }, []);

  return (
    <Backdrop>
      <Container>
        <EditProfileForm
          info={info}
          loadInfo={loadInfo}
        />
      </Container>
    </Backdrop>
  );
};

const Backdrop = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Container = styled.div`
  padding: 40px;
  border: 1px solid #dfdfdf;
  background-color: white;
  padding-bottom: 20px;
`

export default EditProfile;