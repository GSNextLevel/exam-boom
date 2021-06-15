import React, { Component } from 'react';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';

import Cookies from 'universal-cookie';

class Setting extends Component {
  constructor(props) {
    super(props);

    const cookies = new Cookies();

    this.state = {
      replyOpenStatus:
        cookies.get('replyOpenStatus') === undefined
          ? false
          : cookies.get('replyOpenStatus') == 'false'
          ? false
          : true,
    };
  }

  onChangeReplyMode(e) {
    const cookies = new Cookies();

    cookies.set('replyOpenStatus', e.target.checked, { path: '/' });
    console.log(e.target.checked);
  }

  render() {
    const { replyOpenStatus } = this.state;

    console.log(replyOpenStatus);
    return (
      <Container className="mt-4">
        <ListGroup>
          <ListGroup.Item variant="light">
            <Form>
              <Form.Check
                type="switch"
                id="open-reply-switch"
                label="기본으로 댓글 열어두기"
                onChange={this.onChangeReplyMode.bind(this)}
                defaultChecked={replyOpenStatus}
              />
            </Form>
          </ListGroup.Item>
        </ListGroup>
      </Container>
    );
  }
}

export default Setting;
