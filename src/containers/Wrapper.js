import React from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import styled from "styled-components";
import { onAwsLogin, onAwsLogout } from "../actions/AccountActions";
import GlobalStyles from "../css/GlobalStyles.js";
import Nav from "../components/Nav";
import Home from "../components/Home";
import Login from "../components/Login";
import SignUp from "../components/auth/SignUp";
import Community from "./Community";
import User from "./User";

const mapStateToProps = state => {
  return { user: { name: state.account.name, id: state.account.id } };
};

const mapDispatchToProps = dispatch => {
  return {
    onAwsLogin: payload => dispatch(onAwsLogin(payload)),
    onAwsLogout: () => dispatch(onAwsLogout())
  };
};

const MainContainer = styled.div`
  padding-top: 20px;
`;

const NavWithRouter = withRouter(Nav);

const Wrapper = ({ onAwsLogin, onAwsLogout, user }) => (
  <React.Fragment>
    <NavWithRouter
      user={user}
      onAwsLogin={onAwsLogin}
      onAwsLogout={onAwsLogout}
    />
    <MainContainer path={window.location.pathname}>
      <Switch>
        <Route
          exact
          path="/"
          render={props => <Home user={user} {...props} />}
        />
        <Route
          exact
          path="/login"
          render={props => (
            <Login user={user} {...props} onAwsLogin={onAwsLogin} />
          )}
        />
        <Route
          exact
          path="/signup"
          render={props => <SignUp authState="signUp" {...props} />}
        />
        <Route path="/community" component={Community} />
        <Route path="/user" render={props => <User user={user} {...props} />} />
      </Switch>
    </MainContainer>
    <GlobalStyles />
  </React.Fragment>
);

Wrapper.propTypes = {
  onAwsLogin: PropTypes.func.isRequired,
  onAwsLogout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Wrapper)
);
