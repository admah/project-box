import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { Icon, Menu } from "semantic-ui-react";
import SignOut from "./auth/SignOut";

const MainMenu = styled(Menu)`
  background-color: #1ca086 !important;
  color: #fff !important;
  font-size: 16px !important;
  margin-bottom: 0 !important;
`;

const StyledNavLink = styled(NavLink)`
  color: #fff !important;
`;

const Nav = ({ history, onAwsLogout, user }) => (
  <MainMenu className="top" stackable>
    <StyledNavLink className="menu item" exact to="/" activeClassName="">
      <Icon className="big rounded clipboard" />
      Projectable
    </StyledNavLink>
    <StyledNavLink className="menu item" to="/community">
      Community
    </StyledNavLink>
    {user.id && (
      <React.Fragment>
        <StyledNavLink className="menu item" to="/user/projects">
          Projects
        </StyledNavLink>
        <StyledNavLink className="menu item" to="/user/materials">
          Materials
        </StyledNavLink>
      </React.Fragment>
    )}
    <Menu.Menu position="right">
      <Menu.Item>
        {user.id ? (
          <SignOut history={history} onAwsLogout={onAwsLogout} />
        ) : (
          <NavLink className="ui button inverted" to="/login">
            Log In / Sign Up
          </NavLink>
        )}
      </Menu.Item>
    </Menu.Menu>
  </MainMenu>
);

Nav.propTypes = {
  history: PropTypes.object.isRequired,
  onAwsLogout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

export default Nav;
