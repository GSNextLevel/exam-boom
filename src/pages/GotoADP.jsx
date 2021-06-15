import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { randomQuestionNum } from '../utils/random';

import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 0 40px 40px 40px;
`;

class GotoADP extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: props.match.params.type,
    };
  }
  render() {
    const { type } = this.state;

    const movePage = type + '/1';

    return (
      <Container>
        <Wrapper>
          <Row className="justify-content-md-center mt-4">
            <Col md="5">
              <Card>
                <Card.Header as="h5">처음부터</Card.Header>
                <Card.Body>
                  <Card.Text>1번부터 차례대로 풀어요.</Card.Text>
                  <Button href={movePage} variant="primary">
                    이동
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md="5">
              <Card>
                <Card.Header as="h5">랜덤으로</Card.Header>
                <Card.Body>
                  <Card.Text>무작위로 문제가 나와요.</Card.Text>
                  <Button
                    variant="primary"
                    href={
                      type + '/random/' + randomQuestionNum(type).toString()
                    }
                  >
                    이동
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="justify-content-md-center mt-4">
            <Col md="5">
              <Card>
                <Card.Header as="h5">틀린거만</Card.Header>
                <Card.Body>
                  <Card.Text>내가 틀린문제만 다시 볼래요.</Card.Text>
                  <Button variant="primary" disabled>
                    이동
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md="5">
              <Card>
                <Card.Header as="h5">고난이도</Card.Header>
                <Card.Body>
                  <Card.Text>정답률이 낮은 문제로 공부할래요.</Card.Text>
                  <Button variant="primary" disabled>
                    이동
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

export default GotoADP;
