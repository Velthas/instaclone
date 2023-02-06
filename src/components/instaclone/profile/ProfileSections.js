import styled from "styled-components";
import { BsGrid3X3 } from "react-icons/bs"
import { RiPolaroid2Line } from "react-icons/ri";
import { CgPlayButtonR } from "react-icons/cg";
import { flexRowCenter } from "../../../styles/style";

const ProfileSections = () => {
  return (
    <Container>
      <Section active>
        <BsGrid3X3 size={10} />
        <Text>Post</Text>
      </Section>
      <Section>
        <RiPolaroid2Line size={10} />
        <Text>Reels</Text>
      </Section>
      <Section>
        <CgPlayButtonR size={10} />
        <Text>Tagged posts</Text>
      </Section>
    </Container>
  )
} 

const Container = styled.div`
  margin: 10px 0;
  ${flexRowCenter}
  gap: 60px; 
  border-top: 1px solid #dfdfdf;
`;

const Section = styled.div`
  padding: 10px 0;
  ${({active}) => active 
  ? 'border-top: 1px solid black; color: #000; font-weight: 500; margin-top: -1px; ' : 'color: gray;'}
  cursor: pointer;
`;

const Text = styled.span`
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.8rem;
  margin-left: 4px;
`;

export default ProfileSections;
