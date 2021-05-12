import React, { Component } from 'react'
import Container from 'react-bootstrap/Container';
import { ExamCard } from '../components'

import api from '../api'

import styled from 'styled-components'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`

class GotoSAP extends Component {
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
            this is SAP
          </Container>

        )
    }
}

export default GotoSAP
