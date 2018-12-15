import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import CommunityProjects from "../components/CommunityProjects";
import CommunityProjectDisplay from "../components/CommunityProjectDisplay";

const Community = () => (
  <React.Fragment>
    <Switch>
      <Route exact path="/community" component={CommunityProjects} />
      <Route
        path="/community/project/:projectId"
        render={props => <CommunityProjectDisplay {...props} />}
      />
      <Redirect to={"/community"} />
    </Switch>
  </React.Fragment>
);

export default Community;
