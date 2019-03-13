import React, { Component } from "react";
import {
  Button,
  Container,
  Form,
  Grid,
  Message,
  Segment
} from "semantic-ui-react";
import { Auth } from "aws-amplify";

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.signUp = this.signUp.bind(this);
    this.changeState = this.changeState.bind(this);
    this.inputs = {};
    this.state = { error: "", signedUp: false };
  }

  changeState(state, data) {
    const { onStateChange } = this.props;
    if (onStateChange) {
      onStateChange(state, data);
    }
  }

  signUp() {
    const { username, password, email, phone_number } = this.inputs;

    Auth.signUp(username, password, email, phone_number)
      .then(() => this.signUpSuccess(username))
      .catch(err => this.signUpError(err));
  }

  signUpSuccess(username) {
    this.setState({ error: "", signedUp: true });

    this.changeState("confirmSignUp", username);
  }

  signUpError(err) {
    let message = err.message || err;
    if (message.startsWith("Invalid phone number")) {
      // reference: https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-settings-attributes.html
      message =
        "Phone numbers must follow these formatting rules: A phone number must start with a plus (+) sign, followed immediately by the country code. A phone number can only contain the + sign and digits. You must remove any other characters from a phone number, such as parentheses, spaces, or dashes (-) before submitting the value to the service. For example, a United States-based phone number must follow this format: +14325551212.";
    }
    this.setState({ error: message });
  }

  render() {
    const { authState } = this.props;
    if (authState !== "signUp") {
      return null;
    }

    const { error } = this.state;

    return (
      <Container text>
        {error && <Message warning>{error}</Message>}
        {this.state.signedUp && (
          <Message positive>
            You've successfully signed up! Please check your email for a
            verfication code.
          </Message>
        )}
        <Form>
          <Form.Field>
            <label>Username</label>
            <Form.Input
              type="text"
              placeholder="Enter letters and numbers only"
              rounded="top"
              onChange={event => (this.inputs.username = event.target.value)}
              autoFocus
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <Form.Input
              type="password"
              placeholder="Minimum 8 characters with at least 1 uppercase, lowercase, and number"
              onChange={event => (this.inputs.password = event.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Email address</label>
            <Form.Input
              type="email"
              onChange={event => (this.inputs.email = event.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Phone number</label>
            <Form.Input
              type="tel"
              placeholder="Must be in +12345678901 format"
              onChange={event =>
                (this.inputs.phone_number = event.target.value)
              }
            />
          </Form.Field>
          <Segment>
            <Grid centered>
              <Grid.Column floated="left" textAlign="center" width={5}>
                <a href="#" onClick={() => this.changeState("signIn")}>
                  Back to sign in
                </a>
              </Grid.Column>
              <Grid.Column floated="right" textAlign="center" width={5}>
                <a href="#" onClick={() => this.changeState("confirmSignUp")}>
                  Confirm a code
                </a>
              </Grid.Column>
            </Grid>
          </Segment>
          <Button primary fluid onClick={this.signUp}>
            Create account
          </Button>
        </Form>
      </Container>
    );
  }
}
