import React, { Component } from 'react'
import styled from 'styled-components'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'

import Cookies from 'universal-cookie';


const Wrapper = styled.a.attrs({
    className: 'navbar-brand',
})``

class TempLoginMenu extends Component {




    constructor(props) {
      super(props);
      const cookies = new Cookies();

      this.state = {

        username: cookies.get('username') || '',
        loginState: '로그인',
        isLogin: false,
        nameHolder: ''
      }
    }

    componentDidMount = async () => {
      if(this.state.username == '') {
        this.setState({loginState: '로그인', isLogin: false, nameHolder: '이름을 입력해주세요'})
      }
      else{
        this.setState({loginState: '로그아웃', isLogin: true, nameHolder: this.state.username})
      }
    }

    changeHandler = (e) => {
      this.setState({username: e.target.value})
    }

    submitLoginHandler = (e) => {
      const cookies = new Cookies();
      e.preventDefault();
      if(!this.state.isLogin) {
        cookies.set('username', this.state.username, {path: '/'})
        this.setState({loginState: '로그아웃', isLogin: true})

      }
      else{
        cookies.remove('username', {path: '/'})
        this.setState({loginState: '로그인', isLogin: false, nameHolder: '이름을 입력해주세요'})
      }
      console.log(this.state.username)
    }


    render() {
      const { loginState, isLogin, nameHolder } = this.state;
        return (
          <Form className="margin-auto" onSubmit={this.submitLoginHandler}>
            <Form.Group as={Row} controlId="formBasicEmail">

              <Col sm="8">
                <Form.Control readOnly={isLogin} onChange={this.changeHandler} type="text" placeholder={nameHolder} />
              </Col>
              <Col sm="4">
                <Button  variant="secondary" type="submit">
                  {loginState}
                </Button>

              </Col>

            </Form.Group>


          </Form>
        )
    }
}

export default TempLoginMenu
