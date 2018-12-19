import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { withRouter } from "react-router";
import styled from "styled-components";
import { Auth } from "aws-amplify";
import GlobalStyles from "../css/GlobalStyles.js";
import Nav from "../components/Nav";
import Home from "../components/Home";
import Login from "../components/Login";
import Community from "./Community";
import User from "./User";

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
            <Route exact path="/login" component={Login} />
            <Route path="/community" component={Community} />
            <Route path="/user" component={User} />
          </Switch>
        </MainContainer>
        <GlobalStyles />
      </React.Fragment>
    );
  }
}

export default Wrapper;
