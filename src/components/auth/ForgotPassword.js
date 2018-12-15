import React, { Component } from "react";
import { Button, Container, Form, Message, Segment } from "semantic-ui-react";
import { Auth } from "aws-amplify";

export default class JForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.sendCode = this.sendCode.bind(this);
    this.changeState = this.changeState.bind(this);
    this.inputs = {};
    this.state = { error: "" };
  }

  changeState(state, data) {
    const { onStateChange } = this.props;
    if (onStateChange) {
      onStateChange(state, data);
    }
  }

  sendCode() {
    const username = this.props.authData || this.inputs.username;
    Auth.forgotPassword(username)
      .then(data => this.sendSuccess(username, data))
      .catch(err => this.handleError(err));
  }

  sendSuccess(username, data) {
    this.changeState("forgotPasswordReset", username);
  }

  handleError(err) {
    this.setState({ error: err.message || err });
  }

  render() {
    const { authState, authData } = this.props;
    if (authState !== "forgotPassword") {
      return null;
    }

    const style = {
      width: "20rem",
      links: { fontSize: "0.9em" },
      button: { width: "100%" },
      alert: { fontSize: "0.8em" }
    };

    const { error } = this.state;

    return (
      <Container text>
        <Form>
          <Form.Input
            type="text"
            placeholder="Username"
            defaultValue={authData || ""}
            onChange={event => (this.inputs.username = event.target.value)}
            autoFocus
          />
          <Segment>
            <div className="floated left">
              <a href="#" onClick={() => this.changeState("signIn")}>
                Back to sign in
              </a>
            </div>
            <div className="floated right" />
          </Segment>
          <Button primary mt="3" style={style.button} onClick={this.sendCode}>
            Send password reset code
          </Button>
          {error && (
            <Message warning mt="3" text="left" style={style.alert}>
              {error}
            </Message>
          )}
        </Form>
      </Container>
    );
  }
}
