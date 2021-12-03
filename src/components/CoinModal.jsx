import React, { Component } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Cookies from 'universal-cookie';

class CoinModal extends Component {
    constructor(props) {
      super(props);
      const cookies = new Cookies();

      this.state = {
        showCoinModal: null
      }

    }

    componentDidMount = async () => {
        

    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.showCoinModal != prevProps.showCoinModal) {
            // console.log("coin 업뎃");
            this.setState({...this.state, showCoinModal: this.props.showCoinModal});
        }

        
    }


    handleClose() {
      this.setState({showCoinModal: false})
    }

    handleShow() {
      this.setState({showCoinModal: false})
    }

    render() {

      const { showCoinModal } = this.state;
        // let modalShow = this.props.showCoinModal;
        // console.log(this.props)

      return (

        <Modal show={showCoinModal} onHide={this.handleClose.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>코인이 부족합니다</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            댓글을 달거나 메모를 공유하여 코인을 획득하실 수 있습니다. 
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




export default CoinModal;
