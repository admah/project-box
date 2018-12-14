import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { Icon, Menu } from "semantic-ui-react";
import SignOut from "./auth/SignOut";

const Nav = ({ history, user }) => (
  <Menu className="inverted top">
    <NavLink className="menu item" exact to="/" activeClassName="">
      <Icon className="big rounded clipboard" />
      Project-Box
    </NavLink>
    <NavLink className="menu item" to="/community">
      Community
    </NavLink>
    {user && (
      <React.Fragment>
        <NavLink className="menu item" to="/user/projects">
          Projects
        </NavLink>
        <NavLink className="menu item" to="/user/materials">
          Materials
        </NavLink>
      </React.Fragment>
    )}
    <Menu.Menu position="right">
      <Menu.Item>
        {user ? (
          <SignOut history={history} />
        ) : (
          <NavLink className="ui button inverted" to="/login">
            Log In / Sign Up
          </NavLink>
        )}
      </Menu.Item>
    </Menu.Menu>
  </Menu>
);

Nav.propTypes = {
  history: PropTypes.object.isRequired,
  user: PropTypes.object
};

Nav.defaultProps = {
  user: null
};

export default Nav;
