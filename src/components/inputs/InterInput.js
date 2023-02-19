import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { BsXCircle, BsCheckCircle } from "react-icons/bs";
import { flexRowCenter } from "../../styles/style";
import { IconContext } from "react-icons";

const InterInput = ({ label, type, id, checkValid }) => {
  const [value, setValue] = useState("");
  const [valid, setValid] = useState(true);

  const handleChange = (e) => {
    setValid(true);
    const valueIsValid = checkValid(e.target.value);
    if (valueIsValid !== true) setValid(false);
    setValue(e.target.value);
  };

  return (
    <IconContext.Provider value={{ style: { cursor: "pointer" }, size: 24 }}>
      <Container>
        <InputContainer>
          <Label hasContent={value.length > 0} htmlFor={id}>
            {label}
          </Label>
          <Input
            autoComplete="off"
            hasContent={value.length > 0}
            type={type}
            id={id}
            value={value}
            onChange={(e) => handleChange(e)}
          />
        </InputContainer>
        {valid ? <Valid /> : <Invalid />}
      </Container>
    </IconContext.Provider>
  );
};

InterInput.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  checkValid: PropTypes.func.isRequired,
};

const Container = styled.div`
  width: 100%;
  height: 40px;
  margin-bottom: 10px;

  ${flexRowCenter};
  justify-content: flex-start;
  flex-shrink: 0;

  border: 1px solid #dbdbdb;
  background-color: #fafafa;
`;

const InputContainer = styled.div`
  width: 90%;

  position: relative;
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

const Input = styled.input`
  ${(props) =>
    props.hasContent ? "padding: 14px 0 2px 8px" : "padding: 8px 8px"};
  width: 100%;
  height: 38px;
  outline: none;
  border: none;
`;

const centerAligned = `
  top: 50%;
  transform: translateY(-50%);
`;

const highAligned = `
  transform: translateY(-10px);
`;

const Label = styled.label`
  ${(props) => (props.hasContent ? highAligned : centerAligned)};
  position: absolute;
  left: 8px;
  transition: 1s ease-out;
  font-size: ${(props) => (props.hasContent ? "0.7rem" : "0.8rem")};
  color: #8e8e8e;
`;

const Valid = styled(BsCheckCircle)`
  color: #dfdfdf;
  width: 10%;
  margin-right: 8px;
`;

const Invalid = styled(BsXCircle)`
  color: #ee2e3e;
  width: 10%;
  margin-right: 8px;
`;

export default InterInput;
