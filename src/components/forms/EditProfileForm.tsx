import { useState } from "react";
import styled from "styled-components";
import { isFileImage } from "../../utils/validation";
import { uploadPhoto } from "../../firebase/storage";
import { updateProfile } from "../../firebase/firestore";
import { validateName, validateDescription } from "../../utils/validation";
import { useNavigate } from "react-router-dom";
import { getCurrentUserUsername } from "../../firebase/authentication";

import Input from "../inputs/Input";
import TextArea from "../inputs/Textarea";
import FileImg from "../inputs/FileImg";

type Props = {
  info: any,
  loadInfo: () => void,
  refresh: (username: string) => void,
}

const EditProfileForm = ({ info, loadInfo, refresh }: Props) => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const currentUser = getCurrentUserUsername()

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if(currentUser !== info.username) return // Don't allow edits to other users
    setError("");
    e.preventDefault();

    const payload: {name?: string; description?: string; pfp?: string} = {}; // Payload for firebase
    const [pfp, name] = Array.from(
      document.querySelectorAll<HTMLInputElement>("#edit-profile input")
    );
    const bio = document.querySelector<HTMLTextAreaElement>("#bio");
    if(!(bio && pfp.files && name)) return;
    const isPfpFileValid =
      pfp.files.length === 0 ? true : pfp.files[0] && isFileImage(pfp.files[0]);
    const isNameValid = validateName(name.value);
    const isDescrValid = validateDescription(bio.value);

    switch (true) {
      case isPfpFileValid !== true:
        if (typeof isPfpFileValid  === 'string') setError(isPfpFileValid);
        return;
      case isNameValid !== true:
        if (typeof isNameValid  === 'string') setError(isNameValid);
        return;
      case isDescrValid !== true:
        if (typeof isDescrValid  === 'string') setError(isDescrValid);
        return;
      default:
        if (name.value !== info.name) payload.name = name.value;
        if (bio.value !== info.description) payload.description = bio.value;
        if (pfp.files.length !== 0)
          payload.pfp = await uploadPhoto(
            `users/${info.username}/pfp`,
            pfp.files[0]
          );
        updateProfile(info.username, payload); // Updates back end
        loadInfo(); // Triggers a refetch for the front-end profile portion
        refresh(info.username); // Triggers a refetch for the user data used by the navbar and new post.
        navigate(`/profile/${info.username}`); // Go back to the profile.
    }
  };

  return (
    <Form id="edit-profile">
      <ImageContainer>
        <FileImg id="pfp" url={info ? info.pfp : ""} imgStyle={ImageStyle} />
        <UserInfo>
          <span>{info ? info.username : ""}</span>
          <FileLabel htmlFor="pfp">Change profile picture</FileLabel>
        </UserInfo>
      </ImageContainer>
      <Input id="name" type="text" label="Name" value={info ? info.name : ""} />
      <TextArea id="bio" label="Biography" value={info ? info.description : ""} />
      {error && <Error>{error}</Error>}
      <Button blue onClick={(e) => handleSubmit(e)}>
        Save
      </Button>
    </Form>
  );
};

const Form = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;

  @media (max-width: 750px) {
    align-items: flex-start;
  }
`;

const ImageContainer = styled.div`
  height: min-content;
  display: flex;
  justify-content: flex-end;
  width: 100%;

  @media (max-width: 750px) {
    min-width: auto;
    justify-content: flex-start;
  }
`;

const UserInfo = styled.div`
  display: flex;
  width: min(100%, 330px);
  flex-direction: column;

  @media (max-width: 750px) {
    min-width: auto;
  }
`;

const FileLabel = styled.label`
  font-size: 0.8rem;
  font-weight: 500;
  color: #5295f6;
  cursor: pointer;

  &:hover {
    color: #00376b;
  }
`;

const ImageStyle = `
  border-radius: 100%;
  border: 1px solid #dfdfdf;
  cursor: pointer;
  height: 38px;
  width: 38px;
  margin-right: 20px;
  transition: 0.3s ease-in;
  &:hover {
  filter: brightness(0.7);
  }
`;

const Error = styled.p`
  color: red;
  font-size: 1.1rem;
  text-align: center;
`;

const Button = styled.button<{blue: boolean}>`
  padding: 8px 16px;
  margin-left: 5px;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.9rem;
  cursor: pointer;
  color: ${(props) => (props.blue ? "#fff" : "#000")};
  background-color: ${(props) => (props.blue ? "#0095f6" : "#efefef")};
  &:hover {
    background-color: ${(props) => (props.blue ? "#1877f2" : "#dbdbdb")};
  }
`;

export default EditProfileForm;
