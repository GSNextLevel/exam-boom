import React, { Component } from 'react'
import Container from 'react-bootstrap/Container';
import { ExamCard } from '../components'

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
            <ExamCard value={this.props} />
          </Container>

        )
    }
}

export default ExamPage
