import styled from "styled-components";
import { flexRowBetween, flexRowCenter } from "../../../../styles/style";
import { BsTelephone, BsCameraVideo, BsInfoCircle, BsChevronLeft } from "react-icons/bs";
import { Chatroom } from "../../../../utils/types";

type Props = {
  active: Chatroom | null,
  backToChatSelection: () => void,
};

const RoomHeader = ({ active, backToChatSelection }: Props) => {
  return (
    <Header>
      <BackIcon onClick={backToChatSelection} />
      <Username>{active ? active.username : ""}</Username>
      <Icons>
        <BsTelephone />
        <BsCameraVideo />
        <BsInfoCircle />
      </Icons>
    </Header>
  );
};

const Header = styled.div`
  width: 100%;
  height: 60px;
  flex-shrink: 0;
  padding: 0 5%;
  border-bottom: 1px solid #dfdfdf;

  ${flexRowBetween}
`;

const Username = styled.span`
  font-weight: 500;
  font-size: 1rem;
`;

const Icons = styled.div`
  ${flexRowCenter};
  gap: 10px;
`;

const BackIcon = styled(BsChevronLeft)`
  display: none;

  @media (max-width: 750px) {
    display: block;
  }
`;

export default RoomHeader;