import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import Navbar from "./components/layout/Navbar";
import Alert from "./components/layout/Alert";
import SignIn from "./components/login/SignIn";
import SignUp from "./components/login/SignUp";
import Dashboard from "./components/dashboard/Dashboard";
import EditProfile from "./components/profile-form/EditProfile";
import PrivateRoute from "./components/routing/PrivateRoute";
import SearchBooks from "./components/books/SearchBooks";
import BookItem from "./components/books/BookItem";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";

// Redux
import { Provider } from "react-redux";
import store from "./store";
// import Home from './components/Home';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <>
          <Navbar />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/" component={SignIn} />
              <Route path="/signup" component={SignUp} />
              <Route path="/profiles" component={Profiles} />
              <Route path="/profile/:id" component={Profile} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <PrivateRoute path="/edit-profile" component={EditProfile} />
              <PrivateRoute path="/search-books" component={SearchBooks} />
              <PrivateRoute path="/book/:id" component={BookItem} />
              <PrivateRoute path="/posts" component={Posts} />
              <PrivateRoute path="/post/:id" component={Post} />
            </Switch>
          </section>
        </>
      </Router>
    </Provider>
  );
};

export default App;
