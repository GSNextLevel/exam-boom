import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { NavBar } from '../components';
import {
  ExamMain,
  LeaderBoard,
  SubmitHistory,
  Setting,
  RecentReplies,
  UpdateLog,
  VoC,
  Docs,
  DocsPage,
  SignUp
} from '../pages';
import { ExamPage, GotoADP } from '../pages';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <ExamMain />
        </Route>

        <Route path="/exam" exact component={ExamMain} />
        <Route path="/exam/:type" exact component={GotoADP} />
        <Route
          path="/exam/:type/random/:id"
          render={(props) => <ExamPage {...props} isRandom={true} />}
        />
        <Route path="/exam/:type/:id" component={ExamPage} />

        <Route path="/leaderBoard" exact component={LeaderBoard} />
        <Route path="/history" exact component={SubmitHistory} />

        <Route path="/setting" exact component={Setting} />
        <Route path="/replies" exact component={RecentReplies} />

        <Route path="/updateLog" exact component={UpdateLog} />

        <Route path="/voc" exact component={VoC} />
        <Route path="/docs" exact component={Docs} />
        <Route path="/docs/:type" exact component={DocsPage} />
        <Route path="/signup" exact component={SignUp}/>
      </Switch>
    </Router>
  );
}

export default App;
