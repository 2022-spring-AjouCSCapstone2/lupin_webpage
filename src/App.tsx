import Container from '@mui/material/Container';
import HeaderNav from './components/partials/headerNav';
import {
  Route,
  Switch,
  BrowserRouter as Router,
} from 'react-router-dom';
import Home from './components/home';
import Profile from './components/profile';
import Courses from './components/courses';

function App() {
  return (
    <div>
      <Router>
        <HeaderNav />
        <Container
          sx={{ mt: 2 }}>
                <Switch>
                    <Route path="/" exact>
                      <Home />
                    </Route>
                    <Route path="/profile" exact>
                      <Profile />
                    </Route>
                    <Route path="/courses" exact>
                      <Courses />
                    </Route>
                </Switch>
        </Container>   
      </Router>
    </div>
  );
}

export default App;
