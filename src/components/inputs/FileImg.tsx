import React, { useState } from "react";
import styled from "styled-components";
import { isFileImage } from "../../utils/validation";

type Props = {
  id: string,
  url: string,
  imgStyle: string,
};

const FileImg = ({ id, url, imgStyle }: Props) => {
  const [photo, setPhoto] = useState(url);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files) {
      const [file] = e.target.files;
      let urlpic = URL.createObjectURL(file);
      if (isFileImage(file)) setPhoto(urlpic);
    };
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

const Img = styled.img<{imgStyle: string}>`
  object-fit: cover;
  ${({ imgStyle }) => imgStyle};
`;

export default FileImg;
