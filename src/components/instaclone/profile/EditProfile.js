import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getCurrentUserUsername } from "../../../firebase/authentication";
import EditProfileForm from "../../forms/EditProfileForm";

const EditProfile = ({info, loading}) => {
 const navigate = useNavigate()
  useEffect(() => {
    const currentUser = getCurrentUserUsername();
    if(info.username !== currentUser) navigate(`/users/${currentUser}/settings`);
  }, []);

  return (
    <Backdrop>
      <Container>
        <EditProfileForm
          pfp={loading ? '' : info.pfp} 
          pbg={loading ? '' : info.pbg} 
          name={loading ? '' : info.name} 
          descr={loading ? '' : info.description}
        />
      </Container>
    </Backdrop>
  );
};

const Backdrop = styled.div`
  background-color: #161719d9;
  width: 100%;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Container = styled.div`
  border-radius: 20px;
  width: 600px;
  background-color: white;
  padding-bottom: 20px;
`

export default EditProfile;