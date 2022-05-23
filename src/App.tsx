import {
  Route,
  BrowserRouter as Router,
} from 'react-router-dom';
import Login from './components/pages/Login';
import Join from './components/pages/Join';
// import Logout from './components/Logout';
import { useState } from 'react';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const signInHandler = () => setLoggedIn(true);
  const logoutHandler = () => setLoggedIn(false);
  return (
    <div>
        <Router>
            <Route path="/login" exact render={() => <Login signInHandler={signInHandler} loggedIn={loggedIn} />} />
            <Route path="/join" exact render={() => <Join loggedIn={loggedIn} />} />
            <PrivateRoute loggedIn={loggedIn} logoutHandler={logoutHandler} />
        </Router>     
    </div>
  );
}


