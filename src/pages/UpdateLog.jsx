import React, { Component } from 'react';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';

import UpdateLogMarkdown from '../UpdateLogFile.md';
import ReactMarkdown from 'react-markdown';

import { render } from 'react-dom';

class UpdateLog extends Component {
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
    return (
      <Container>
        <ReactMarkdown children={markdown} />
      </Container>
    );
  }
}

export default UpdateLog;
