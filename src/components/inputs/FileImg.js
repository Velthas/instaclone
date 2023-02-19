import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { isFileImage } from "../../utils/validation";

const FileImg = ({ id, url, imgStyle }) => {
  const [photo, setPhoto] = useState(url);

  const handleChange = (e) => {
    const [file] = e.target.files;
    let urlpic = URL.createObjectURL(file);
    if (isFileImage(file)) setPhoto(urlpic);
  };

  return (
    <label htmlFor={id}>
      <ImgWrapper>
        <Img imgStyle={imgStyle} src={photo} />
      </ImgWrapper>
      <Input
        data-testid="file"
        title="upload"
        type="file"
        id={id}
        accept="image/*"
        onChange={(e) => handleChange(e)}
      />
    </label>
  );
};

FileImg.propTypes = {
  id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  imgStyle: PropTypes.string,
};

const Input = styled.input`
  display: none;
`;

const ImgWrapper = styled.div`
  min-width: 120px;
  display: flex;
  justify-content: flex-end;

  @media (max-width: 750px) {
    min-width: min-content;
  }
`;

const Img = styled.img`
  object-fit: cover;
  ${({ imgStyle }) => imgStyle};
`;

export default FileImg;
