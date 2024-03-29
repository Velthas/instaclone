import { useState } from "react";
import styled from "styled-components";

type Props = {
  value: string | undefined,
  id: string,
  label?: string  
};

const TextArea = ({ value, id, label }: Props) => {
  const [input, setInput] = useState(value ? value : "");
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value);

  return (
    <Container>
      <Label htmlFor={id}>{label ? label : ""}</Label>
      <div>
        <TextBox
          id={id}
          rows={5}
          maxLength={150}
          onChange={(e) => handleChange(e)}
          value={input}
        />
        <Description>{input.length + "/150"}</Description>
      </div>
    </Container>
  );
};

const Container = styled.div`
  height: min-content;
  display: flex;

  @media (max-width: 750px) {
    flex-direction: column;
    width: 100%;
    gap: 8px;
  }
`;

const TextBox = styled.textarea`
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #dfdfdf;
  width: 350px;
  resize: none;

  &:focus-visible {
    outline: 1px solid black;
  }

  @media (max-width: 750px) {
    width: min(100%, 350px);
  }
`;

const Description = styled.p`
  font-size: 0.8rem;
  color: #8e8e8e;
`;

const Label = styled.label`
  min-width: 120px;
  text-align: right;
  font-weight: 500;
  margin-top: 6px;
  margin-right: 20px;
  font-size: 1rem;

  @media (max-width: 750px) {
    min-width: auto;
    text-align: left;
  }
`;

export default TextArea;
