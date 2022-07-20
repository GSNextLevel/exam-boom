import React, { useEffect } from 'react';

import { createBrowserHistory } from 'history';


import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useLocation
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
  SideMenu,
  SignUp,
  Login,
  MyPage,
  UserSelectedExam,
  AddExam,
} from '../pages';
import { ExamPage, GotoADP } from '../pages';
import PrivateRoute from '../utils/PrivateRoute';
import GARoute from '../utils/GARoute';

import 'bootstrap/dist/css/bootstrap.min.css';




// function usePageTracking() {
//   const location = useLocation();

//   // useEffect(() => {
//   //   ReactGA.initialize("UA-213891838-1");
//   //   ReactGA.pageview(location.pathname + location.search);
//   //   console.log(location.pathname);
//   // }, [location]);
// }

function App() {
  
  // GoogleAnalytics();
  
  return (
    // <React.Suspense>
    
    <>
      <Router >
        
        <NavBar />
        <Switch>
          <GARoute exact path="/">
            {/* <SideMenu /> */}
            <ExamMain />
          </GARoute> 

          <GARoute path="/exam" exact component={ExamMain} />
          <PrivateRoute path="/exam/:type" exact component={GotoADP} />
          <Route
            path="/exam/:type/random/:id"
            // component={ExamPage}
            // isRandom={true}
            render={(props) => <ExamPage {...props} isRandom={true} />}
          />

          <Route
            path="/exam/:type/random2/:id"
            // component={ExamPage}
            // isRandom={true}
            render={(props) => <ExamPage {...props} isRandom2={true} />}
          />

          {/* <Route path="/exam/:type/:id" component={ExamPage} /> */}
          <PrivateRoute path="/exam/:type/:id" component={ExamPage} />

          <PrivateRoute path="/leaderBoard" exact component={LeaderBoard} />
          <PrivateRoute path="/user/history" exact component={SubmitHistory} />

          <GARoute path="/user/setting" exact component={Setting} />
          <PrivateRoute path="/replies" exact component={RecentReplies} />

          <GARoute path="/updateLog" exact component={UpdateLog} />
          <GARoute path="/license" exact>
            <Redirect push to={'/license.html'} />
          </GARoute>

          <PrivateRoute path="/addExam" exact component={AddExam} />

          <GARoute path="/voc" exact component={VoC} />
          <GARoute path="/docs" exact component={Docs} />
          <GARoute path="/docs/:type" exact component={DocsPage} />
          <GARoute path="/signup" exact component={SignUp} />
          <GARoute path="/login" exact component={Login} />
          <PrivateRoute path="/mypage" exact component={MyPage} />

          <PrivateRoute path="/user/exam" exact component={UserSelectedExam} />
        </Switch>
      </Router>
    </>
    //  </React.Suspense> 
  );
}

export default App;
