import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { NavBar } from '../components'
import { MoviesList, MoviesInsert, MoviesUpdate } from '../pages'
import { HomePage, ExamMain } from '../pages'

import { ExamPage, GotoADP, GotoSAP } from '../pages'



import Jumbotron from 'react-bootstrap/Jumbotron';
import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';


// import 'bootstrap/dist/css/bootstrap.min.css'

class Square extends React.Component {
  // TODO: remove the constructor
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    // TODO: use onClick={this.props.onClick}
    // TODO: replace this.state.value with this.props.value
    return (
      <button className="square" onClick={() => this.setState({value: 'X'})}>
        {this.state.value}
      </button>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
    };
  }

  renderSquare(i) {
    return <Square value={this.state.squares[i]} />;
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}{this.renderSquare(1)}{this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}{this.renderSquare(4)}{this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}{this.renderSquare(7)}{this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

const ExampleToast = ({ children }) => {
  const [show, toggleShow] = useState(true);

  return (
    <>
      {!show && <Button onClick={() => toggleShow(true)}>Show Toast</Button>}
      <Toast show={show} onClose={() => toggleShow(false)}>
        <Toast.Header>
          <strong className="mr-auto">React-Bootstrap</strong>
        </Toast.Header>
        <Toast.Body>{children}</Toast.Body>
      </Toast>
    </>
  );
};

function AlertDismissible() {
  const [show, setShow] = useState(true);

  return (
    <>
      <Alert show={show} variant="success">
        <Alert.Heading>How's it going?!</Alert.Heading>
        <p>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget
          lacinia odio sem nec elit. Cras mattis consectetur purus sit amet
          fermentum.
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShow(false)} variant="outline-success">
            Close me y'all!
          </Button>
        </div>
      </Alert>

      {!show && <Button onClick={() => setShow(true)}>Show Alert</Button>}
    </>
  );
}

function ForTest() {
  return (
    <>
      <Button variant="primary">Primary</Button>{' '}
    </>
  );
}

function App() {
    return (

      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" >
            <ExamMain />
          </Route>

          <Route path="/exam" exact component={ExamMain} />

          <Route path="/movies/list" exact component={MoviesList} />

          <Route path="/exam/adp" exact  component={GotoADP} />
          <Route path="/exam/adp/:id"  component={ExamPage} />
          <Route path="/exam/sap"  component={GotoSAP} />

        </Switch>
      </Router>
      // <Container className="p-3">
      //   <Jumbotron>
      //     <h1 className="header">Welcome To React-Bootstrap</h1>
      //     <ExampleToast>
      //       We now have Toasts
      //       <span role="img" aria-label="tada">
      //         🎉
      //       </span>
      //     </ExampleToast>
      //   </Jumbotron>
      // </Container>
        // <Router>
        //     <NavBar />
        //     <Switch>
        //         <Route path="/movies/list" exact component={MoviesList} />
        //         <Route path="/movies/create" exact component={MoviesInsert} />
        //         <Route
        //             path="/movies/update/:id"
        //             exact
        //             component={MoviesUpdate}
        //         />
        //     </Switch>
        //
        //     <Game/>
        // </Router>
    )
}

export default App
