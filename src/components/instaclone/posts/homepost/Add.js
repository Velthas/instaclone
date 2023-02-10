import React, {useState} from "react";
import styled from "styled-components";
import { BsEmojiSmile } from "react-icons/bs";
import { flexRowBetween } from "../../../../styles/style";

const Add = ({ post, insertComment }) => {
  const [value, setValue] = useState('');

  const handleChange = (e) => setValue(e.target.value);
  const sendComment = () => {
    insertComment();
    setValue('');
  }

  return (
    <AddComment>
      <Input
        onChange={(e) => handleChange(e)}
        placeholder="Add your comment here..."
        type="text"
        id={`a${post.id}`}
        value={value}
      />
      <Send value={value} onClick={sendComment}>Publish</Send>
      <Icon />
    </AddComment>
  );
};

const AddComment = styled.div`
  ${flexRowBetween}
  width: 100%;
  height: 50px;
  padding: 20px 0 15px 0;
`;

const Icon = styled(BsEmojiSmile)`
  height: 15px;
  width: 15px;
  margin-left: 7px;
  cursor: pointer;
  color: #8e8e8e;
  &:hover {
    color: #c7c7c7;
  }
`;

const Input = styled.input`
  background-color: transparent;
  height: 32px;
  border: none;
  padding: 5px;
  width: -webkit-fill-available;
  width: -moz-available;
  outline: none;
  &::placeholder {
    font-size: 0.9rem;
    color: #8e8e8e;
  }
`;

const Send = styled.button`
  display: ${({value}) => value.length > 0 ? 'block' : 'none'};
  font-weight: 500;
  color: #3897f0;
  border: none;
  border-radius: 3px;
  background-color: transparent;
  cursor: pointer;
  &:hover {
    color: #00376b;
  }
`;

export default Add;
