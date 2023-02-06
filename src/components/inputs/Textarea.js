import React, { useState } from "react";
import styled from "styled-components";

const TextArea = ({ value, id, label }) => {
  const [input, setInput] = useState(value ? value : "");
  const handleChange = (e) => setInput(e.target.value);

  return (
    <Container>
      <Label htmlFor={id}>{label ? label : ""}</Label>
      <div>
        <TextBox
          id={id}
          rows="5"
          col="33"
          maxLength="150"
          onChange={(e) => handleChange(e)}
          value={input}
        />
        <Description>{input.length + "/150"}</Description>
      </div>
    </Container>
  );
};

const Container = styled.div`
  height: min-content;
  display: flex;
`;

const TextBox = styled.textarea`
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #dfdfdf;
  width: 350px;
  resize: none;

  &:focus-visible {
    outline: 1px solid black;
  }
`;

const Description = styled.p`
  font-size: 0.8rem;
  color: #8e8e8e;
`;

const Label = styled.label`
  min-width: 120px;
  text-align: right;
  font-weight: 500;
  margin-top: 6px;
  margin-right: 20px;
  font-size: 1rem;
`;

export default TextArea;
