import React, { Component } from 'react';
import styled from 'styled-components';

import api from '../api';
import api2 from '../api';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';

import Cookies from 'universal-cookie';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import { FaTrash } from 'react-icons/fa';
const MyBadge = styled.span`
  padding: 2px 4px;
  font-size: 14px;
  border-radius: 4px;
  color: black;
  font-weight: 400;
  vertical-align: middle;
  background-color: gainsboro;
`;

class ExamReply extends Component {
  constructor(props) {
    super(props);

    const cookies = new Cookies();

    this.autoUrlLink = this.autoUrlLink.bind(this);

    this.state = {
      replies: [],
      userInputReplyText: '',
      userModeState: false,
      isWrongAnswer: false,
      // replyCnt: 0,
      user_id: localStorage.getItem('user_id'),
      nickname: localStorage.getItem('nickname'),
      username:
        // cookies.get('username') === undefined
        localStorage.getItem('nickname') === undefined
          ? '익명'
          : localStorage.getItem('nickname'),
      replyOpenStatus:
        cookies.get('replyOpenStatus') === undefined
          ? false
          : cookies.get('replyOpenStatus') == 'false'
          ? false
          : true,
      examNum: this.props.value.match.params.id,
      examType: this.props.value.match.params.type
    };

    // console.log(this.props);

    // console.log(examNum);
  }

  componentDidMount = async () => {
    this.setState({ isLoading: true });
    const examNum = this.props.value.match.params.id;
    const type = this.props.value.match.params.type;

    await api2.getExamReplyById(type, examNum).then((exam) => {
      console.log('Reply ', exam);
      if (exam.data == undefined) {
        this.setState({
          replies: [],
        });
      } else {
        this.setState({
          replies: exam.data,
        });
      }
    });
  };

  onChangeText(e) {
    // console.log(e.target.value)
    this.setState({ userInputReplyText: e.target.value });
  }
  onChangeWriteMode(e) {
    // console.log(e.target.checked)
    this.setState({ userModeState: e.target.checked });
  }

  onChangeWrongAnswerBox(e) {
    this.setState({ isWrongAnswer: e.target.checked });
  }

  autoUrlLink(text) {
    const regURL =
      /(((http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/|www\.)\S+(\.[^(\n|\t|\s,)]+)+))/gi;
    const replaceFunc = function (url) {
      return '<a href="' + url + '" target="_blank">' + url + '</a>';
    };
    const replacedText = text.replace(regURL, replaceFunc);
    return <span style={{whiteSpace:'pre-wrap'}} dangerouslySetInnerHTML={{ __html: replacedText }}></span>;
  }

  async writeReply() {
    const cookies = new Cookies();
    const { examType, examNum, nickname } = this.state;
    // const examNum = this.props.value.match.params.id;
    // const type = this.props.value.match.params.type;

    console.log(this.state.userInputReplyText, this.state.userModeState);
    const userInputReplyText = this.state.userInputReplyText;
    const userModeState = this.state.userModeState;
    const isWrongAnswer = this.state.isWrongAnswer;

    
    
    let payload = {
      nickname: nickname,
      content: userInputReplyText,
      anonymous: userModeState
      // createdAt: Date.now(),
      // isWrongAnswer: isWrongAnswer,
    };

    console.log(payload);

    await api.updateExamReplyById(examType, examNum, payload).then((res) => {
      // console.log(exam);
      console.log(res);

      if(res["status"] != 200 ) {
        return;
      }

      let prevReplies = this.state.replies;
      console.log(this.state.replies);
      payload.user_id = this.state.user_id;
      payload.reply_id = res.data.replyId;
      if(payload.anonymous) {
        payload.anonymous = "익명"
      }

      let mytemp = prevReplies.push(payload);
      // console.log(mytemp);
      this.setState({ replies: prevReplies });

      this.setState({ userInputReplyText: '' });

      
      localStorage.setItem("coin", parseInt(localStorage.getItem("coin")) + 10 );
      // this.setState({replies: [{"name": "dz", "content": "aa"}]})
    });
  }

  async deleteReply(reply_id, index) {
    console.log('delete ', reply_id);
    const { examType, examNum } = this.state;

    console.log(examNum, examType);
    // const examNum = this.props.value.match.params.id;
    // const type = this.props.value.match.params.type;
    

    await api2.deleteExamReplyById(examType, examNum, reply_id).then((res) => {
      // console.log(exam);
      console.log(res);

      let prevReplies = this.state.replies;
      prevReplies.splice(index, 1);
      this.setState({ replies: prevReplies });
    });
  }

  render() {
    const { replies, userInputReplyText, user_id, replyOpenStatus } =
      this.state;
    // console.log(replies);
    console.log('reply status', replyOpenStatus);

    const formStyle = {
      alignItems: 'center',
    };
    const replyCol = {
      textAlign: 'center',
      margin: 'auto',
      borderRight: '1px dotted grey',
    };

    const replyDiv = {
      overflowWrap: 'break-word',
    };
    const replyCountText = {
      fontSize: '14px',
    };

    return (
      <Container>
        <details open={replyOpenStatus}>
          <summary>
            토론장{' '}
            <span style={replyCountText}>({replies.length}개의 댓글)</span>
          </summary>

          <Form>
            <Row style={formStyle}>
              <Col md="9">
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Control
                    value={userInputReplyText}
                    as="textarea"
                    rows={3}
                    onChange={this.onChangeText.bind(this)}
                  />
                </Form.Group>
              </Col>
              <Col md="2">
                <Row>
                  <Col md="12">
                    <Form.Group id="formGridCheckbox">
                      <Form.Check
                        type="checkbox"
                        label="익명"
                        onChange={this.onChangeWriteMode.bind(this)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md="12">
                    <Form.Group id="formGridCheckbox2">
                      <Form.Check
                        type="checkbox"
                        label="잘못된 답"
                        onChange={this.onChangeWrongAnswerBox.bind(this)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
              <Col md="1" className="text-center">
                <Button variant="primary" onClick={this.writeReply.bind(this)}>
                  작성
                </Button>
              </Col>
            </Row>
          </Form>

          <ListGroup className="mt-4 mb-4 pb-4">
            {replies.length > 0 &&
              replies.map((data, index) => {
                let tootipKey = 'key-' + index;
                return (
                  <ListGroup.Item key={index}>
                    <Row>
                      <Col style={replyCol} md="2">
                        <OverlayTrigger
                          key={tootipKey}
                          placement="left"
                          overlay={
                            <Tooltip id="tooltip-bottom1">
                              {new Date(
                                data.created_at,
                              ).toLocaleString()}
                            </Tooltip>
                          }
                        >
                          <MyBadge variant="success">{data.nickname}</MyBadge>
                        </OverlayTrigger>
                      </Col>
                      <Col style={replyDiv} md="9">
                        <pre className="mb-0">
                          {this.autoUrlLink(data.content)}
                        </pre>
                      </Col>
                      <Col style={replyDiv} md="1">
                        {data.user_id == user_id && (
                          <Button
                            variant="light"
                            onClick={() => this.deleteReply(data.reply_id, index)}
                            size="sm"
                          >
                            {' '}
                            <FaTrash />
                          </Button>
                        )}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                );
              })}
          </ListGroup>
        </details>
      </Container>
    );
  }
}

export default ExamReply;
