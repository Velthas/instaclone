import styled from "styled-components";
import { isFileImage } from "../../../../utils/validation";
import { flexColumnCenter } from "../../../../styles/style";
import pictureIcon from "../../../../assets/icons/photo.svg";
import warningIcon from "../../../../assets/icons/warning.svg";

type Props = {
  photo: boolean | string;
  setPhoto: (photo: false | string) => void;
  fileError: boolean | string;
  setFileError: (error: boolean | string) => void;
};

const ImageSelection = ({
  photo,
  setPhoto,
  fileError,
  setFileError,
}: Props) => {
  // Handles validation when image is loaded
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(false); // Reset error view
    if(!e.target.files) return
    const [file] = e.target.files; // Get first file off filelist
    if (isFileImage(file) === true) setPhoto(URL.createObjectURL(file));
    // Will open description box and display image
    else setFileError(`Could not load ${file.name}`); // Otherwise display error
  };

  return (
    <Container photo={photo}>
      <img
        alt={fileError ? "warning sign" : "picture icon"}
        src={fileError ? warningIcon : pictureIcon}
      />
      <span>{fileError ? fileError : "Drag your images and videos here"}</span>
      <Label htmlFor="post-photo">
        <Input
          data-testid="post"
          id="post-photo"
          type="file"
          onChange={(e) => handleChange(e)}
        />
        <Button type="button" blue>
          {fileError
            ? "Try uploading other files"
            : "Click here to upload from your device"}
        </Button>
      </Label>
    </Container>
  );
};

const Container = styled.div<{ photo: boolean | string }>`
  ${flexColumnCenter}
  ${({ photo }) => (photo ? "display: none" : "display: flex")};
  gap: 20px;
`;

const Input = styled.input`
  display: none;
`;

const Label = styled.label`
  cursor: pointer;
`;

const Button = styled.button<{ blue: boolean }>`
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
