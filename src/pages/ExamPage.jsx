import React, { Component } from 'react'
import { createContext, useReducer } from "react"
import { useAsync } from 'react-async';

import Container from 'react-bootstrap/Container';
import { ExamCard, ExamPagination, ExamToolbar, ExamResultTable, ExamReply, LoginAlertModal } from '../components'

import { GotoADP, GotoSAP } from '../pages'

import { NotFound } from '../pages'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";

import api from '../api'

import styled from 'styled-components'
import { popperGenerator } from '@popperjs/core';




const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`

class ExamPage extends Component {

    constructor(props) {
        super(props);



        console.log(props);
        this.state = {
          examNum: props.match.params.id,
          question: "",
          choices: [],
          answer: [],
          choiceType: "",
          type: props.match.params.type,
          isRandom: props.isRandom || false
        }
        // this.state = {
        //     movies: [],
        //     columns: [],
        //     isLoading: false,
        // }



        console.log(this.state.examNum);
    }




    render() {

        const { params } = this.props.match;

        const { examNum } = this.state;

        const isValidExamNum = isNaN(examNum) ? false : true;

        // console.log("examNum : ", examNum, isValidExamNum)


        // const { type } = this.state;

        // const { question, choices, answer, choiceType } = this.state;

        const myVisible1 = true;
        const myVisible2 = true;


        return (



          <React.Fragment>
          {
            (isValidExamNum && examNum > 0) &&
                  <Container>
                      <ExamToolbar value={this.props} />

                      <ExamCard value={this.props} />

                      <ExamReply value={this.props} />
                      <ExamPagination value={this.props} />
                      <LoginAlertModal />
                  </Container>

          }

          {
            (!isValidExamNum || examNum <= 0) &&
              <Container>
                <ExamToolbar value={this.props} />
                <NotFound />
              </Container>
          }
          </React.Fragment>


        )
    }
}

export default ExamPage
