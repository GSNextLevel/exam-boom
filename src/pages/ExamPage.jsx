import React, { Component } from 'react';

import Container from 'react-bootstrap/Container';
import {
  ExamCard,
  ExamPagination,
  ExamToolbar,
  ExamReply,
  LoginAlertModal,
  CoinModal
} from '../components';

import { NotFound } from '../pages';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import api from '../api';

import styled from 'styled-components';

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
  }

  

  toggleCoinModal = (val) => {
    this.setState({showCoinModal: true});
  }
  

  render() {
    // const { params } = this.props.match;
    const { examNum, showCoinModal } = this.state;
    const isValidExamNum = isNaN(examNum) ? false : true;
    console.log('examNum : ', examNum, isValidExamNum);

    return (
      <React.Fragment>
        {isValidExamNum && examNum > 0 && (
          <Container>
            <ExamToolbar value={this.props} />

            <ExamCard value={this.props} toggleCoinModal={this.toggleCoinModal} />

            <ExamReply value={this.props} />
            <ExamPagination value={this.props} />
            <LoginAlertModal />
            <CoinModal showCoinModal={showCoinModal}/>

          </Container>
        )}

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
