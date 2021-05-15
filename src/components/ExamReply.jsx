import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import api from '../api'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';

import Cookies from 'universal-cookie';

const MyBadge = styled.span`
    padding: 2px 4px;
    font-size: 14px;
    border-radius: 4px;
    color: black;
    font-weight: 400;
    vertical-align: middle;
    background-color: gainsboro;



`

class ExamReply extends Component {
    constructor(props) {
      super(props);

      this.state = {
          replies: [],
          userInputReplyText: "",
          userModeState: false
      }

      // console.log(this.props);

      // console.log(examNum);
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })
        const examNum = this.props.value.match.params.id;

        await api.getExamReplyById("adp", examNum).then(exam => {
          // console.log(exam);
          if(exam.data.Item.reply == undefined) {
            this.setState({
                replies: []
            })
          }
          else{
            this.setState({
                replies: exam.data.Item.reply
            })
          }

        })
    }

    onChangeText(e) {
      // console.log(e.target.value)
      this.setState({userInputReplyText: e.target.value})
    }
    onChangeWriteMode(e) {
      // console.log(e.target.checked)
      this.setState({userModeState: e.target.checked})
    }

    async writeReply() {
      const cookies = new Cookies();

      const examNum = this.props.value.match.params.id;

      console.log(this.state.userInputReplyText, this.state.userModeState)
      const userInputReplyText = this.state.userInputReplyText;
      const userModeState = this.state.userModeState;
      let passUsername = "";
      if(userModeState) {
          passUsername = "익명";
      }
      else{
        const cookieName = cookies.get('username')
        passUsername = cookieName === undefined ? "👨‍💻" : cookieName;
      }
      const payload = {"name": passUsername, "content": userInputReplyText };
      await api.updateExamReplyById("adp", examNum, payload).then(res => {
        // console.log(exam);
        console.log(res)
        let prevReplies = this.state.replies;
        console.log(this.state.replies)
        let mytemp = prevReplies.push(payload);
        console.log(mytemp)
        this.setState({replies: prevReplies})

        // this.setState({replies: [{"name": "dz", "content": "aa"}]})

      })
    }


    render() {
      const { replies } = this.state;
      // console.log(replies);

      const formStyle = {
            alignItems: 'center',
          };
      const replyCol = {
        textAlign: 'center',
        margin: 'auto',
        borderRight: '1px dotted grey'
      }

      return (
        <Container>
          <h4> 토론장 </h4>
          <Form>
            <Row style={formStyle}>
                <Col md="9">

                    <Form.Group controlId="exampleForm.ControlTextarea1">
                      <Form.Control as="textarea" rows={3} onChange={this.onChangeText.bind(this)} />
                    </Form.Group>

                </Col>
                <Col md="1">
                  <Form.Group id="formGridCheckbox">
                    <Form.Check type="checkbox" label="익명" onChange={this.onChangeWriteMode.bind(this)}/>
                  </Form.Group>
                </Col>
                <Col md="2">
                  <Button variant="primary" onClick={this.writeReply.bind(this)}>
                    작성
                  </Button>
                </Col>

            </Row>
          </Form>

          <ListGroup className="mt-4 mb-4 pb-4">
            {
              replies.length > 0 &&
              replies.map((data, index) => {

                  return <ListGroup.Item key={index}>
                      <Row>
                        <Col style={replyCol} md="2">
                          <MyBadge  variant="success">{data.name}</MyBadge>
                        </Col>
                        <Col md="10">
                          {data.content}
                        </Col>
                      </Row>
                    </ListGroup.Item>


              })
            }




          </ListGroup>


        </Container>
      );
    }
}


// <Form>
// <div key="radio" className="mb-3">
//   <Form.Check type="radio" id="check-api-radio">
//     <Form.Check.Input type="radio" isValid />
//     <Form.Check.Label>asdasd</Form.Check.Label>
//     <Form.Control.Feedback type="valid">You did it!</Form.Control.Feedback>
//   </Form.Check>
// </div>
//
// </Form>




export default ExamReply
