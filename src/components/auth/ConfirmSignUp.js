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

    const style = {
      width: "20rem",
      input: { borderRadius: "0" },
      links: { fontSize: "0.9em" },
      button: { width: "100%" },
      alert: { fontSize: "0.8em" }
    };

    const { message, error } = this.state;

    return (
      <Container text>
        <Form style={style}>
          <Form.Input
            type="text"
            placeholder="Username"
            defaultValue={authData || ""}
            rounded="top"
            border="bottom-0"
            style={style.input}
            onChange={event => (this.inputs.username = event.target.value)}
            htmlDisabled={!!authData}
          />
          <Form.Input
            type="text"
            placeholder="Code"
            rounded="bottom"
            style={style.input}
            onChange={event => (this.inputs.code = event.target.value)}
            autoFocus
          />
          <Segment my="2" style={style.links}>
            <div class=" floated left">
              <a
                href="#"
                preventDefault
                onClick={() => this.changeState("signIn")}
              >
                Back to sign in
              </a>
            </div>
          </Segment>
          <Button.Group style={style.button}>
            <Button primary flex="grow-1" onClick={this.confirmSignUp}>
              Confirm
            </Button>
            <Button success flex="grow-1" onClick={this.resendCode}>
              Resend
            </Button>
          </Button.Group>
          {message && (
            <Message success mt="3" text="left" style={style.alert}>
              {message}
            </Message>
          )}
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
