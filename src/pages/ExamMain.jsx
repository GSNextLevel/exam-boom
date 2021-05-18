import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Link } from 'react-router-dom'

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

import { ExamCard } from '../components'
import { GotoADP, GotoSAP } from '../pages'

import api from '../api'

import styled from 'styled-components'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`

class ExamMain extends Component {
    constructor(props) {
        super(props)
        // this.state = {
        //     movies: [],
        //     columns: [],
        //     isLoading: false,
        // }
    }

    // componentDidMount = async () => {
    //     this.setState({ isLoading: true })
    //
    //     await api.getAllMovies().then(movies => {
    //         this.setState({
    //             movies: movies.data.data,
    //             isLoading: false,
    //         })
    //     })
    // }

    render() {


        return (
          <Container>
            <Wrapper>


            <ButtonToolbar
              className="justify-content-between mt-5"
              aria-label="Toolbar with Button groups"
            >
              <Button className="mb-4" variant="primary" size="lg" href="/exam/adp">
                DevOps Pro 바로가기
              </Button>

              <Button className="mb-4"  variant="primary" size="lg" href="/exam/sap">
                SA Pro 바로가기
              </Button>
            </ButtonToolbar>





            </Wrapper>
          </Container>

        )
    }
}

export default ExamMain
