import {
    Route,
    Switch,
} from 'react-router-dom';
import Box from "@mui/material/Box";
import HeaderNav from './partials/HeaderNav';
import Home from './pages/Home';
import Profile from './pages/Profile';
import MyPosts from './pages/MyPosts';
import Courses from './pages/Courses';
import CourseDetails from './pages/CourseDetails';
import Footer from './partials/Footer';
import ScrollToTop from './modules/ScrollToTop';
import { Redirect } from 'react-router-dom';

interface PrivateRouteProps {
    loggedIn: boolean
    logoutHandler: () => void
}

export default function PrivateRoute({ loggedIn, logoutHandler }: PrivateRouteProps) {
    return (
        <Route render={
            () => loggedIn
            ? (
                    <Box>                    
                        <ScrollToTop />
                        <HeaderNav logoutHandler={logoutHandler} />
                        <Box sx={{ mt: 8, pb: 10, backgroundColor: '#f9fafb' }}>
                            <Switch>
                                <Route path="/" exact component={Home} />
                                <Route path="/profile" exact component={Profile} />
                                <Route path="/my-posts" exact component={MyPosts} />
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