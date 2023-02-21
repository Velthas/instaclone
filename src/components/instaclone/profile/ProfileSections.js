import styled from "styled-components";
import { BsGrid3X3 } from "react-icons/bs";
import { CgPlayButtonR } from "react-icons/cg";
import { IoBookmarkOutline } from "react-icons/io5";
import { flexRowCenter } from "../../../styles/style";

const ProfileSections = () => {
  return (
    <Container>
      <Section active>
        <Grid active />
        <Text>Post</Text>
      </Section>
      <Section>
        <Bookmark />
        <Text>Saved</Text>
      </Section>
      <Section>
        <PlayButton />
        <Text>Tagged posts</Text>
      </Section>
    </Container>
  );
};

const Container = styled.div`
  margin: 10px 0;
  ${flexRowCenter}
  gap: 60px;
  border-top: 1px solid #dfdfdf;

  @media (max-width: 750px) {
    margin: 0 0 10px 0;
    gap: 0;
  }
`;

const Section = styled.div`
  padding: 10px 0 10px 0;
  ${({ active }) =>
    active
      ? "border-top: 1px solid black; color: #000; font-weight: 500; margin-top: -1px; "
      : "color: gray;"}
  cursor: pointer;

  @media (max-width: 750px) {
    width: 33%;
    text-align: center;
    padding-bottom: 0;
  }
`;

const Text = styled.span`
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.8rem;
  margin-left: 4px;

  @media (max-width: 550px) {
    display: none;
  }
`;

const Icons = `
  height: 10px;
  width: 10px;
  cursor: pointer;
  @media (max-width: 550px) {
    height: 24px;
    width: 24px;
  }
`;

const Grid = styled(BsGrid3X3)`
  ${Icons}
  color: ${({ active }) => (active ? "black" : "gray")};

  @media (max-width: 550px) {
    color: ${({ active }) => (active ? "#0095f6" : "gray")};
  }
`;

const Bookmark = styled(IoBookmarkOutline)`
  ${Icons}
`;

const PlayButton = styled(CgPlayButtonR)`
  ${Icons}
`;

export default ProfileSections;
