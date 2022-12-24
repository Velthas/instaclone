import React, { useState } from "react";
import PropTypes from "prop-types"
import styled from "styled-components";
import { isFileImage } from "../../utils/validation";

const FileImg = ({id, url, alt, imgStyle}) => {
  const [photo, setPhoto] = useState(url);
  const handleChange = (e) => {
    const [file] = e.target.files;
    if(isFileImage(file)) setPhoto(URL.createObjectURL(file));
  }

  return(
    <label htmlFor={id}>
      <Img imgStyle={imgStyle} src={photo} alt={alt} />
      <Input type="file" id={id} accept="image/*" onChange={(e) => handleChange(e)} />
    </label>
  )
};

FileImg.propTypes = {
  id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  alt: PropTypes.string,
}

const Input = styled.input`
  display: none;
`

const Img = styled.img`
  ${({imgStyle}) => imgStyle}
  object-fit: cover;
  width: 100%;
  height: 100%;
`

export default FileImg;