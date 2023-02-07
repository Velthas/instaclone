import { useState } from "react";
import { useNotifications, useUser } from "../../../utils/hooks";
import { Link } from "react-router-dom";
import PostForm from "../posts/postform/PostForm";
import styled from "styled-components";
import * as BsIcons from "react-icons/bs";
import { IoPaperPlaneOutline, IoPaperPlaneSharp } from "react-icons/io5";
import { IconContext } from "react-icons";
import { flexRowCenter } from "../../../styles/style";
import Sidebar from "../sidebar/Sidebar";
import NotifPopup from "../sidebar/notifications/NotifPopup";
import { signOutCurrentUser } from "../../../firebase/authentication";

const Nav = ({ user, sidebar, setSidebar, active, setActive }) => {
  const [userdata, getUserData] = useUser(user ? user.displayName : null); // Is responsible for user data
  const [notifications, increaseLimit, markAllAsSeen] = useNotifications(user ? user.displayName : null);
  const [postForm, setPostForm] = useState(false); // Regulates new post form display

  const handleClick = (icon) => {
    if (sidebar) setSidebar(false);  // Close the sidebar if it's open
    setActive(icon); // Marks the 'icon' as active
  };

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
      <Navbar>
        <Sidebar
          active={sidebar}
          content={active}
          toggleSidebar={toggleSidebar}
          notifications={notifications}
        />

        <LogoContainer>
          <BsIcons.BsInstagram title="instalogo" />
        </LogoContainer>

        <Icons>
          <StyledLink to={"/"}>
            <ListItem own={'home'} onClick={() => handleClick("home")}>
              {active === "home" 
                ? <BsIcons.BsHouseDoorFill title="home" />
                : <BsIcons.BsHouseDoor title="home" />
              }
            </ListItem>
          </StyledLink>

          <ListItem active={active} own={"search"}>
            <BsIcons.BsSearch title="search" onClick={() => toggleSidebar("search")} />
          </ListItem>

          <ListItem own={"message"} onClick={() => handleClick("message")}>
            <StyledLink to={"/direct"}>
            {active === "message" 
              ? <IoPaperPlaneSharp title="direct messages" />
              : <IoPaperPlaneOutline title="direct messages" />
            }
            </StyledLink>
          </ListItem>

          <ListItem active={active} own={'add'}>
            {active === "add" 
              ? <BsIcons.BsPlusCircleFill title="add" />
              : <BsIcons.BsPlusCircle title="add" onClick={openPostForm} />
            }
          </ListItem>

          <NotifListItem active={active} own="heart" notif={notifications} onClick={() => { markAllAsSeen(toggleSidebar) }}>
            <NotifPopup notifications={notifications ? notifications : []} />
            {active === "heart" 
              ? <BsIcons.BsHeartFill title="heart" />
              : <BsIcons.BsHeart title="heart" />
            }
          </NotifListItem>

          <StyledLink to={user !== null ? "/profile/" + user.displayName : "/"}>
            <ListItem own="profile" onClick={() => handleClick("profile")}>
              <User active={active === "profile"} url={userdata ? userdata.pfp : ""} />
            </ListItem>
          </StyledLink>
        </Icons>

        <BsIcons.BsList title="burger" onClick={() => signOutCurrentUser()} />
      </Navbar>
      {postForm && <PostForm closeForm={closePostForm} user={userdata} />}
    </IconContext.Provider>
  );
};

// Since Navbar is removed from the flow of the document
// We need this to ensure things don't clip out of place.
// and for better consistency when using padding-margin on main element.
const Space = styled.div`
  width: 80px;
  flex-shrink: 0;
`;

const Navbar = styled.nav`
  position: fixed;
  z-index: 3;
  top: 0;
  left: 0;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  width: 80px;
  height: 100vh;
  padding: 12px 8px;

  background-color: white;
  border-right: 1px solid #dfdfdf;
`;

const LogoContainer = styled.div`
  ${flexRowCenter}
  height: 20%;
  width: 100%;
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
`;

const ListItem = styled.li`
  position: relative;
  transition: 0.15s ease-out;
  height: 40px;
  width: 40px;
  ${flexRowCenter}
  border-radius: 50%;
  &:hover {
    transform: scale(1.1);
  }
  ${({ active, own }) => active === own 
  ? "border: 1px solid #dfdfdf;" 
  : ""}
`;

const NotifListItem = styled(ListItem)`
  &::after {
    ${({ notif }) => (notif.length > 0 && !notif[0].seen ? "content: '';" : "")}
    position: absolute;
    top: -3px;
    right: -4px;
    border: 2px solid #fff;
    border-radius: 100%;
    height: 10px;
    width: 10px;

    background-color: #fe004b;
  }
`;

const StyledLink = styled(Link)`
  color: black;
`;

export default Nav;
