import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Input = ({ id, type, placeholder, label, value, styling }) => {
  const [input, setInput] = useState(value ? value : "");
  const handleChange = (e) => setInput(e.target.value);

  return (
    <Container>
      <Label htmlFor={id}>{label ? label : ""}</Label>
      <div>
        <TextBox
          type={type}
          placeholder={placeholder ? placeholder : ""}
          id={id}
          onChange={(e) => handleChange(e)}
          value={input}
          styling={styling}
        />
        <Description></Description>
      </div>
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
`;

const TextBox = styled.input`
  ${({ styling }) => styling}
  height: 32px;
  width: 350px;
  border-radius: 4px;
  border: 1px solid #dfdfdf;
  padding: 5px;
`;

const Description = styled.p`
  margin-top: 16px;
`;

const Label = styled.label`
  min-width: 120px;
  text-align: right;
  font-weight: 500;
  margin-top: 6px;
  margin-right: 20px;
  font-size: 1rem;
`;

export default Input;
