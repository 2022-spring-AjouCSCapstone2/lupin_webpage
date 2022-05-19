import {
  Route,
  BrowserRouter as Router,
} from 'react-router-dom';
import Login from './components/Login';
import { useState } from 'react';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const onSignIn = () => setLoggedIn(true);
  return (
    <div>
        <Router>
            <Route path="/login" exact render={() => <Login onSignIn={onSignIn} loggedIn={loggedIn} />} />
            <PrivateRoute loggedIn={loggedIn} />
        </Router>     
    </div>
  );
}


