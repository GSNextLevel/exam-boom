import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Link } from 'react-router-dom'

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Card from 'react-bootstrap/Card';
// import CardGroup from 'react-bootstrap/CardGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { ExamCard } from '../components'
import { GotoADP, GotoSAP } from '../pages'

import api from '../api'

import devopsImg from '../image/adp2.jpg'
import sapImg from '../image/sap2.jpg'
import styled from 'styled-components'

const Wrapper = styled.div`
    padding: 40px 40px 40px 40px;
`
// amplify will be added
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

            <Row className="">
              <Col className="justify-content-center text-center mb-2">
                <Card style={{ minWidth: '14rem', textAlign: 'center' }}>
                  <Card.Img variant="top" src={devopsImg} />
                  <Card.Body>
                    <Card.Title>AWS</Card.Title>
                    <Card.Text>
                      DevOps Pro
                    </Card.Text>
                    <Button variant="primary" href="/exam/adp">바로가기</Button>
                  </Card.Body>
                </Card>
              </Col>

              <Col className="justify-content-center text-center mb-2" >
                <Card style={{ minWidth: '14rem', textAlign: 'center' }}>
                  <Card.Img variant="top" src={sapImg} />
                  <Card.Body>
                    <Card.Title>AWS</Card.Title>
                    <Card.Text>
                      SA Pro
                    </Card.Text>
                    <Button variant="primary" href="/exam/sap">바로가기</Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>



{ /*           <ButtonToolbar
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
            */
}




            </Wrapper>
          </Container>

        )
    }
}

export default ExamMain
