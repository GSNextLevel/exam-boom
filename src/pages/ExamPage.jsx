import React, { Component } from 'react'
import { createContext, useReducer } from "react"

import Container from 'react-bootstrap/Container';
import { ExamCard, ExamPagenation, ExamToolbar, ExamResultTable } from '../components'

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
        // this.state = {
        //     movies: [],
        //     columns: [],
        //     isLoading: false,
        // }

    }


    render() {

        const { params } = this.props.match;

        return (
            <Container>
              <ExamToolbar value={this.props} />
              <ExamResultTable />
              <ExamCard value={this.props} />

              {/* <ExamPagenation /> */}
            </Container>
        )
    }
}

export default ExamPage
