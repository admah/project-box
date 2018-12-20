import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Materials from "../components/Materials";
import UserProjects from "../components/UserProjects";
import UserProjectDisplay from "../components/UserProjectDisplay";

const User = () => (
  <React.Fragment>
    <Switch>
      <Route exact path="/user/projects" component={UserProjects} />
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

export default User;
