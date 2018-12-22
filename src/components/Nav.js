import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Auth, Hub } from "aws-amplify";
import { NavLink } from "react-router-dom";
import { Icon, Menu } from "semantic-ui-react";
import SignOut from "./auth/SignOut";

const MainMenu = styled(Menu)`
  font-size: 16px !important;
  margin-bottom: 0 !important;
`;

class Nav extends Component {
  constructor(props) {
    super(props);

    Hub.listen("auth", this, "Nav");

    this.state = {
      user: null
    };

    this.loadUser = this.loadUser.bind(this);
  }

  componentDidMount() {
    this.loadUser();
  }

  onHubCapsule(capsule) {
    this.loadUser();
  }

  loadUser() {
    Auth.currentAuthenticatedUser()
      .then(user => this.setState({ user: user }))
      .catch(err => this.setState({ user: null }));
  }

  render() {
    const { history, onAwsLogout, user } = this.props;

    return (
      <MainMenu className="top" stackable>
        <NavLink className="menu item" exact to="/" activeClassName="">
          <Icon className="big rounded clipboard" />
          Projectable
        </NavLink>
        <NavLink className="menu item" to="/community">
          Community
        </NavLink>
        {this.state.user && (
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
            {this.state.user ? (
              <SignOut history={history} onAwsLogout={onAwsLogout} />
            ) : (
              <NavLink className="ui button" to="/login">
                Log In / Sign Up
              </NavLink>
            )}
          </Menu.Item>
        </Menu.Menu>
      </MainMenu>
    );
  }
}

Nav.propTypes = {
  history: PropTypes.object.isRequired,
  onAwsLogout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

export default Nav;
