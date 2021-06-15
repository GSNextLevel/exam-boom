import React, { Component } from 'react';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';

import UpdateLogMarkdown from '../AWSDocs.md';
import ReactMarkdown from 'react-markdown';

import { render } from 'react-dom';

class DocsPage extends Component {
  constructor(props) {
    super(props);
    console.log(props)

    this.state = {
      markdown: '',
      type: props.match.params.type
    };
  }

  componentWillMount() {
    const currentDocsType = this.state.type;
    console.log("#Type", currentDocsType)
    let showDocsType = "";

    // if(currentDocsType === "aws") {
    //     showDocsType = "UpdateLogMarkdown"
    // }
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

export default DocsPage;
