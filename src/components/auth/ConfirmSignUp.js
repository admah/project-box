import React, { Component } from "react";
import { Container, Form, Button, Message, Segment } from "semantic-ui-react";
import { Auth } from "aws-amplify";

export default class ConfirmSignUp extends Component {
  constructor(props) {
    super(props);
    this.confirmSignUp = this.confirmSignUp.bind(this);
    this.resendCode = this.resendCode.bind(this);
    this.changeState = this.changeState.bind(this);
    this.inputs = {};
    this.state = { message: "", error: "" };
  }

  changeState(state, data) {
    const { onStateChange } = this.props;
    if (onStateChange) {
      onStateChange(state, data);
    }
  }

  confirmSignUp() {
    const username = this.props.authData || this.inputs.username;
    const { code } = this.inputs;

    Auth.confirmSignUp(username, code)
      .then(() => this.confirmSuccess(username))
      .catch(err => this.handleError(err));
  }

  resendCode() {
    const username = this.props.authData || this.inputs.username;

    Auth.resendSignUp(username)
      .then(() => this.setState({ message: "Code sent" }))
      .catch(err => this.handleError(err));
  }

  confirmSuccess(username) {
    this.setState({ message: "", error: "" });
    this.changeState("signIn", username);
  }

  handleError(err) {
    this.setState({ message: "", error: err.message || err });
  }

  render() {
    const { authState, authData } = this.props;
    if (authState !== "confirmSignUp") {
      return null;
    }

    const { message, error } = this.state;

    return (
      <Container text>
        {message && <Message success>{message}</Message>}
        {error && <Message warning>{error}</Message>}
        <Form>
          <Form.Input
            type="text"
            placeholder="Username"
            defaultValue={authData || ""}
            onChange={event => (this.inputs.username = event.target.value)}
            htmlDisabled={!!authData}
          />
          <Form.Input
            type="text"
            placeholder="Code"
            onChange={event => (this.inputs.code = event.target.value)}
            autoFocus
          />
          <Segment>
            <div>
              <a href="#" onClick={() => this.changeState("signIn")}>
                Back to sign in
              </a>
            </div>
          </Segment>
          <Button.Group>
            <Button onClick={this.confirmSignUp}>Confirm</Button>
            <Button onClick={this.resendCode}>Resend</Button>
          </Button.Group>
        </Form>
      </Container>
    );
  }
}
