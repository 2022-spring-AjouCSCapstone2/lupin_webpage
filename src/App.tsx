import {
  Route,
  BrowserRouter as Router,
} from 'react-router-dom';
import Login from './components/pages/Login';
import Join from './components/pages/Join';
import PrivateRoute from './components/PrivateRoute';
import { SocketContext, socketEvents } from './components/context/socket';

export default function App() {
  // window.addEventListener('beforeunload', (event) => {
  //   event.preventDefault();
  //   event.returnValue = "";
  //   return '테스트 메시지';
  // });
  return (
      <SocketContext.Provider value={socketEvents}>
          <Router>
              <Route path="/login" exact component={Login} />
              <Route path="/join" exact component={Join} />
              <PrivateRoute />
          </Router>   
      </SocketContext.Provider>
  );
}


