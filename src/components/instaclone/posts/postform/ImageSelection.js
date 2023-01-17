import React from "react";
import styled from "styled-components";
import { isFileImage } from "../../../../utils/validation";
import { flexColumnCenter } from "../../../../styles/style";
import pictureIcon from "../../../../assets/icons/photo.svg";
import warningIcon from "../../../../assets/icons/warning.svg";

const ImageSelection = ({ photo, setPhoto, fileError, setFileError }) => {
  const handleChange = (e) => {
    setFileError(false); // Reset the error we displayed before.
    const [file] = e.target.files; // Get the first file off the filelist.
    if (isFileImage(file) === true) setPhoto(URL.createObjectURL(file)); // If file is an image, displays the description box.
    else setFileError(`Could not load ${file.name}`); // Otherwise display fileError.
  };

  return (
    <Container photo={photo}>
      <img alt={fileError ? 'warning sign' : 'picture icon'} src={fileError ? warningIcon : pictureIcon} />
      <span>{fileError ? fileError : "Drag your images and videos here"}</span>
      <label htmlFor="post-photo">
        <Input data-testid="post" id="post-photo" type="file" onChange={(e) => handleChange(e)} />
        <Button type="button" blue>
          {fileError
            ? "Try uploading other files"
            : "Click here to upload from your device"}
        </Button>
      </label>
    </Container>
  );
};

const Container = styled.div`
  ${flexColumnCenter}
  ${({ photo }) => (photo ? "display: none" : "display: flex")};
  gap: 20px;
`;

const Input = styled.input`
  display: none;
`;

const Button = styled.button`
  pointer-events: none;
  cursor: pointer;
  padding: 8px 16px;
  margin-left: 5px;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.9rem;
  color: ${(props) => (props.blue ? "#fff" : "#000")};
  background-color: ${(props) => (props.blue ? "#0095f6" : "#efefef")};
  &:hover {
    background-color: ${(props) => (props.blue ? "#1877f2" : "#dbdbdb")};
  }
`;

export default ImageSelection;
