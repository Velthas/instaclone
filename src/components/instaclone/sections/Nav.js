
import { useState } from 'react';
import styled from 'styled-components';
import home from '../../../assets/icons/home.svg';
import person from '../../../assets/icons/person.svg';
import add from '../../../assets/icons/add.svg';
import heart from '../../../assets/icons/heart.svg';
import fillheart from '../../../assets/icons/fillheart.svg';
import filladd from '../../../assets/icons/filladd.svg';
import fillhome from '../../../assets/icons/fillhome.svg';
import fillperson from '../../../assets/icons/fillperson.svg';
import instalogo from '../../../assets/logo/insta-logo.png';


const Nav = () => {

  const [active, setActive] = useState('')
  const handleClick = (icon) => setActive(icon)
  
  return (
    <Navbar>
      <Logo alt='instalogo' src={instalogo}/>
      <Icons>
        <li>
          <Icon 
            alt='heart' 
            src={active === 'heart' ? fillheart : heart}
            onClick={() => handleClick('heart')}
          />
        </li>
        <li>
          <Icon 
            alt='add'
            src={active === 'add' ? filladd : add}
            onClick={() => handleClick('add')}
          />
        </li>
        <li>
          <Icon alt='profile'
            src={active === 'person' ? fillperson : person}
            onClick={() => handleClick('person')}
          />
        </li>
        <li>
          <Icon 
            alt='home'
            src={active === 'home' ? fillhome : home}
            onClick={() => handleClick('home')}
          />
        </li>
      </Icons>
    </Navbar>
  )
};

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 10vh;
  margin: 0 20px;
`;

const Logo = styled.img`
  height: 70%;
`;

const Icons = styled.ul`
  list-style: none;
  display: flex;
  gap: 15px;
`

const Icon = styled.img`
  height: 30px;
`

export default Nav;