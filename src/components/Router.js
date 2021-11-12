import React, { useState } from "react";
import { HashRouter as Router, Route, Switch, Redirect  } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "components/Navigaion";
import Profile from "routes/Profile";

const AppRouter = ( {refreshUser, isLoggedIn, userObj} ) => {
  return (
    <Router>
      {isLoggedIn && <Navigation userObj={userObj} />}
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <Home userObj={userObj} />
            </Route> 
            <Route exact path="/profile">
              <Profile userObj={userObj} refreshUser={refreshUser} />
            </Route>
            <Redirect from="*" to="/" /> 
          </>
        )
        
        : (
          <>
            <Route exact path="/">
              <Auth />
            </Route>
          </>
          )}
      </Switch>
    </Router>
  );
}

export default AppRouter;