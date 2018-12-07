import React from "react";
import { NavLink } from "react-router-dom";
import { Icon, Menu, Button } from "semantic-ui-react";
import SignOut from "./auth/SignOut";

const Nav = ({ user }) => (
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
        {user ? (
          <SignOut />
        ) : (
          <NavLink to="/projects">
            <Button inverted>Log In / Sign Up</Button>
          </NavLink>
        )}
      </Menu.Item>
    </Menu.Menu>
  </Menu>
);

export default Nav;
