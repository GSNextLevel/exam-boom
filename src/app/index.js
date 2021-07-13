import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
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
<<<<<<< HEAD
  SignUp,
  Login,
  MyPage
=======
  UserSelectedExam
>>>>>>> 011c1af007d4c3845c7139b602e9605a8cc917e8
} from '../pages';
import { ExamPage, GotoADP } from '../pages';
import PrivateRoute from '../utils/PrivateRoute';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/" component={ExamMain}/>

        <Route path="/exam" exact component={ExamMain} />
        <Route path="/exam/:type" exact component={GotoADP} />
        <Route
          path="/exam/:type/random/:id"
          render={(props) => <ExamPage {...props} isRandom={true} />}
        />
        <Route path="/exam/:type/:id" component={ExamPage} />

        <Route path="/leaderBoard" exact component={LeaderBoard} />
        <Route path="/user/history" exact component={SubmitHistory} />

        <Route path="/user/setting" exact component={Setting} />
        <Route path="/replies" exact component={RecentReplies} />

        <Route path="/updateLog" exact component={UpdateLog} />
        <Route path="/license" exact>
          <Redirect push to={'/license.html'} />
        </Route>

        <Route path="/voc" exact component={VoC} />
        <Route path="/docs" exact component={Docs} />
        <Route path="/docs/:type" exact component={DocsPage} />
<<<<<<< HEAD
        <Route path="/signup" exact component={SignUp}/>
        <Route path="/login" exact component={Login}/>
        <PrivateRoute path="/mypage" exact component={MyPage}/>
=======

        <Route path="/user/exam" exact component={UserSelectedExam} />
>>>>>>> 011c1af007d4c3845c7139b602e9605a8cc917e8
      </Switch>
    </Router>
  );
}

export default App;
