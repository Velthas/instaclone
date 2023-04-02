import { keyframes } from "styled-components";

const flexRowCenter = `
  display: flex;
  align-items: center;
  justify-content: center;
`;

const flexColumnCenter = `
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const flexRowBetween = `
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const fadeIn = keyframes` 
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

export { flexRowCenter, flexColumnCenter, flexRowBetween, fadeIn };
