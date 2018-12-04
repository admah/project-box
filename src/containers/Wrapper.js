import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Nav from "../components/Nav";
import Home from "../components/Home";
import Projects from "../components/Projects";
import ProjectDisplay from "../components/ProjectDisplay";
import Materials from "../components/Materials";

class Wrapper extends Component {
  render() {
    return (
      <React.Fragment>
        <Nav />
        <div className="ui container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/projects" component={Projects} />
            <Route path="/project/:projectId" component={ProjectDisplay} />
            <Route path="/materials" component={Materials} />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default Wrapper;
