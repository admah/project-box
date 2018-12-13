import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { withRouter } from "react-router";
import { Auth } from "aws-amplify";
import Nav from "../components/Nav";
import Home from "../components/Home";
import Login from "../components/Login";
import Community from "../components/Community";
import Projects from "../components/Projects";
import ProjectDisplay from "../components/ProjectDisplay";
import Materials from "../components/Materials";

const NavWithRouter = withRouter(Nav);

class Wrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null
    };

    this.loadUser = this.loadUser.bind(this);
  }

  componentDidMount() {
    this.loadUser();
    Auth.currentAuthenticatedUser().then(user =>
      this.setState({
        authUserName: user.username
      })
    );
  }

  loadUser() {
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
        <div className="ui container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/community" component={Community} />
            <Route
              path="/projects"
              render={props => <Projects user={this.state.user} {...props} />}
            />
            <Route
              path="/project/:projectId"
              render={props => (
                <ProjectDisplay user={this.state.user} {...props} />
              )}
            />
            <Route path="/materials" component={Materials} />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default Wrapper;
