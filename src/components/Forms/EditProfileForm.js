import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from 'prop-types';
import { isFileImage } from "../../utils/validation";
import { uploadPhoto } from "../../firebase/storage";
import { updateDocument } from "../../firebase/firestore";
import { validateName, validateDescription } from "../../utils/validation";
import { useNavigate } from "react-router-dom";
import Input from "../inputs/Input";
import FileImg from "../inputs/FileImg";
import pencil from '../../assets/icons/pencil.svg';
import photo from '../../assets/icons/photo.svg';

const EditProfileForm = ({info, loading, loadInfo}) => {
  const [editBG, setEditBG] = useState(false);
  const [editPFP, setEditPFP] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setError(false);
    if(loading) return;
    e.preventDefault();

    const payload = {} // This will store all info to be sent to firestore.
    const [pbg, pfp, name, bio] = Array.from(document.querySelectorAll('#edit-profile input'));
    const isPfpFileValid = pfp.files.length === 0 ? true : (pfp.files[0] && isFileImage(pfp.files[0]));
    const isBgFileValid = pbg.files.length === 0 ? true : (pbg.files[0] && isFileImage(pbg.files[0]));
    const isNameValid = validateName(name.value);
    const isDescrValid = validateDescription(bio.value);

    switch(true) {
      case isPfpFileValid !== true:
        setError(isPfpFileValid);
        return;
      case isBgFileValid !== true:
        setError(isBgFileValid);
        return;
      case isNameValid !== true:
        setError(isNameValid);
        return;
      case isDescrValid !== true:
        setError(isDescrValid);
        return;
      default: 
        if(name.value !== info.name) payload.name = name.value; // Before updating we run final checks.
        if(bio.value !== info.description) payload.description = bio.value; // Update name and bio only if they changed.
        if(pfp.files.length !== 0) payload.pfp = await uploadPhoto(`users/${info.username}/pfp`, pfp.files[0]);
        if(pbg.files.length !== 0) payload.pbg = await uploadPhoto(`users/${info.username}/pbg`, pbg.files[0]); 
        updateDocument(info.username, payload); // Update the changed fields on the firestore db.
        loadInfo(); // Updates the user info on the client side.
        navigate(`/profile/${info.username}`) // Go back to the profile.
    };
  }

  return (
      <Form id="edit-profile">
        <CoverContainer 
          hover={editBG}
          onMouseEnter={() => setEditBG(true)}
          onMouseLeave={() => setEditBG(false)}
        >
          {editBG && <PencilImg src={pencil} alt="edit pencil" />}
          <FileImg
            id='pbg' 
            url={loading ? '' : info.pbg}
            alt='background'
            imgStyle={coverBorder} />
        </CoverContainer>
        <PfpContainer 
          onMouseEnter={() => setEditPFP(true)}
          onMouseLeave={() => setEditPFP(false)}
        >
          {editPFP && <PhotoImg src={photo} alt="edit" />}
          <FileImg
            id='pfp'
            url={loading ? '' : info.pfp}
            alt='profile picture'
            imgStyle={pfpBorder}
          />
        </PfpContainer>
        <NegativeMarginWrapper>
          <Input
            id="name"
            type="text"
            label="Full Name"
            value={loading ? '' : info.name}
          />
        </NegativeMarginWrapper>
        <InputWrapper>
          <Input
            id="bio"
            type="text"
            label="Bio"
            value={loading ? '' : info.description}
          />
        </InputWrapper>
        { error && <Error>{error}</Error>}
        <Button onClick={(e) => handleSubmit(e)}>
          Save
        </Button>
        <Button onClick={() => navigate(`/profile/${info.username}`)}>
          Close
        </Button>
      </Form>
  )
};

EditProfileForm.propTypes = {
  info: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  loadInfo: PropTypes.func.isRequired,
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const ImageHoverFilter = `
  transition: 0.3s ease-in;
  &:hover {
  filter: brightness(0.7);
  }
`

const CoverContainer = styled.div`
  height: 200px;
  width: 100%;
  position: relative;
  ${ImageHoverFilter}
`;

const PfpContainer = styled.div`
  height: 130px;
  width: 130px;
  transform: translateY(-50%);
  border-radius: 100%;
  ${ImageHoverFilter}
`;

const UnclickableIcon = styled.img`
  pointer-events: none;
  position: absolute;
`

const PhotoImg = styled(UnclickableIcon)`
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 45px;
`;

const PencilImg = styled(UnclickableIcon)`
  top: 20px; 
  right: 20px; 
  width: 30px;
`;

const Error = styled.p`
  color: red;
  font-size: 1.1rem;
  text-align: center;
`

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0 20px 0;
`;

const NegativeMarginWrapper = styled(InputWrapper)`
  margin: -40px 0 20px 0;
`;

const Button =  styled.button`
  padding: 0 10px;
  margin-bottom: 8px;
  height: 40px;
  font-size: 1.2rem;
  border-radius: 20px;
`;

const pfpBorder = `
  border-radius: 100%;
`;

const coverBorder = `
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

export default EditProfileForm;
