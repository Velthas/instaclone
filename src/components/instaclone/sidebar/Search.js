import React from "react";
import styled from "styled-components";
import { flexColumnCenter, fadeIn } from "../../../styles/style";
import { useSearch } from "../../../utils/hooks";
import Searchbar from "../../inputs/Searchbar";
import UserCard from "../profile/UserCard";

const Search = ({toggleSidebar}) => {
  const [profiles, setQuery] = useSearch()

  return (
    <>
      <Container>
        <Heading>Search</Heading>
        <Searchbar id='search-side' setQuery={setQuery} />
      </Container>
      <div>
        {profiles && profiles.map(prof => <UserCard toggleSidebar={toggleSidebar} user={prof} key={prof.id} /> )}
      </div>
    </>
  )
}

const Container = styled.div`
  width: 100%;
  ${flexColumnCenter};
  align-items: initial;
  justify-content: flex-start;
  gap: 50px;
  padding: 24px 16px;

  border-bottom: 1px solid #dfdfdf;
  animation-name: ${fadeIn};
  animation-duration: 1s;
  transition-timing-function: ease-out;
`;

const Heading = styled.h1`
  padding-left: 10px;

  @media (max-width: 750px) {
    display: none;
  }
`;

export default Search;