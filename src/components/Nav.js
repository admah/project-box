import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Icon, Menu, Button } from "semantic-ui-react";

class Nav extends Component {
  render() {
    return (
      <Menu className="inverted top fixed">
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
            <Button inverted>Log In</Button>
          </Menu.Item>
          <Menu.Item>
            <Button inverted>Sign Up</Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

export default Nav;
