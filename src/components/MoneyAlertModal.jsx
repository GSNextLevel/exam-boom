import React, { Component } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Cookies from 'universal-cookie';

import seungQRcode1 from '../image/seungQRcode1.png';
import seungQRcode2 from '../image/seungQRcode2.png';
import seungQRcode3 from '../image/seungQRcode3.png';
import { set } from 'react-ga';


class MoneyAlertModal extends Component {
    constructor(props) {
      super(props);
      const cookies = new Cookies();

      this.state = {
        modalShow: cookies.get('pay_modal') === undefined ? true : false,
        // modalShow: false,
        // modalShow: true,
        moneyBtn1: "none",
        moneyBtn2: "true",
        moneyBtn3: "none"
      }

    }

    componentDidMount = async () => {

    }


    handleClose() {
      const cookies = new Cookies();
      let expireDate = new Date();
      expireDate.setTime(expireDate.getTime() + 3*60*60*1000 );
      // expireDate.setDate(expireDate.getDate() + 1)
      cookies.set('pay_modal', true, {expires: expireDate})
      this.setState({modalShow: false})
    }

    handleShow() {
      this.setState({modalShow: false})
    }

    changeMoney(id) {
        console.log(id)
        if(id == 1){
          this.setState({moneyBtn1: true, moneyBtn2: "none", moneyBtn3: "none"});
        } 
        else if(id == 2) {
          this.setState({moneyBtn1: "none", moneyBtn2: true, moneyBtn3: "none"});
        }
        else{
          this.setState({moneyBtn1: "none", moneyBtn2: "none", moneyBtn3: true});
        }
    }

    render() {

      const { modalShow, moneyBtn1, moneyBtn2, moneyBtn3 } = this.state;

      return (

        <Modal show={modalShow} onHide={this.handleClose.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>기부 me Money</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          
            개발팀이 손익분기점을 넘을때까지 유료화정책을 유지하기로 결정했습니다. 양질의 문제와 지속적인 업데이트를 위해 소액을 기부해주시면 감사하겠습니다.
            <br></br>
            <p style={{textAlign: "center"}}>
              <Button onClick={this.changeMoney.bind(this, "1")}variant="danger">1000₩</Button>{' '}
              <Button onClick={this.changeMoney.bind(this, "2")}variant="warning">2000₩</Button>{' '}
              <Button onClick={this.changeMoney.bind(this, "3")} variant="success">3000₩</Button>{' '}
            </p>
            
            <p style={{textAlign: "center"}}>
              <Image id="money-1" style={{display: moneyBtn1}} src={seungQRcode1} width="200px" height="200px"></Image>
              <Image id="money-2" style={{display: moneyBtn2}} src={seungQRcode2}  width="200px" height="200px"></Image>
              <Image id="money-3" style={{display: moneyBtn3}} src={seungQRcode3} width="200px" height="200px"></Image>
            </p>
            
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose.bind(this)}>
              취소
            </Button>
            <Button variant="primary" onClick={this.handleClose.bind(this)}>
              다음에 하기
            </Button>
          </Modal.Footer>
        </Modal>
      );
    }
}




export default MoneyAlertModal
