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
import NewPost from './pages/NewPost';
import Footer from './partials/Footer';
import ScrollToTop from './modules/ScrollToTop';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ReducerType } from '../rootReducer';

export default function PrivateRoute() {
    const loggedIn = useSelector<ReducerType>((state) => state.loggedIn);

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
                                <Route path="/my-posts" exact component={MyPosts} />
                                <Route path="/courses" exact component={Courses} />
                                <Route path="/courses/:id" exact component={CourseDetails} />
                                <Route path="/courses/:id/post" exact component={NewPost} />
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