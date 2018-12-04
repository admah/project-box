import React, { Component } from "react";
import { Container } from "semantic-ui-react";

class Home extends Component {
  render() {
    return (
      <Container text style={{ marginTop: "70px" }}>
        <h1>Welcome to Project-Box!</h1>
        <p>
          This is a tool designed to help you manage all of those house projects
          that you love to do.
        </p>
        <p>Simply log in or create an account, and start adding projects!</p>
      </Container>
    );
  }
}

export default Home;
