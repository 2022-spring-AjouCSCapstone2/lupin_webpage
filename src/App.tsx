import {
  Route,
  Switch,
  BrowserRouter as Router,
} from 'react-router-dom';
import Box from "@mui/material/Box";
import HeaderNav from './components/partials/HeaderNav';
import Home from './components/Home';
import Profile from './components/Profile';
import Courses from './components/Courses';
import CourseDetails from './components/CourseDetails';
import Footer from './components/partials/Footer';
import ScrollToTop from './components/modules/ScrollToTop';

export default function App() {
  return (
    <div>
      <Router>
        <ScrollToTop />
        <HeaderNav />
        <Box sx={{ mt: 8, pb: 10, backgroundColor: '#f9fafb' }}>
          <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/profile" exact component={Profile} />
              <Route path="/courses" exact component={Courses} />
              <Route path="/courses/:id" component={CourseDetails} />
          </Switch>
        </Box>
        <Footer />
      </Router>
    </div>
  );
}
