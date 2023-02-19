import styled, { keyframes } from "styled-components";
import React, { useState, useEffect } from "react";
import { flexRowCenter } from '../../../styles/style';

import loginbackground from "../../../assets/images/login.png";
import carousel1 from "../../../assets/images/login1.png";
import carousel2 from "../../../assets/images/login2.png";
import carousel3 from "../../../assets/images/login3.png";

const Phone = () => {
  // Sad to say but, if you remove that first element and set slide to 0
  // The first slide doesn't get displayed. I can't wrap my head around why.
  const [carousel, setCarousel] = useState(["", carousel1, carousel2, carousel3]);
  const [slide, setSlide] = useState(1);
  useEffect(() => {
    // Use this timer to cycle the carousel pictures
    const timer = setInterval(() => {
      setSlide((prev) => (prev === 3 ? 1 : prev + 1));
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <PhoneContainer>
      {carousel.map((photo, index) => {
        if (index === slide) return <Image key={slide} src={photo} />;
      })}
    </PhoneContainer>
  );
};

export default Phone;

const PhoneContainer = styled.div`
  background-image: url(${loginbackground});
  background-size: cover;
  background-position: center;
  position: relative;

  width: 380px;
  height: 600px;

  ${flexRowCenter};
  flex-shrink: 0;

  @media (max-width: 750px) {
    display: none;
  }
`;

const appear = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const Image = styled.img`
  position: absolute;
  right: 25px;
  top: 23px;
  height: 515px;
  animation-name: ${appear};
  animation-duration: 2s;

  ${flexRowCenter};
`;
