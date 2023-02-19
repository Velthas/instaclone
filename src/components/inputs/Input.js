import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Input = ({ id, type, placeholder, label, value, styling }) => {
  const [input, setInput] = useState(value ? value : "");
  const handleChange = (e) => setInput(e.target.value);

  return (
    <Container>
      <Label htmlFor={id}>{label ? label : ""}</Label>
      <InputWrapper>
        <TextBox
          type={type}
          placeholder={placeholder ? placeholder : ""}
          id={id}
          onChange={(e) => handleChange(e)}
          value={input}
          styling={styling}
        />
      </InputWrapper>
    </Container>
  );
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  styling: PropTypes.string,
};

const Container = styled.div`
  height: min-content;
  display: flex;
  width: 100%;

  @media (max-width: 750px) {
    flex-direction: column;
    width: 100%;
    gap: 8px;
  }
`;

const InputWrapper = styled.div`
  width: 100%;
`;

const TextBox = styled.input`
  ${({ styling }) => styling}
  height: 32px;
  width: min(100%, 350px);
  border-radius: 4px;
  border: 1px solid #dfdfdf;
  padding: 5px;

  &:focus-visible {
    outline: 1px solid black;
  }
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

export default Input;
