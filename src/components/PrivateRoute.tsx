import {
    Route,
    Switch,
} from 'react-router-dom';
import Box from "@mui/material/Box";
import HeaderNav from './partials/HeaderNav';
import Home from './Home';
import Profile from './Profile';
import Courses from './Courses';
import CourseDetails from './CourseDetails';
import Footer from './partials/Footer';
import ScrollToTop from './modules/ScrollToTop';
import { Redirect } from 'react-router-dom';

interface routeProps {
    loggedIn: boolean
}

export default function PrivateRoute({ loggedIn }: routeProps) {
    return (
        <Route render={
            () => loggedIn
            ? (
                    <Box>                    
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
                    </Box>
                )
            : (
                <Redirect to={{ pathname: '/login' }} />
              )
        } />
    )
}