import React, { useState } from "react";
import styled from "styled-components";
import FileImg from "../../inputs/FileImg";
import TextArea from "../../inputs/Textarea";
import close from '../../../assets/icons/crossIcon.svg'
import addPhoto from '../../../assets/images/loadimg.png'
import { validateDescription, isFileImage } from "../../../utils/validation";
import { getCurrentUserUsername } from "../../../firebase/authentication";
import { createPost, getPostDocReference } from "../../../firebase/firestore";
import { uploadPhoto } from "../../../firebase/storage";
import { Timestamp } from "firebase/firestore";

const PostForm = ({closeForm}) => {
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const payload = {};
    const photo = document.querySelector('#post-photo');
    const descr = document.querySelector('#post-description');
    const isDescrValid = validateDescription(descr.value);
    const isPictureValid = photo.files.length === 0 
      ? true
      : (photo.files[0] && isFileImage(photo.files[0]));

    switch(true) {
      case isDescrValid !== true:
        setError(isDescrValid);
        return;
      case isPictureValid !== true:
        setError(isPictureValid);
        return;
      default:
        const username = getCurrentUserUsername();
        const docRef = await getPostDocReference(username); // Get a ref early for the ID.
        if(photo.files.length !== 0) payload.photo = await uploadPhoto(`users/${username}/${docRef.id}`, photo.files[0]);
        else{
          setError('Cannot upload a post without an image!');
          return;
        }
        payload.description = descr.value;
        payload.username = username;
        payload.timestamp = Timestamp.fromDate(new Date());
        payload.comments = [];
        payload.likedby = [];
        createPost(docRef, payload);
    }
  }

  return (
  <Backdrop>
    <Container>
      <FormTitle>
        <h1>Create Post</h1>
        <img src={close} alt='close form' onClick={() => closeForm(false)}/>
      </FormTitle>
      <Form id="new-post">
        <ImgContainer>
          <FileImg id='post-photo' url={addPhoto} alt='add photo icon' imgStyle={ImgBorder}/>
        </ImgContainer>
        <TextareaContainer>
        <TextArea id='post-description' maxlenght='100' boxStyle={TextboxStyle} label='Description' />
        {error && <p>{error}</p>}
        </TextareaContainer>
        <Button onClick={(e) => handleSubmit(e)}>Post</Button>
        <Button onClick={() => closeForm(false)}>Close</Button>
      </Form>
    </Container>
  </Backdrop>
  )
};

const Backdrop = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  
  width: 100vw;
  height: 100vh;
  background-color: #00000091;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  padding: 24px;
  width: 90%;
  background-color: white;
  border-radius: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FormTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 90%;
  margin-bottom: 20px;
  border-bottom: 1px solid black;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const ImgContainer = styled.div`
  width: 250px;
  height: 250px;
  border: 1px solid black;
  border-radius: 20px;
`;

const TextareaContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start
`

const ImgBorder = `
  border-radius: 20px;
`;

const TextboxStyle = `
 width: 250px;
 padding: 8px;
`;

const Button = styled.button`
  padding: 0 10px;
  height: 40px;
  width: 150px;
  font-size: 1.2rem;
  border-radius: 20px;
`

export default PostForm;
