import React, { useState } from "react";
import styled from "styled-components";
import { BsSearch, BsXCircleFill } from "react-icons/bs";

type Props = {
  setQuery: (query: string) => void,
  id: string,
};

const Searchbar = ({ setQuery, id }: Props) => {
  const [focused, setFocused] = useState(false);

  return (
    <>
      {!focused && (
        <Container onClick={() => setFocused(true)}>
          <BsSearch size="20px" color="#c7c7c7" />
          <Text>Search</Text>
        </Container>
      )}
      {focused && (
        <InputContainer>
          <Input
            autoFocus={true}
            type={"text"}
            id={id}
            placeholder="Search"
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
          />
          <CloseIcon color="#c7c7c7" size="13" onClick={() => setFocused(false)} />
        </InputContainer>
      )}
    </>
  );
};

const Container = styled.div`
  height: 35px;
  width: 100%;
  padding: 0 16px;
  background-color: #efefef;
  color: #8e8e8e;
  border-radius: 8px;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  cursor: text;
`;

const Text = styled.span`
  font-size: 1rem;
`;

const InputContainer = styled.div`
  position: relative;
  padding: 0 16px;
  height: 35px;
  width: 100%;
  border-radius: 8px;
  background-color: #efefef;
  color: #8e8e8e;
`;

const Input = styled.input`
  border: none;
  outline: none;
  background-color: #efefef;
  color: #8e8e8e;
  width: 100%;
  height: 100%;
  font-size: 1rem;
`;

const CloseIcon = styled(BsXCircleFill)`
  position: absolute;
  right: 5%;
  top: 12px;
`;

export default Searchbar;
