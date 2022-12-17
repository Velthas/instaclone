import React, {useState} from "react";
import PropTypes from "prop-types";

const Input = ({id, type, placeholder}) => {
  const [input, setInput] = useState('')
  const handleChange = (e) => setInput(e.target.value)

  return (
    <>
      <label htmlFor={id}></label>
      <input 
        type={type}
        placeholder={placeholder}
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
}

export default Input;
