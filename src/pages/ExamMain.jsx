import React, { Component } from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
// import CardGroup from 'react-bootstrap/CardGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { ExamCard } from '../components';

import devopsImg from '../image/adp2.jpg';
import sapImg from '../image/sap2.jpg';
import aws_ai_Img from '../image/aws_ai.png';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 40px 40px 40px 40px;
`;

class ExamMain extends Component {
  constructor(props) {
    super(props);
    
  }

  render() {
    return (
      <Container>
        <Wrapper>
          <Row className="">
            <Col md={{span: 6}} className="justify-content-center text-center mb-2">
              <Card style={{ minWidth: '14rem', textAlign: 'center' }}>
                <Card.Img variant="top" src={devopsImg} />
                <Card.Body>
                  <Card.Title>AWS</Card.Title>
                  <Card.Text>DevOps Pro</Card.Text>
                  <Button variant="primary" href="/exam/adp">
                    바로가기
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            <Col md={{span: 6}} className="justify-content-center text-center mb-2">
              <Card style={{ minWidth: '14rem', textAlign: 'center' }}>
                <Card.Img variant="top" src={sapImg} />
                <Card.Body>
                  <Card.Title>AWS</Card.Title>
                  <Card.Text>SA Pro</Card.Text>
                  <Button variant="primary" href="/exam/sap">
                    바로가기
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={{span: 6}} className="justify-content-center text-center mb-2">
              <Card style={{ minWidth: '14rem', textAlign: 'center' }}>
                <Card.Img variant="top" src={aws_ai_Img} />
                <Card.Body>
                  <Card.Title>AWS</Card.Title>
                  <Card.Text>Machine Learning Speacialty</Card.Text>
                  <Button variant="primary" href="/exam/mls">
                    바로가기
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Wrapper>
      </Container>
    );
  }
}

export default ExamMain;
