import React, { Component } from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
// import CardGroup from 'react-bootstrap/CardGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';

import { ExamCard } from '../components';

import devopsImg from '../image/adp2.jpg';
import sapImg from '../image/sap2.jpg';
import gapImg from '../image/gap.png';
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

    const imgStyle = {
      'padding': '8px'
    }

    return (
      <Container>
        <Wrapper>
          <Alert variant="success">
            서버리스를 걷어내고 내부로직을 변경하여 새롭게 단장한 버전2 입니다.
            <br/>
            이번 업데이트에서 댓글과 사이트 활성화를 위해 Coin 개념이 추가되었습니다. 

          </Alert>
          <Alert variant="warning">
            기본 회원가입 시 100코인이 지급되며 한문제 조회 시 1코인이 차감됩니다.
            <br/>
            댓글 작성 시 10코인이 지급되며 매주 우수 댓글에 10~50코인이 추가로 지급됩니다.
            <br/>
            코인 지급과 차감 항목은 차후 개선될 예정입니다.
            
          </Alert>

          <Alert variant="danger">
            일부 기능에 아직 버그가 있을 수 있습니다... 차차 개선할 예정입니다.
            
          </Alert>

          <Row className="">
            <Col md={{span: 4}} className="justify-content-center text-center mb-2">
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

            <Col md={{span: 4}} className="justify-content-center text-center mb-2">
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

            <Col md={{span: 4}} className="justify-content-center text-center mb-2">
              <Card style={{ minWidth: '14rem', textAlign: 'center' }}>
                <Card.Img style={imgStyle} variant="top" src={gapImg} />
                <Card.Body>
                  <Card.Title>GCP</Card.Title>
                  <Card.Text>DevOps Engineer</Card.Text>
                  <Button variant="primary" href="/exam/gcp-dev">
                    바로가기
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          {/* <Row>
            <Col md={{span: 4}} className="justify-content-center text-center mb-2">
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
          </Row> */}
        </Wrapper>
      </Container>
    );
  }
}

export default ExamMain;
