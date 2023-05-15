import styled from "styled-components";
import { BsArrowLeft, BsXLg } from "react-icons/bs";

type Props = {
  photo: false | string;
  setPhoto: (photo: false | string) => void;
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
  closeForm: () => void;
  loading: boolean;
};

const PostFormHeader = ({
  photo,
  setPhoto,
  handleSubmit,
  closeForm,
  loading,
}: Props) => {
  return (
    <FormTitle photo={photo}>
      <XIcon onClick={() => closeForm()} />
      {photo && !loading && (
        <LeftArrow title="go back" onClick={() => setPhoto(false)} />
      )}
      <Heading>Create a new post</Heading>
      {photo && !loading && (
        <SharePost onClick={(e) => handleSubmit(e)}>Share</SharePost>
      )}
    </FormTitle>
  );
};

const SharePost = styled.button`
  position: absolute;
  inset-inline-end: 16px;
  cursor: pointer;
  color: #0095f6;
  font-weight: 500;
  font-size: 0.9rem;
  background-color: transparent;
  border: none;
  &:hover {
    color: #000;
  }
`;

const FormTitle = styled.div<{ photo: false | string }>`
  position: relative;
  transition: 1s ease-out;
  padding: 0 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 45px;
  border-bottom: 1px solid #dfdfdf;
`;

const XIcon = styled(BsXLg)`
  display: none;

  @media (max-width: 550px) {
    position: absolute;
    inset-inline-start: 16px;
    display: block;
    color: #262626;
    height: 20px;
    width: 20px;
    cursor: pointer;
  }
`;

const LeftArrow = styled(BsArrowLeft)`
  position: absolute;
  inset-inline-start: 16px;
  height: 24px;
  width: 24px;
  color: #262626;
  cursor: pointer;

  @media (max-width: 550px) {
    display: none;
  }
`;

const Heading = styled.h1`
  padding: 10px 0;
  font-size: 1rem;
  font-weight: 500;
  color: #000;
`;

export default PostFormHeader;
