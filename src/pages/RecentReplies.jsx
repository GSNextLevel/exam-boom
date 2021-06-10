import React, { Component } from 'react'

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Cookies from 'universal-cookie';

class RecentReplies extends Component {

  constructor(props) {
    super(props);

    const cookies = new Cookies();

    this.state = {
        replyOpenStatus:  cookies.get('replyOpenStatus') === undefined ? false : cookies.get('replyOpenStatus') == "false" ? false : true
    }
  }

  onChangeReplyMode(e) {
    const cookies = new Cookies();

    cookies.set('replyOpenStatus', e.target.checked, {path: '/'})
    console.log(e.target.checked);

  }

  render() {

    const { replyOpenStatus } = this.state;

    const myCustom = {
      fontSize: '14px',
      borderTop: '1px solid #dddddd',
      paddingTop: '10px'
    }

    const contentDiscription = {
      fontSize: '18px',
      borderRight: '1px solid #dddddd',
      margin: 'auto'
    }
    console.log(replyOpenStatus)
    return (

          <Container className="mt-4">
            <h3> 최근 댓글 </h3>
            <Row>
              <Col>
                <Card className="text-center">
                  <Card.Header>
                    <Button variant="primary">SAP 12번 </Button>
                  </Card.Header>
                  <Card.Body>
                    <Card.Title>
                      <Row>
                        <Col md="1" style={contentDiscription}>
                          댓글
                        </Col>
                        <Col md="11">
                          A: CloudWatch 구독은 Step function을 지원히지 않음 / B,C : CloudWatch 경보는 이벤트가 아닌 지표에서 트리거됨
                        </Col>
                      </Row>

                    </Card.Title>
                    <div style={myCustom}>
                      <Card.Text >
                        <Row>
                          <Col md="1" style={contentDiscription}>
                            문제
                          </Col>
                          <Col md="11">
                          프로덕션 계정에는 수동으로 로그인 한 모든 Amazon EC2 인스턴스를 24 시간 이내에 종료해야한다는 요구 사항이 있습니다. 프로덕션 계정의 모든 애플리케이션은 Amazon CloudWatch Logs 에이전트가 구성된 Auto Scaling 그룹을 사용하고 있습니다.
                          이 프로세스를 어떻게 자동화 할 수 있습니까?
                          </Col>
                        </Row>

                      </Card.Text>
                    </div>

                  </Card.Body>
                  <Card.Footer className="text-muted">임지훈 20분전</Card.Footer>
                </Card>
              </Col>


            </Row>




          </Container>

    );

  }
}

export default RecentReplies
