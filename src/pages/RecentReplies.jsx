import React, { Component } from 'react';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Cookies from 'universal-cookie';

import api from '../api';

class RecentReplies extends Component {
  constructor(props) {
    super(props);

    const cookies = new Cookies();

    this.autoUrlLink = this.autoUrlLink.bind(this);

    this.state = {
      recentReplies: [],
    };
  }

  componentDidMount = async () => {
    await api.getRecentReply().then((result) => {
      console.log('Replies ', result);
      this.setState({ recentReplies: result['data'] });
    });
  };

  onChangeReplyMode(e) {
    const cookies = new Cookies();

    cookies.set('replyOpenStatus', e.target.checked, { path: '/' });
    console.log(e.target.checked);
  }

  autoUrlLink(text) {
    const regURL =
      /(((http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/|www\.)\S+(\.[^(\n|\t|\s,)]+)+))/gi;
    const replaceFunc = function (url) {
      return '<a href="' + url + '" target="_blank">' + url + '</a>';
    };
    const replacedText = text.replace(regURL, replaceFunc);
    return <div dangerouslySetInnerHTML={{ __html: replacedText }}></div>;
  }

  timeForToday(value) {
    const today = new Date();
    const timeValue = new Date(value);

    const betweenTime = Math.floor(
      (today.getTime() - timeValue.getTime()) / 1000 / 60,
    );
    if (betweenTime < 1) return '방금전';
    if (betweenTime < 60) {
      return `${betweenTime}분전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
      return `${betweenTimeHour}시간전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
      return `${betweenTimeDay}일전`;
    }

    return `${Math.floor(betweenTimeDay / 365)}년전`;
  }

  render() {
    const { recentReplies } = this.state;
    console.log('render', recentReplies);
    const myCustom = {
      fontSize: '14px',
      borderTop: '1px solid #dddddd',
      paddingTop: '10px',
    };

    const contentDiscription = {
      fontSize: '18px',
      borderRight: '1px solid #dddddd',
      margin: 'auto',
    };

    return (
      <Container className="mt-4">
        <h3> 최근 댓글 </h3>
        {recentReplies.length > 0 &&
          recentReplies.map((data, index) => {
            const targetPageUrl = '/exam/' + data.examType + '/' + data.examNum;
            return (
              <Row className="mb-4">
                <Col>
                  <Card className="text-center">
                    <Card.Header>
                      <Button variant="primary" href={targetPageUrl}>
                        {data.examType.toUpperCase()} {data.examNum}번{' '}
                      </Button>
                      {data.isWrongAnswer == true && (
                        <Button className="ml-4" variant="danger">
                          {' '}
                          잘못된 답{' '}
                        </Button>
                      )}
                    </Card.Header>
                    <Card.Body>
                      <Card.Title>
                        <Row>
                          <Col md="1" style={contentDiscription}>
                            댓글
                          </Col>
                          <Col md="11">{this.autoUrlLink(data.reply)}</Col>
                        </Row>
                      </Card.Title>
                      <div style={myCustom}>
                        <Card.Text>
                          <Row>
                            <Col md="1" style={contentDiscription}>
                              문제
                            </Col>
                            <Col md="11">{data.question}</Col>
                          </Row>
                        </Card.Text>
                      </div>
                    </Card.Body>
                    <Card.Footer className="text-muted">
                      {data.writer} {this.timeForToday(data.timestamp)}
                    </Card.Footer>
                  </Card>
                </Col>
              </Row>
            );
          })}
      </Container>
    );
  }
}

export default RecentReplies;
