import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Materials from "../components/Materials";
import UserProjects from "../components/UserProjects";
import UserProjectDisplay from "../components/UserProjectDisplay";

const User = ({ user }) => (
  <React.Fragment>
    <Switch>
      <Route
        exact
        path="/user/projects"
        render={props => <UserProjects user={user} />}
      />
      <Route
        path="/user/project/:projectId"
        render={props => <UserProjectDisplay user={user} {...props} />}
      />
      <Route path="/user/materials" component={Materials} />
      <Redirect to={"/user/projects"} />
    </Switch>
  </React.Fragment>
);

export default User;
