import { useContext, useState } from "react";
import styled from "styled-components";
import { BsXLg } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { validateDescription, isFileImage } from "../../../../utils/validation";
import { getCurrentUserUsername } from "../../../../firebase/authentication";
import {
  createPost,
  getPostDocReference,
} from "../../../../firebase/firestore";
import { uploadPhoto } from "../../../../firebase/storage";
import { Timestamp } from "firebase/firestore";
import { fadeIn } from "../../../../styles/style";
import { UserContext } from "../../../context/UserProvider";

import PostFormHeader from "./PostFormHeader";
import ImageSelection from "./ImageSelection";
import PostInfo from "./PostInfo";
import Loading from "./Loading";

type Props = {
  closeForm: () => void;
};

const PostForm = ({ closeForm }: Props) => {
  const { user } = useContext(UserContext) || {};
  const [photo, setPhoto] = useState<false | string>(false);
  const [fileError, setFileError] = useState<boolean | string>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!user) return;
    e.preventDefault();
    setLoading(true);

    const payload = {} as any;
    const photo = document.querySelector<HTMLInputElement>("#post-photo");
    const descr = document.querySelector<HTMLInputElement>("#post-description");
    if (!photo || !descr || !photo.files) return;
    const isDescrValid = validateDescription(descr.value);
    const isPictureValid =
      photo.files.length === 0
        ? "You must upload at least a file"
        : photo.files[0] && isFileImage(photo.files[0]);

    switch (true) {
      case isDescrValid !== true:
        setPhoto(false);
        alert(isDescrValid);
        return;
      case isPictureValid !== true:
        setPhoto(false);
        alert(isPictureValid);
        return;
      default:
        const username = getCurrentUserUsername() as string;
        const docRef = await getPostDocReference(username); // Get a ref early for the ID.
        if (photo.files.length !== 0)
          payload.photo = await uploadPhoto(
            `users/${username}/${docRef.id}`,
            photo.files[0]
          );
        payload.id = docRef.id;
        payload.description = descr.value;
        payload.username = username;
        payload.timestamp = Timestamp.now();
        payload.likedby = [];

        await createPost(docRef, payload); // Wait until process is done
        setLoading(false); // Stop displaying the loading gif
        closeForm(); // Close the form
        navigate(`/posts/${user.username}/${docRef.id}`); // Redirect user to post
    }
  };

  return (
    <Backdrop>
      <CloseForm title="close form" onClick={() => closeForm()} />
      <Container>
        <PostFormHeader
          photo={photo}
          setPhoto={setPhoto}
          handleSubmit={handleSubmit}
          closeForm={closeForm}
          loading={loading}
        />
        <Form photo={photo} id="post-form">
          <Loading loading={loading} />
          <ImageSelection
            photo={photo}
            setPhoto={setPhoto}
            fileError={fileError}
            setFileError={setFileError}
          />
          <Image
            photo={photo}
            isLoading={loading}
            src={photo ? photo : undefined}
          />
          <PostInfo user={user} loading={loading} photo={photo} />
        </Form>
      </Container>
    </Backdrop>
  );
};

const Backdrop = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 4;

  width: 100vw;
  min-height: 100vh;
  max-height: 100%;
  overflow-y: auto;
  background-color: #000000c4;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  @media (max-width: 550px) {
    top: 0;
    left: auto;
    transform: none;
    height: 100%;
  }

  @media only screen and (max-height: 550px) and (orientation: landscape) {
    top: 0;
    left: 0;
    height: 100%;
    transform: none;
    align-items: center;
  }
`;

const CloseForm = styled(BsXLg)`
  color: #fff;
  height: 20px;
  width: 20px;
  position: absolute;
  top: 20px;
  right: 20px;

  @media (max-width: 550px) {
    display: none;
  }
`;

const Container = styled.div`
  transition: 0.3s ease-out;
  min-width: 600px;
  height: 600px;
  background-color: white;
  border-radius: 10px;

  animation-name: ${fadeIn};
  animation-duration: 0.5s;
  transition-timing-function: ease-out;

  @media (max-width: 950px) {
    min-width: 450px;
    height: 450px;
  }

  @media (max-width: 750px) {
    height: auto;
    min-width: 350px;
    margin: 20px;
  }

  @media (max-width: 550px) {
    height: 100%;
    width: 100%;
    min-width: initial;
    border-radius: 0;
    margin: 0;
  }

  @media only screen and (max-height: 550px) and (orientation: landscape) {
    height: 95%;
    min-width: min(500px, 95%);
  }
`;

const Image = styled.img<{ photo: false | string; isLoading: boolean }>`
  ${({ photo }) => (photo ? "display: block" : "display: none")};
  ${({ isLoading }) => (isLoading ? "display: none" : "")};
  max-width: 555px;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-bottom-left-radius: 10px;

  @media (max-width: 950px) {
    max-width: 400px;
  }

  @media (max-width: 750px) {
    height: 300px;
    width: 100%;
    max-width: initial;
    border-bottom-left-radius: 0;
  }
`;

const Form = styled.form<{ photo: string | false }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: calc(100% - 45px);

  @media (max-width: 750px) {
    flex-direction: column;
    ${({ photo }) => (photo ? "height: auto;" : "height: 300px;")};
  }
`;

export default PostForm;
