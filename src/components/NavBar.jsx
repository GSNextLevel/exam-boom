import React, { Component } from 'react';
import styled from 'styled-components';

import TempLoginMenu from './TempLoginMenu';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

import logo from '../logo.svg';

const Container = styled.div.attrs({
  className: 'container',
})``;

class NavBar extends Component {
  render() {
    const logoStyle = {
      marginRight: '8px',
    };

    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">
            <img
              src={logo}
              width="50"
              height="50"
              alt="exam boom"
              style={logoStyle}
            />
            자격증 뿌시기
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-between"
          >
            <Nav className="mr-auto">
              <TempLoginMenu />
            </Nav>

            <Nav>
              <Nav.Link href="/leaderBoard">랭킹</Nav.Link>
              <NavDropdown title="내 정보" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/history">제출이력</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/setting">개인설정</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="실험실" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/updateLog">버전기록</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/voc">건의사항</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/replies">최근활동</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default NavBar;
