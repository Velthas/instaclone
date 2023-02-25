import { useState } from "react";
import { useNotifications } from "../../../utils/hooks";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import * as BsIcons from "react-icons/bs";
import { IoPaperPlaneOutline, IoPaperPlaneSharp } from "react-icons/io5";
import { IconContext } from "react-icons";
import { flexRowCenter, fadeIn } from "../../../styles/style";

import Sidebar from "../sidebar/Sidebar";
import NotifPopup from "../sidebar/notifications/NotifPopup";
import UpperNav from "./UpperNav";
import PostForm from "../posts/postform/PostForm";
import instalogo from "../../../assets/logo/instalogo.png"

const Nav = ({ user, sidebar, setSidebar, active, setActive, userData }) => {
  const [notifications, markAllAsSeen] = useNotifications(user ? user.displayName : null);
  const [postForm, setPostForm] = useState(false); // Regulates new post form display

  // Click handler for icons that don't open the sidebar
  const handleClick = (icon) => {
    if (sidebar) setSidebar(false);  // Close the sidebar if it's open
    setActive(icon); // Marks the 'icon' as active
  };

  // Click handler for icons that open the sidebar
  const toggleSidebar = (icon) => {
    if (icon === active && sidebar === true) {
      setSidebar(false); // Close sidebar on same icon click
      setActive("");
    } else {
      setActive(icon); // Set icon active
      setSidebar(true); // Open related sidebar
    }
  };

  const closePostForm = () => {
    setPostForm(false); // Closes the new post form
    setActive(""); // Deactivates any active icon
  };

  const openPostForm = () => {
    handleClick("add"); // Activates post icon
    setPostForm(true); // Opens up the post form
  };

  return (
    <IconContext.Provider value={{ style: { cursor: "pointer" }, size: 24 }}>
      <Space sidebar={sidebar} active={active} />
      <UpperNav 
        notifications={notifications} 
        markAllAsSeen={markAllAsSeen} 
        toggleSidebar={toggleSidebar} 
        active={active} 
      />

      <Navbar sidebar={sidebar}>
        <Sidebar
          active={sidebar}
          content={active}
          toggleSidebar={toggleSidebar}
          notifications={notifications}
        />

        <LogoContainer>
          <MinifiedLogo sidebar={sidebar} title="instalogo" />
          <ExtendedLogo src={instalogo} sidebar={sidebar} title="instalogo" />
        </LogoContainer>

        <Icons>
          <StyledLink to={"/"}>
            <ListItem mobile={true} sidebar={sidebar} own={'home'} onClick={() => handleClick("home")}>
              {active === "home" 
                ? <BsIcons.BsHouseDoorFill title="home" />
                : <BsIcons.BsHouseDoor title="home" />
              }
              <Label sidebar={sidebar} active={active} own={"home"}>Home</Label>
            </ListItem>
          </StyledLink>

          <ListItem mobile={true} sidebar={sidebar} active={active} own={"search"} onClick={() => toggleSidebar("search")}>
            <BsIcons.BsSearch title="search" />
            <Label sidebar={sidebar} active={active} own={"search"}>Search</Label>
          </ListItem>

          <ListItem mobile={true} sidebar={sidebar} own={'add'} onClick={openPostForm}>
            {active === "add" 
              ? <BsIcons.BsPlusCircleFill title="add" />
              : <BsIcons.BsPlusCircle title="add" />
            }
            <Label sidebar={sidebar} active={active} own={"add"}>Create</Label>
          </ListItem>

          <NotifListItem mobile={false} sidebar={sidebar} active={active} own="heart" notif={notifications} onClick={() => { markAllAsSeen(toggleSidebar) }}>
            <NotifPopup notifications={notifications ? notifications : []} />
            {active === "heart" 
              ? <BsIcons.BsHeartFill title="heart" />
              : <BsIcons.BsHeart title="heart" />
            }
            <Label sidebar={sidebar} active={active} own={"heart"}>Notifications</Label>
          </NotifListItem>

          <StyledLink to={"/direct"}>
            <ListItem mobile={true} sidebar={sidebar} own={"message"} onClick={() => handleClick("message")}>
              {active === "message" 
                ? <IoPaperPlaneSharp title="direct messages" />
                : <IoPaperPlaneOutline title="direct messages" />
              }
              <Label sidebar={sidebar} active={active} own={"message"}>Messages</Label>
            </ListItem>
          </StyledLink>

          <StyledLink to={user !== null ? "/profile/" + user.displayName : "/"}>
            <ListItem mobile={true} sidebar={sidebar} own="profile" onClick={() => handleClick("profile")}>
              <User active={active === "profile"} url={userData ? userData.pfp : ""} />
              <Label sidebar={sidebar} active={active} own={"profile"}>Profile</Label>
            </ListItem>
          </StyledLink>
        </Icons>

        <ListItem as="div" sidebar={sidebar} own={"burger"}>
          <BsIcons.BsList title="burger" />
          <Label sidebar={sidebar} active={active} own={"burger"}>More</Label>
        </ListItem>
      </Navbar>
      {postForm && <PostForm closeForm={closePostForm} user={userData} />}
    </IconContext.Provider>
  );
};

