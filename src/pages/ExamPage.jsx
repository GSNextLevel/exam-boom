import React, { Component, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import {
  ExamCard,
  ExamPagination,
  ExamToolbar,
  ExamReply,
  LoginAlertModal,
  CoinModal,
  MoneyAlertModal,
  Memo
} from '../components';

import { NotFound } from '../pages';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import api from '../api';

import styled from 'styled-components';
import { NonceProvider } from 'react-select/dist/react-select.cjs.prod';





const GoogleAdvertise = ({
  className = "adsbygoogle",
  client = "ca-pub-6313193260834584",
  slot = "6499031333",
  format = "fluid",
  responsive = "true",
  layoutKey = "+2t+rl+2h-1m-4u"
}) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      console.log("Advertise is pushed");
    } catch (e) {
      if (process.env.NODE_ENV !== "production")
        console.error("AdvertiseError", e);
    }
  }, []);

  if (process.env.NODE_ENV !== "production")
    return (
      <div
        style={{
          background: "#e9e9e9",
          color: "black",
          fontSize: "18px",
          fontWeight: "bold",
          textAlign: "center",
          padding: "16px"
        }}
      >
        광고 표시 영역
      </div>
    );
  return (
    <ins
      className={className}
      style={{
        overflowX: "auto",
        overflowY: "hidden",
        display: "block",
        textAlign: "center"
      }}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={responsive}
      data-ad-layout-key={layoutKey}
    />
  );
};

class ExamPage extends Component {
  constructor(props) {
    super(props);

    
    console.log(props);
    this.state = {
      examNum: props.match.params.id,
      question: '',
      choices: [],
      answer: [],
      choiceType: '',
      type: props.match.params.type,
      isRandom: props.isRandom || false,
      coin: 0,
      
    };
    
    // this.state = {
    //     movies: [],
    //     columns: [],
    //     isLoading: false,
    // }

    console.log(this.state.examNum);
    // console.log(this.state.isRandom)
  }

  

  toggleCoinModal = (val) => {
    this.setState({showCoinModal: true});
  }
  
  

  render() {
    // const { params } = this.props.match;
    const { examNum, showCoinModal } = this.state;
    const isValidExamNum = isNaN(examNum) ? false : true;
    console.log('examNum : ', examNum, isValidExamNum);

    const containerStyle = {
      '@media (min-width: 300px)': {
        color: 'red'
      },
      
    }
   
    return (
      <React.Fragment>
        {isValidExamNum && examNum > 0 && (
          <div >
            <Row>
              <Col sm="0" md="1" lg="1"></Col>
              <Col sm="auto" md="9" lg="9">
                <ExamToolbar value={this.props} />

                <ExamCard value={this.props} toggleCoinModal={this.toggleCoinModal} />

                <ExamReply value={this.props} />
                <ExamPagination value={this.props} />
                <LoginAlertModal />
                <CoinModal showCoinModal={showCoinModal}/>
                <MoneyAlertModal />
              </Col>
              <Col sm md="2" lg="2">
                <Memo value={this.props} />
              </Col>
            </Row>

          </div>
          
        )}
        {/* <div>
          <GoogleAdvertise />
        </div> */}

        {(!isValidExamNum || examNum <= 0) && (
          <Container>
            <ExamToolbar value={this.props} />
            <NotFound />
          </Container>
        )}
      </React.Fragment>
    );
  }
}

export default ExamPage;
