import React, {useState} from "react";
import styled from "styled-components";

const TextArea = ({value, maxlenght, boxStyle, id, label}) => {
  const [input, setInput] = useState(value ? value : '')
  const handleChange = (e) => setInput(e.target.value)

  return(
    <>
      <label htmlFor={id}>{label}</label>
      <TextBox
        id={id}
        rows="5"
        col="33"
        maxlenght={maxlenght}
        customStyle={boxStyle}
        onChange={(e) => handleChange(e)}
        value={input}
      >
      </TextBox>
    </>
  )
}

const TextBox = styled.textarea`
  ${({customStyle}) => customStyle};
  resize: none;
`;

export default TextArea;