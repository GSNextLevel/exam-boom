import React, { Component } from 'react';
import styled from 'styled-components';

import TempLoginMenu from './TempLoginMenu';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';

import logo from '../logo.svg';

const Container = styled.div.attrs({
  className: 'container',
})``;

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      leftCoin: localStorage.getItem("coin")
    }
  }
  

  handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("user_id");
    alert("로그아웃 성공!");
    window.location= "/";
  }

  componentDidUpdate() {
      console.log("$$$$$$$$$$$$$$$$$ update!!!!!");
      this.state.leftCoin = localStorage.getItem("coin");
  }

  render() {
    const logoStyle = {
      marginRight: '8px',
    };
    const isToken = localStorage.getItem("userToken");
    // const leftCoin = localStorage.getItem("coin");
    const { leftCoin } = this.state;

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
              {/* <TempLoginMenu /> */}
              {isToken ?
                <Nav.Link href="">잔여코인 : {leftCoin}</Nav.Link>
                :
                <a />
              }
              
            </Nav>

            <Nav>
              <Nav.Link href="/addExam">문제등록</Nav.Link>
              <Nav.Link href="/replies">최근활동</Nav.Link>
              <Nav.Link href="/leaderBoard">랭킹</Nav.Link>
              <NavDropdown title="내 정보" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/user/history">제출이력</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/user/setting">개인설정</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/user/exam">나만의 문제</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="실험실" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/updateLog">버전기록</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/license">License</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/voc">건의사항</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/replies">최근활동</NavDropdown.Item>
                
                <NavDropdown.Item href="/docs">문서</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              {isToken?
                <span>
                  {/* <NavDropdown.Item href="/mypage">내 정보</NavDropdown.Item> */}
                  <Button onClick={this.handleLogout} variant="outline-secondary">로그아웃</Button>
                </span>
                :
                <Button href="/login" variant="outline-primary">로그인</Button>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default NavBar;
