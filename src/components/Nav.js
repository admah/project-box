import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Icon, Menu } from "semantic-ui-react";

class Nav extends Component {
  render() {
    return (
      <Menu className="inverted top fixed">
        <NavLink className="menu item" exact to="/">
          <Icon className="rounded clipboard" />
          Project-Box
        </NavLink>
        <NavLink className="menu item" to="/projects">
          Projects
        </NavLink>
        <NavLink className="menu item" to="/materials">
          Materials
        </NavLink>
      </Menu>
    );
  }
}

export default Nav;
