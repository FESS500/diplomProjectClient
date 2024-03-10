import React, { useState } from 'react';
import navbar from './../Navbar/Navbar.module.css';
import nav from '../Images/nav.svg'
import phone from '../Images/phone.svg'
import logo from '../Images/logo.png'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

function NavbarPage(props) {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div className={navbar.custom}>
      <Navbar  light>
          <img className={navbar.logo} src={logo} alt="logo" />
          <NavbarBrand  className={navbar.sweet}>
            Sweet Bunny House
          </NavbarBrand>
          <NavbarBrand  className={navbar.city}>
            <img src={nav} alt="nav" className={navbar.imgColor} />
            г.Хабаровск  ул. Рабочий городок д.6
          </NavbarBrand>
          <NavbarBrand  className={navbar.phone}>
          
            <img src={phone} alt="phone" />
            8-999-615-3826
          </NavbarBrand>

          <NavbarToggler onClick={toggleNavbar} className="me-2" />
          <Collapse className={navbar.menu} isOpen={!collapsed} navbar>
          <Nav navbar >
            <NavItem >
                <NavLink href="/" >Главная</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="http://localhost:3000/offer/">
                  Новинки
                </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
                   
        <div className={navbar.MainHeader}>
          <div className={navbar.catalog}>
            Самые вкусные предложения
          </div>
            <div className={navbar.textCake}>
              Пирожные и торты<br />
              от 1700р/кг с доставкой<br />
              по Хабаровску
            </div>
            <div className={navbar.textCold}>
              Приготовим к назначенному сроку<br />                          
            </div>
        </div>
      
      
    </div>
  );
}

export default NavbarPage;
