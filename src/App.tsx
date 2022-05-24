import {
  Route,
  BrowserRouter as Router,
} from 'react-router-dom';
import Login from './components/pages/Login';
import Join from './components/pages/Join';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  return (
    <div>
        <Router>
            <Route path="/login" exact component={Login} />
            <Route path="/join" exact component={Join} />
            <PrivateRoute />
        </Router>     
    </div>
  );
}


