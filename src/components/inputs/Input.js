import React, {useState} from "react";
import PropTypes from "prop-types";

const Input = ({id, type, placeholder, label, value}) => {
  const [input, setInput] = useState(value ? value : '')
  const handleChange = (e) => setInput(e.target.value)

  return (
    <>
      <label htmlFor={id}>{label ? label : ''}</label>
      <input 
        type={type}
        placeholder={placeholder ? placeholder : ''}
        id={id}
        onChange={(e) => handleChange(e)}
        value={input}
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
}

export default Input;
