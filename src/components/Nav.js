import React, { Component } from "react";
import { Auth } from "aws-amplify";
import { NavLink } from "react-router-dom";
import { Icon, Menu, Button } from "semantic-ui-react";
import SignOut from "../auth/SignOut";

class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUserName: null
    };

    this.signOut = this.signOut.bind(this);
  }

  componentDidMount() {
    Auth.currentAuthenticatedUser().then(user =>
      this.setState({
        authUserName: user.username
      })
    );
  }

  render() {
    console.log(this.getAuthUserName);
    return (
      <Menu className="inverted top">
        <NavLink className="menu item" exact to="/" activeClassName="">
          <Icon className="big rounded clipboard" />
          Project-Box
        </NavLink>
        <NavLink className="menu item" to="/projects">
          Projects
        </NavLink>
        <NavLink className="menu item" to="/materials">
          Materials
        </NavLink>
        <Menu.Menu position="right">
          <Menu.Item>
            {this.state.authUserName && (
              <NavLink to="/">
                <SignOut />
              </NavLink>
            )}
            {!this.state.authUserName && (
              <NavLink to="/projects">
                <Button inverted>Log In / Sign Up</Button>
              </NavLink>
            )}
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

export default Nav;
