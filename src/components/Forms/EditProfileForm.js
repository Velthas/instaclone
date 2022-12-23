import React, { useState } from "react";
import styled from "styled-components";
import Input from "../inputs/Input";
import FileImg from "../inputs/FileImg";
import pencil from '../../assets/icons/pencil.svg';
import photo from '../../assets/icons/photo.svg';

const EditProfileForm = ({pfp, pbg, name, descr}) => {
  const handleSubmit = (e) => {
    const allInputs = document.querySelectorAll('#edit-profile input');
    console.log('just checking for now')
  }

  const [editBG, setEditBG] = useState(false);
  const [editPFP, setEditPFP] = useState(false);

  return (
      <Form id="edit-profile">
        <CoverContainer hover={editBG} onMouseEnter={() => setEditBG(true)} onMouseLeave={() => setEditBG(false)}>
          {editBG && <PencilImg src={pencil} alt="edit pencil" />}
          <FileImg id='pbg' url={pbg} alt='background' imgStyle={coverBorder} />
        </CoverContainer>
        <ProfilePic onMouseEnter={() => setEditPFP(true)} onMouseLeave={() => setEditPFP(false)} >
          {editPFP && <PhotoImg src={photo} alt="edit" />}
          <FileImg id='pfp' url={pfp} alt='profile picture' imgStyle={pfpBorder} />
        </ProfilePic>
        <NegativeMargin>
          <Input id="name" type="text" label="Full Name" value={name} />
        </NegativeMargin>
        <InputWrapper>
          <Input id="bio" type="text" label="Bio" value={descr} />
        </InputWrapper>
        <Button>Save</Button>
        <Button>Close</Button>
      </Form>
  )
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const CoverContainer = styled.div`
  height: 200px;
  width: 100%;
  position: relative;
  transition: 0.3s ease-in;

  &:hover {
    filter: brightness(0.7);
  }
`
const PhotoImg = styled.img`
  pointer-events: none;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 35px;
`

const PencilImg = styled.img`
  pointer-events: none;
  position: absolute;
  top: 20px; 
  right: 20px; 
  width: 35px;
`
const ProfilePic = styled.div`
  height: 130px;
  width: 130px;
  transform: translateY(-50%);
  border-radius: 100%;

  position: relative;
  transition: 0.3s ease-in;

  &:hover {
    filter: brightness(0.7);
  }
`

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0 20px 0;
`

const NegativeMargin = styled(InputWrapper)`
  margin: -40px 0 20px 0;
`

const Button =  styled.button`
  padding: 0 10px;
  margin-bottom: 8px;
  height: 40px;
  font-size: 1.2rem;
  border-radius: 20px;
`

const pfpBorder = `
  border-radius: 100%;
`

const coverBorder = `
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`


export default EditProfileForm;