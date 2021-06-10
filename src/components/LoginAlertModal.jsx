import React, { Component } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Cookies from 'universal-cookie';

class LoginAlertModal extends Component {
    constructor(props) {
      super(props);
      const cookies = new Cookies();

      this.state = {
        modalShow: cookies.get('username') === undefined ? true : false
      }

    }

    componentDidMount = async () => {

    }


    handleClose() {
      this.setState({modalShow: false})
    }

    handleShow() {
      this.setState({modalShow: false})
    }

    render() {

      const { modalShow } = this.state;

      return (

        <Modal show={modalShow} onHide={this.handleClose.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>로그인을 해주세요</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            비밀번호 필요없이 이름이나 닉네임을 입력하시면 풀었던 문제와 맞춤형 문제를 제공해드립니다.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose.bind(this)}>
              취소
            </Button>
            <Button variant="primary" onClick={this.handleClose.bind(this)}>
              확인
            </Button>
          </Modal.Footer>
        </Modal>
      );
    }
}




export default LoginAlertModal
