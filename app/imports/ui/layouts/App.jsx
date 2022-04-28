import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import 'semantic-ui-css/semantic.css';
import { Roles } from 'meteor/alanning:roles';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Landing from '../pages/Landing';
import ListPaper from '../pages/ListPaper';
import ListPaperAdmin from '../pages/ListPaperAdmin';
import AddPaper from '../pages/AddPaper';
import EditStuff from '../pages/EditStuff';
import EditPaper from '../pages/EditPaper';
import ViewPaper from '../pages/ViewPaper';
import NotFound from '../pages/NotFound';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Signout from '../pages/Signout';
import ViewProfile from '../pages/ViewProfile';
import EditProfile from '../pages/EditProfile';
import ListReview from '../pages/ListReview';
import ViewReview from '../pages/ViewReview';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar/>
          <div id="switch_body">
            <Switch>
              <Route exact path="/" component={Landing}/>
              <Route path="/signin" component={Signin}/>
              <Route path="/signup" component={Signup}/>
              <Route path="/signout" component={Signout}/>
              <ProtectedRoute path="/profile" component={ViewProfile}/>
              <ProtectedRoute path="/edit_profile" component={EditProfile}/>
              <ProtectedRoute path="/listPaper" component={ListPaper}/>
              <ProtectedRoute path="/listReview" component={ListReview}/>
              <ProtectedRoute path="/editPaper/:_id" component={EditPaper}/>
              <ProtectedRoute path="/addPaper" component={AddPaper}/>
              <ProtectedRoute path="/edit/:_id" component={EditStuff}/>
              <ProtectedRoute path="/view_paper/:_id" component={ViewPaper}/>
              <ProtectedRoute path="/view_review/:_id" component={ViewReview}/>
              <AdminProtectedRoute path="/admin" component={ListPaperAdmin}/>
              <Route component={NotFound}/>
            </Switch>
          </div>
          <Footer/>
        </div>
      </Router>
    );
  }
}

/**
 * ProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      return isLogged ?
        (<Component {...props} />) :
        (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
        );
    }}
  />
);

/**
 * AdminProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
      return (isLogged && isAdmin) ?
        (<Component {...props} />) :
        (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
        );
    }}
  />
);

// Require a component and location to be passed to each ProtectedRoute.
ProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

// Require a component and location to be passed to each AdminProtectedRoute.
AdminProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

export default App;
