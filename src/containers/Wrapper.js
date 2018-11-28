import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Nav from "../components/Nav";
import Home from "../components/Home";
import Projects from "../components/Projects";
import Materials from "../components/Materials";

class Wrapper extends Component {
  render() {
    return (
      <div className="ui container">
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/projects" component={Projects} />
          <Route path="/materials" component={Materials} />
        </Switch>
      </div>
    );
  }
}

export default Wrapper;
