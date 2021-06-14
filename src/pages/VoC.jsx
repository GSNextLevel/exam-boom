import React, { Component } from 'react'

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import UpdateLogMarkdown from '../UpdateLogFile.md';


import {render} from 'react-dom'
import api from '../api'

class Voc extends Component {

  constructor(props) {
    super(props);


    this.state = {
        vocText: ''
    }
  }

  onChangeText(e) {
    // console.log(e.target.value)
    this.setState({vocText: e.target.value})
  }
  async onSubmit() {
    console.log(this.state.vocText)
    const sendMsg = { "text": this.state.vocText};
    await api.slackSendVoC(sendMsg).then(result => {
      console.log("result ", result);

      this.setState({vocText: ""})
    })

  }

  componentWillMount() {

  }


  render() {

    const { vocText } = this.state;

    return (
      <Container >
        <Row className="mt-4">
          <Col md={12}>
            건의사항을 자유롭게 적어주세요 <br/> 해당 내용은 <b>슬랙</b>을 통해 관리자가 확인합니다.
          </Col>
          <Col md={10}>
            <Form >
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">

                <Form.Control value={vocText} as="textarea" rows={3} onChange={this.onChangeText.bind(this)}/>
              </Form.Group>
            </Form>
          </Col>

          <Col md={2} className="text-center m-auto">
            <Button variant="primary" onClick={this.onSubmit.bind(this)}>
              제출
            </Button>
          </Col>
        </Row>



      </Container>



    )

  }
}

export default Voc
