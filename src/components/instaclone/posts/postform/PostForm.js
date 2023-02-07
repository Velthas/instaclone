import React, { useState } from "react";
import { BsXLg } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { validateDescription, isFileImage } from "../../../../utils/validation";
import { getCurrentUserUsername } from "../../../../firebase/authentication";
import { createPost, getPostDocReference } from "../../../../firebase/firestore";
import { uploadPhoto } from "../../../../firebase/storage";
import { Timestamp } from "firebase/firestore";
import { fadeIn } from "../../../../styles/style";
import PostFormHeader from "./PostFormHeader";
import ImageSelection from "./ImageSelection";
import PostInfo from "./PostInfo";
import Loading from "./Loading";

const PostForm = ({ closeForm, user }) => {
  const [photo, setPhoto] = useState(false);
  const [fileError, setFileError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {};
    const photo = document.querySelector("#post-photo");
    const descr = document.querySelector("#post-description");
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
        setPhoto(false)
        alert(isPictureValid)
        return;
      default: 
        const username = getCurrentUserUsername();
        const docRef = await getPostDocReference(username); // Get a ref early for the ID.
        if (photo.files.length !== 0)
          payload.photo = await uploadPhoto(
            `users/${username}/${docRef.id}`,
            photo.files[0]
          );
        payload.id = docRef.id;
        payload.description = descr.value;
        payload.username = username;
        payload.timestamp = Timestamp.fromDate(new Date());
        payload.likedby = [];

        await createPost(docRef, payload); // Wait until process is done
        setLoading(false); // Stop displaying the loading gif
        closeForm(false); // Close the form
        navigate(`/posts/${user.username}/${docRef.id}`) // Redirect user to the full post interface
    }
  };

  return (
    <Backdrop>
      <CloseForm title="close form" onClick={() => closeForm(false)} />
      <Container>
        <PostFormHeader
          photo={photo}
          setPhoto={setPhoto}
          handleSubmit={handleSubmit}
        />
        <Form id="post-form">
          <Loading loading={loading} />
          <ImageSelection
            photo={photo}
            setPhoto={setPhoto}
            fileError={fileError}
            setFileError={setFileError}
          />
          <Image photo={photo} loading={loading} src={photo ? photo : ""} />
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
  height: 100vh;
  background-color: #00000091;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const CloseForm = styled(BsXLg)`
  color: #fff;
  height: 20px;
  width: 20px;
  position: absolute;
  top: 20px;
  right: 20px;
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
`;

const Image = styled.img`
  ${({ photo }) => (photo ? "display: block" : "display: none")};
  ${({ loading }) => (loading ? "display: none" : "")};
  max-width: 600px;
  height: 100%;
  object-fit: cover;
  border-bottom-left-radius: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: calc(100% - 45px);
`;

export default PostForm;
