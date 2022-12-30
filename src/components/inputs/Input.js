import React, {useState} from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Input = ({id, type, placeholder, label, value, styling}) => {
  const [input, setInput] = useState(value ? value : '')
  const handleChange = (e) => setInput(e.target.value)

  return (
    <>
      <label htmlFor={id}>{label ? label : ''}</label>
      <TextBox 
        type={type}
        placeholder={placeholder ? placeholder : ''}
        id={id}
        onChange={(e) => handleChange(e)}
        value={input}
        styling={styling}
      />
    </>
  )
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  styling: PropTypes.string,
};

const TextBox = styled.input`
  ${({styling}) => styling }
`

export default Input;
