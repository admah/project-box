import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect, Route, Switch } from "react-router-dom";
import CommunityProjects from "../components/CommunityProjects";
import CommunityProjectDisplay from "../components/CommunityProjectDisplay";

const mapStateToProps = state => {
  return { user: { name: state.account.name, id: state.account.id } };
};

const Community = ({ user }) => (
  <React.Fragment>
    <Switch>
      {!user.id && <Redirect to="/login" />}
      <Route exact path="/community/:tag?" component={CommunityProjects} />
      <Route
        path="/community/project/:projectId"
        render={props => <CommunityProjectDisplay {...props} />}
      />
      <Redirect to={"/community"} />
    </Switch>
  </React.Fragment>
);

Community.propTypes = {
  user: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Community);
