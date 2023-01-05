import React from "react";
import styled from "styled-components";
import { flexColumnCenter } from "../../../styles/style";
import { useSearch } from "../../../utils/hooks";
import Searchbar from "../../inputs/Searchbar";
import UserCard from "../profile/UserCard";

const Search = () => {
  const [profiles, setQuery] = useSearch()

  return (
    <>
      <Container>
        <Heading>Search</Heading>
        <Searchbar id='search-side' setQuery={setQuery} />
      </Container>
      <div>
        {profiles && profiles.map(prof => <UserCard user={prof} key={prof.id} /> )}
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
`;

const Heading = styled.h1`
  padding-left: 10px;
`;

export default Search;