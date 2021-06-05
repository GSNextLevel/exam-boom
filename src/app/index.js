import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { NavBar } from '../components'
import { HomePage, ExamMain, LeaderBoard, SubmitHistory, Setting } from '../pages'
import { ExamPage, GotoADP, GotoSAP } from '../pages'



import Jumbotron from 'react-bootstrap/Jumbotron';
import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';


import 'bootstrap/dist/css/bootstrap.min.css'


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
          <Route path="/exam/:type" exact  component={GotoADP} />
          <Route path="/exam/:type/random/:id"  render={props => <ExamPage {...props} isRandom={true} />}/>
          <Route path="/exam/:type/:id"  component={ExamPage} />

          <Route path="/leaderBoard" exact  component={LeaderBoard} />
          <Route path="/history" exact  component={SubmitHistory} />

          <Route path="/setting" exact component={Setting} />


          {/*<Route path="/exam/adp" exact  component={GotoADP} />
          <Route path="/exam/adp/:id"  component={ExamPage} />
          <Route path="/exam/sap" exact component={GotoSAP} />
          <Route path="/exam/sap/:id"  component={ExamPage} />  */}

        </Switch>
      </Router>
    )
}

export default App
