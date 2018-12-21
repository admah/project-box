import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import styled from "styled-components";
import { Auth } from "aws-amplify";
import { onAwsLogin, onAwsLogout } from "../actions/AccountActions";
import GlobalStyles from "../css/GlobalStyles.js";
import Nav from "../components/Nav";
import Home from "../components/Home";
import Login from "../components/Login";
import SignUp from "../components/auth/SignUp";
import Community from "./Community";
import User from "./User";

const mapStateToProps = state => {
  return { user: { name: state.name, id: state.id } };
};

const mapDispatchToProps = dispatch => {
  return {
    onAwsLogin: payload => dispatch(onAwsLogin(payload)),
    onAwsLogout: () => dispatch(onAwsLogout())
  };
};

const MainContainer = styled.div`
  padding-top: 50px;
`;

const NavWithRouter = withRouter(Nav);

class Wrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null
    };
  }

  async componentDidMount() {
    Auth.currentAuthenticatedUser()
      .then(user =>
        this.setState({
          user: user
        })
      )
      .catch(err => this.setState({ user: null }));
  }

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <NavWithRouter user={user} />
        <MainContainer path={window.location.pathname}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/login"
              render={props => <Login user={this.state.user} {...props} />}
            />
            <Route
              exact
              path="/signup"
              render={props => <SignUp authState="signUp" {...props} />}
            />
            <Route path="/community" component={Community} />
            <Route
              path="/user"
              render={props => <User user={this.state.user} {...props} />}
            />
          </Switch>
        </MainContainer>
        <GlobalStyles />
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps)(Wrapper);
