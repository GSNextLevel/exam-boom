import React, { Component } from 'react';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import UpdateLogMarkdown from '../UpdateLogFile.md';
import ReactMarkdown from 'react-markdown';

import { render } from 'react-dom';

import awsImg from '../image/aws.png';
import gcpImg from '../image/gcp.png';
import ncpImg from '../image/ncp.jpeg';

class Docs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      markdown: '',
    };
  }

  componentWillMount() {
    fetch(UpdateLogMarkdown)
      .then((res) => res.text())
      .then((text) => this.setState({ markdown: text }));
  }

  render() {
    const { markdown } = this.state;
    console.log(markdown);
    const cardImgStyle = {
        height: '400px',
        objectFit: 'contain',
        padding: '10px'
    }
    return (
      <Container>
          <Row className="">


            <Col className="justify-content-center text-center mb-2">
              <Card style={{ minWidth: '14rem', textAlign: 'center' }}>
                <Card.Img variant="top" src={gcpImg} style={cardImgStyle} />
                <Card.Body>
                  <Card.Title>GCP</Card.Title>
                  <Card.Text>도움이 필요합니다</Card.Text>
                  <Button disabled variant="primary" href="/exam/sap">
                    바로가기
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            <Col className="justify-content-center text-center mb-2">
              <Card style={{ minWidth: '14rem', textAlign: 'center' }}>
                <Card.Img variant="top" src={awsImg} style={cardImgStyle} />
                <Card.Body>
                  <Card.Title>AWS</Card.Title>
                  <Card.Text>👏</Card.Text>
                  <Button variant="primary" href="/docs/aws">
                    바로가기
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            <Col className="justify-content-center text-center mb-2">
              <Card style={{ minWidth: '14rem', textAlign: 'center' }}>
                <Card.Img variant="top" src={ncpImg} style={cardImgStyle} />
                <Card.Body>
                  <Card.Title>NCP</Card.Title>
                  <Card.Text>ㅠㅠ</Card.Text>
                  <Button disabled variant="primary" href="/exam/adp">
                    바로가기
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
      </Container>
    );
  }
}

export default Docs;
