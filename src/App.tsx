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
import CourseDetails from './components/courseDetails';

export default function App() {
  return (
    <div>
      <Router>
        <HeaderNav />
        <Container
          sx={{ mt: 2 }}>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/profile" exact component={Profile} />
                    <Route path="/courses" exact component={Courses} />
                    <Route path="/courses/:id" component={CourseDetails} />
                </Switch>
        </Container>   
      </Router>
    </div>
  );
}
