import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import Header from './Header';
import Footer from './Footer';
import Profile from './Profile';
import Main from './component/Main';
import Login from './Login';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Favourit from './component/Favourit';



class App extends React.Component {


  render() {
    const { isAuthenticated } = this.props.auth0;
    // console.log('app', this.props);
    return (
      <>
        <Router>
          {/* <IsLoadingAndError> */}
          <Header />
          <Switch>
            <Route exact path="/">
              {/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}
              {(isAuthenticated ? <Main/> : <Login />)}

            </Route >
            <Route exact path="/profile">
              {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
              <Profile />
            </Route >
            <Route exact path="/favorit">
          { isAuthenticated && 
              <Favourit/>}
            </Route >
          </Switch>
          <Footer />
        </Router>
      </>
    );
  }
}

export default withAuth0(App);
