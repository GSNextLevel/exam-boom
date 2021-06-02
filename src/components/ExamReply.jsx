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
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';


import { FaTrash } from 'react-icons/fa'
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

      const cookies = new Cookies();

      this.autoUrlLink = this.autoUrlLink.bind(this);

      this.state = {
          replies: [],
          userInputReplyText: "",
          userInputDefaultText: "aa",
          userModeState: false,
          // replyCnt: 0,
          username:  cookies.get('username') === undefined ? "익명" : cookies.get('username')
      }

      // console.log(this.props);

      // console.log(examNum);
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })
        const examNum = this.props.value.match.params.id;
        const type = this.props.value.match.params.type;

        await api.getExamReplyById(type, examNum).then(exam => {
          console.log("Reply ", exam);
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

    autoUrlLink(text) {
      const regURL =  /(((http(s)?:\/\/)\S+(\.[^(\n|\t|\s,)]+)+)|((http(s)?:\/\/)?(([a-zA-z\-_]+[0-9]*)|([0-9]*[a-zA-z\-_]+)){2,}(\.[^(\n|\t|\s,)]+)+))+/gi; 
      const replaceFunc = function(url){
        return '<a href="' + url + '" target="_blank">' + url + '</a>'
      };
      const replacedText = text.replace(regURL, replaceFunc);
      return <div dangerouslySetInnerHTML={ {__html: replacedText} }></div>
    }

    async writeReply() {
      const cookies = new Cookies();

      const examNum = this.props.value.match.params.id;
      const type = this.props.value.match.params.type;

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
      await api.updateExamReplyById(type, examNum, payload).then(res => {
        // console.log(exam);
        console.log(res)
        let prevReplies = this.state.replies;
        console.log(this.state.replies)
        let mytemp = prevReplies.push(payload);
        console.log(mytemp)
        this.setState({replies: prevReplies})

        this.setState({userInputReplyText: ""});
        // this.setState({replies: [{"name": "dz", "content": "aa"}]})

      })
    }

    async deleteReply(username, id) {

      console.log("delete ",id)
      const examNum = this.props.value.match.params.id;
      const type = this.props.value.match.params.type;



      await api.deleteExamReplyById(type, examNum, username, id).then(res => {
        // console.log(exam);
        console.log(res)

        let prevReplies = this.state.replies;
        prevReplies.splice(id, 1);
        this.setState({replies: prevReplies})

      })
    }

    render() {
      const { replies, userInputDefaultText,
        userInputReplyText, username } = this.state;
      // console.log(replies);

      const formStyle = {
            alignItems: 'center',
          };
      const replyCol = {
        textAlign: 'center',
        margin: 'auto',
        borderRight: '1px dotted grey'
      }

      const replyDiv = {
        overflowWrap: 'break-word'
      }
      const replyCountText = {
        fontSize: '14px'
      }

      return (
        <Container>
          <details>
            <summary>

                토론장  <span style={replyCountText}>({replies.length}개의 댓글)</span>

            </summary>

            <Form>
              <Row style={formStyle}>
                  <Col md="9">

                      <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Control value={userInputReplyText} as="textarea" rows={3} onChange={this.onChangeText.bind(this)} />
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
                    let tootipKey = "key-" + index;
                    return <ListGroup.Item key={index}>
                        <Row>
                          <Col style={replyCol} md="2">

                            <OverlayTrigger
                              key={tootipKey}
                              placement='left'
                              overlay={
                                <Tooltip id="tooltip-bottom1">
                                  {new Date(parseInt(data.createdAt)).toLocaleString()}
                                </Tooltip>
                              }
                            >
                              <MyBadge  variant="success">{data.name}</MyBadge>

                            </OverlayTrigger>

                          </Col>
                          <Col style={replyDiv} md="9">
                            {this.autoUrlLink(data.content)}
                          </Col>
                          <Col style={replyDiv} md="1">

                          {
                            data.name == username &&
                              <Button variant="light" onClick={() => this.deleteReply(data.name, index)} size="sm"> <FaTrash /></Button>
                          }


                          </Col>
                        </Row>
                      </ListGroup.Item>


                })
              }




            </ListGroup>

          </details>
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
