import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import Materials from "../components/Materials";
import UserProjects from "../components/UserProjects";
import UserProjectDisplay from "../components/UserProjectDisplay";

const mapStateToProps = state => {
  return { user: { name: state.account.name, id: state.account.id } };
};

const User = ({ user }) => (
  <React.Fragment>
    <Switch>
      {!user.id && <Redirect to="/login" />}
      <Route
        exact
        path="/user/projects"
        render={props => <UserProjects user={user} />}
      />
      <Route
        exact
        path="/user/project/:projectId"
        render={props => <UserProjectDisplay user={user} {...props} />}
      />
      <Route
        exact
        path="/user/materials"
        render={user => <Materials user={user} />}
      />
      <Redirect to={"/user/projects"} />
    </Switch>
  </React.Fragment>
);

User.propTypes = {
  user: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(User);
