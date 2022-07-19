import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { randomQuestionNum } from '../utils/random';
import api2 from '../api'

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
    this.getPreviousExams = this.getPreviousExams.bind(this)
  }

  

  async getPreviousExams(event) {
    const { type } = this.state;
    let examList = []
    const getPreviousExam =  await api2.getPreviousExamByType(type).then(exam => {
      console.log(exam)
      exam = exam.data
      exam.forEach((li, i) => {
        examList.push(li.examIdx)
      })
    })

    for (let index = examList.length - 1; index > 0; index--) {
      // 무작위 index 값을 만든다. (0 이상의 배열 길이 값)
      const randomPosition = Math.floor(Math.random() * (index + 1));
  
      // 임시로 원본 값을 저장하고, randomPosition을 사용해 배열 요소를 섞는다.
      const temporary = examList[index];
      examList[index] = examList[randomPosition];
      examList[randomPosition] = temporary;
    }
    
    localStorage.setItem('random2', 'true');
    localStorage.setItem('random2_list', examList);
    console.log(examList)
    window.location.href = type + "/random2/" + examList[0].toString();
    
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
                  <Button href={movePage}
                   variant="primary"
                   onClick={() => {localStorage.setItem('random', 'false');}}
                  >
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
                    onClick={() => {localStorage.setItem('random', 'true');}}
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
                  <Card.Header as="h5">기출랜덤</Card.Header>
                  <Card.Body>
                    <Card.Text>기출문제에서 랜덤으로 풀어볼래요</Card.Text>
                    <Button 
                      variant="primary"
                      // onClick={() => {localStorage.setItem('random2', 'true');}}
                      onClick={this.getPreviousExams}
                      // href={
                      //   type + '/random2/' + randomQuestionNum(type).toString()
                      // }
                    >
                      이동
                    </Button>
                  </Card.Body>
                </Card>
            </Col>
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
