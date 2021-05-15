import React, { Component } from 'react'
import { createContext, useReducer } from "react"
import { useAsync } from 'react-async';

import Container from 'react-bootstrap/Container';
import { ExamCard, ExamPagenation, ExamToolbar, ExamResultTable, ExamReply, LoginAlertModal } from '../components'

import { GotoADP, GotoSAP } from '../pages'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";

import api from '../api'

import styled from 'styled-components'




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
          choiceType: ""
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

        // const { question, choices, answer, choiceType } = this.state;



        return (
            <Container>
              <ExamToolbar value={this.props} />

              <ExamCard value={this.props} />

              <ExamReply value={this.props} />

              <LoginAlertModal />
              {/* <ExamPagenation /> */}
            </Container>
        )
    }
}

export default ExamPage
