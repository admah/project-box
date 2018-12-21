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
      <Route
        exact
        path="/user/projects"
        render={user => <UserProjects user={user} />}
      />
      <Route
        exact
        path="/user/project/:projectId"
        component={UserProjectDisplay}
      />
      <Route exact path="/user/materials" component={Materials} />
      <Redirect to={"/user/projects"} />
    </Switch>
  </React.Fragment>
);

User.propTypes = {
  user: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(User);
