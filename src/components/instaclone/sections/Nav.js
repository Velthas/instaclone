import { useState } from 'react';
import { useUser } from '../../../utils/hooks';
import { Link } from 'react-router-dom';
import PostForm from '../posts/PostForm';
import styled from 'styled-components';
import * as BsIcons from "react-icons/bs";
import { IconContext } from 'react-icons';
import { flexRowCenter } from '../../../styles/style';
import Sidebar from '../sidebar/Sidebar';


const Nav = ({user}) => {
  const [sidebar, setSidebar] = useState(false);
  const [userdata, getUserData] = useUser(user ? user.displayName : null); 
  const [postForm, setPostForm] = useState(false);
  const [active, setActive] = useState('home');

  const isActive = (icon) => icon === active;

  const handleClick = (icon) => {
    if(sidebar) setSidebar(false)
    setActive(icon)
  };
  
  const openSidebar = (icon) => {
    if(icon === active && sidebar === true) setSidebar(false); // Close sidebar on same icon click
    else {
    handleClick(icon);
    setSidebar(true);
    }
  };

  const closeForm = () => {
    setPostForm(false);
    setActive('');
  };
  
  return (
    <IconContext.Provider value={{ style: {cursor: 'pointer'}, size: 24 }}>
      <Navbar>
        <Sidebar active={sidebar} content={active} setSidebar={setSidebar} />
        <LogoContainer>
          <BsIcons.BsInstagram alt='instalogo'/>
        </LogoContainer>
        <Icons>
          <StyledLink to={'/'}>
            <ListItem>
              { active === 'home' 
                ? <BsIcons.BsHouseDoorFill />
                : <BsIcons.BsHouseDoor onClick={() => handleClick('home')} alt="home" /> }
            </ListItem>
          </StyledLink>
          <ListItem>
            <BsIcons.BsSearch alt='search' onClick={() => openSidebar('search')} />
          </ListItem>
          <ListItem>
            { active === 'add' 
                ? <BsIcons.BsPlusCircleFill alt="add"/>
                : <BsIcons.BsPlusCircle alt="add" onClick={() => {
                    handleClick('add')
                    setPostForm(true) }} 
                  /> 
            }
          </ListItem>
          <ListItem onClick={() => openSidebar('heart')}>
            { active === 'heart' 
            ? <BsIcons.BsHeartFill alt='heart'/>
            : <BsIcons.BsHeart alt='heart' />}
          </ListItem>
          <StyledLink to={user !== null ? '/profile/' + user.displayName : '/'}> 
            <ListItem onClick={() => handleClick('') }> 
                <User url={userdata ? userdata.pfp : ''} />
            </ListItem>
          </StyledLink>
        </Icons>
        <BsIcons.BsList alt="burger" />
      </Navbar>
      {postForm && <PostForm closeForm={closeForm} />}
    </IconContext.Provider>
  )
};

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
  background-image: url(${({url}) => url});
  background-position: center;
  background-size: cover;
  width: 24px;
  height: 24px;
  border-radius: 100%;
  border: 1px solid #dfdfdf
`;

const Icons = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 25px;
  height: 70%;
`

const ListItem = styled.li`
  transition: 0.15s ease-out;
  &:hover{
    transform: scale(1.1);
  }
`

const StyledLink = styled(Link)`
  color: black;
`

export default Nav;