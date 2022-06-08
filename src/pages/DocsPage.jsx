import React, { Component, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';

import UpdateLogMarkdown from '../AWSDocs.md';
import ReactMarkdown from 'react-markdown';

import { render } from 'react-dom';

const GoogleAdvertise = ({
  className = "adsbygoogle",
  client = "ca-pub-6313193260834584",
  slot = "4329546450",
  format = "fluid",
  responsive = "true",
  layoutKey = "-fb+5w+4e-db+86"
}) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      console.log("Advertise is pushed");
    } catch (e) {
      if (process.env.NODE_ENV !== "production")
        console.error("AdvertiseError", e);
    }
  }, []);

  if (process.env.NODE_ENV !== "production")
    return (
      <div
        style={{
          background: "#e9e9e9",
          color: "black",
          fontSize: "18px",
          fontWeight: "bold",
          textAlign: "center",
          padding: "16px"
        }}
      >
        광고 표시 영역
      </div>
    );
  return (
    <ins
      className={className}
      style={{
        overflowX: "auto",
        overflowY: "hidden",
        display: "block",
        textAlign: "center"
      }}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={responsive}
      data-ad-layout-key={layoutKey}
    />
  );
};

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
        <GoogleAdvertise />
        <ReactMarkdown children={markdown} />
      </Container>
    );
  }
}

export default DocsPage;