Nav.propTypes = {
  user: PropTypes.object,
  sidebar: PropTypes.bool.isRequired,
  setSidebar: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired,
  userData: PropTypes.object, 
};

// Since Navbar is removed from the flow of the document
// I needed this to ensure things don't clip out of place
// and for better consistency when using padding-margin on main element.
const Space = styled.div`
  flex-shrink: 0;
  width: ${({sidebar}) => sidebar ? '80px' : '220px'};

  @media(max-width: 1100px) {
    width: 80px;
  }

  @media(max-width: 750px) {
    display: none;
  }
`;

const Navbar = styled.nav`
  position: fixed;
  z-index: 3;
  top: 0;
  left: 0;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: ${({sidebar}) => sidebar ? 'center' : 'flex-start'};

  width: ${({sidebar}) => sidebar ? '80px' : '220px'};
  height: 100vh;
  padding: 12px 8px;

  background-color: #fff;
  border-right: 1px solid #dfdfdf;

  @media(max-width: 1100px) {
    width: 80px;
    align-items: center;
  }

  @media(max-width: 750px) {
    height: 50px;
    width: 100%;
    padding: 0;

    flex-direction: row;
    justify-content: space-around;

    border-right: none;
    border-top: 1px solid #dfdfdf;

    bottom: 0;
    top: auto;
    left: auto;
  }

  transition: 0.3s ease-out;
`;

const LogoContainer = styled.div`
  ${flexRowCenter}
  height: 100px;
  width: 100%;
  padding: 0 16px;
  justify-content: flex-start;

  @media(max-width: 750px) {
    display: none;
  }

  @media only screen and (max-height: 550px) and (orientation: landscape) {
    display: ${({mobile}) => mobile ? 'flex' : 'none'};
  }
`;

const ExtendedLogo = styled.img`
  display: ${({sidebar}) => sidebar ? 'none' : 'block'};
  height: 40px;
  width: 110px;

  @media(max-width: 1100px) {
    display: none;
  }
`;

const MinifiedLogo = styled(BsIcons.BsInstagram)`
  display: ${({sidebar}) => sidebar ? 'block' : 'none'};

  @media(max-width: 1100px) {
    display: block;
  }
`;

const User = styled.div`
  background-image: url(${({ url }) => url});
  background-position: center;
  background-size: cover;
  width: 24px;
  height: 24px;
  border-radius: 100%;
  transition: 0.3s ease-out;

  ${({ active }) => active 
  ? 'border: 3px solid #262626; height: 27px; width: 27px;'
  : 'border: 1px solid #dfdfdf'});
`;

const Icons = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 25px;
  height: 70%;
  background-color: #fff;

  @media(max-width: 750px) {
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    height: 100%;
    gap: 0;
  }

  @media only screen and (max-height: 550px) and (orientation: landscape) {
    height: 100%;
    justify-content: space-around;
  }
`;

const ListItem = styled.li`
  cursor: pointer;
  position: relative;
  transition: 0.15s ease-out;
  min-height: 40px;
  min-width: 40px;
  ${flexRowCenter}
  justify-content: ${({sidebar}) => sidebar ? 'center' : 'flex-start'};
  border-radius: 50%;
  &:hover {
    transform: scale(1.1);
  }
  ${({ active, own }) => active === own 
  ? "border: 1px solid #dfdfdf;" 
  : ""}
  padding: ${({sidebar}) => sidebar ? '0' : '0 12px'};

  @media(max-width: 1100px) {
    justify-content: center;
    padding: 0;
    border: none;
  }

  @media(max-width: 750px) {
    display: ${({mobile}) => mobile ? 'flex' : 'none'};
    height: 100%;
  }

  @media only screen and (max-height: 550px) and (orientation: landscape) {
    display: ${({mobile}) => mobile ? 'flex' : 'none'};
  }
`;

const Label = styled.span`
  margin-left: 16px;
  font-size: 1rem;
  ${({own, active}) => own === active ? 'font-weight: bold;' : ''}
  ${({sidebar}) => sidebar ? 'display: none;' : 'display: inline;'}
  animation-name: ${fadeIn};
  animation-duration: 1s;
  transition-timing-function: ease-out;
  cursor: pointer;
  

  @media(max-width: 1100px) {
    display: none;
  }
`;

const NotifListItem = styled(ListItem)`
  &::after {
    ${({ notif }) => (notif.length > 0 && !notif[0].seen ? "content: '';" : "")}
    position: absolute;
    top: 6px;
    left: ${({ sidebar }) => (sidebar ? "24px" : "28px")};
    border: 2px solid #fff;
    border-radius: 100%;
    height: 10px;
    width: 10px;

    background-color: #fe004b;
  }

  @media(max-width: 1100px) {
    &::after {
      top: 6px;
      left: 24px;
    }
  }
`;

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
`;

export default Nav;
