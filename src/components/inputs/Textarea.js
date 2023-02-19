import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

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

TextArea.propTypes = {
  value: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string
};

const Container = styled.div`
  height: min-content;
  display: flex;

  @media (max-width: 750px) {
    flex-direction: column;
    width: 100%;
    gap: 8px;
  }
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

  @media (max-width: 750px) {
    width: min(100%, 350px);
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

  @media (max-width: 750px) {
    min-width: auto;
    text-align: left;
  }
`;

export default TextArea;
