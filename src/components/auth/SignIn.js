import React, { Component } from "react";
import PropTypes from "prop-types";
import { Auth, JS } from "aws-amplify";
import {
  Button,
  Container,
  Icon,
  Form,
  Message,
  Segment
} from "semantic-ui-react";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.signIn = this.signIn.bind(this);
    this.checkContact = this.checkContact.bind(this);
    this.changeState = this.changeState.bind(this);
    this.inputs = {};
    this.state = {
      error: ""
    };
  }

  changeState(state, data) {
    const { onStateChange } = this.props;
    if (onStateChange) {
      onStateChange(state, data);
    }
  }

  signIn() {
    const { username, password } = this.inputs;

    Auth.signIn(username, password)
      .then(user => this.signInSuccess(user))
      .catch(err => this.signInError(err));
  }

  signInSuccess(user) {
    this.setState({ error: "" });

    if (
      user.challengeName === "SMS_MFA" ||
      user.challengeName === "SOFTWARE_TOKEN_MFA"
    ) {
      this.changeState("confirmSignIn", user);
    } else {
      this.checkContact(user);
    }

    this.props.onAwsLogin(user);
  }

  signInError(err) {
    this.setState({ error: err.message || err });
  }

  checkContact(user) {
    Auth.verifiedContact(user).then(data => {
      if (!JS.isEmpty(data.verified)) {
        this.changeState("signedIn", user);
        if (this.props.location.state && this.props.location.state.referrer) {
          this.props.history.push(this.props.location.state.referrer);
        } else {
          this.props.history.push("/user/projects");
        }
      } else {
        user = Object.assign(user, data);
        this.changeState("verifyContact", user);
      }
    });
  }

  render() {
    const { authState, authData } = this.props;
    if (!["signIn", "signedOut", "signedUp"].includes(authState)) {
      return null;
    }

    const { error } = this.state;

    return (
      <Container text>
        {error && (
          <Message negative>
            <Icon name="warning" />
            {error}
          </Message>
        )}
        {this.props.location.state && this.props.location.state.referrer && (
          <Message warning>
            Please log in or sign up to view the shared link.
          </Message>
        )}
        <Form>
          <Segment stacked>
            <Form.Input
              type="text"
              placeholder="Username"
              border="bottom-0"
              defaultValue={authData || ""}
              onChange={event => (this.inputs.username = event.target.value)}
              autoFocus
            />
            <Form.Input
              type="password"
              placeholder="Password"
              onChange={event => (this.inputs.password = event.target.value)}
            />
            <Button primary fluid onClick={this.signIn}>
              Sign In
            </Button>
          </Segment>
        </Form>
        <Message style={{ textAlign: "center" }}>
          <span className="left item" style={{ paddingRight: "30px" }}>
            No account?{" "}
            <a href="#" onClick={() => this.changeState("signUp")}>
              Sign up
            </a>
          </span>
          <span className="right item">
            <a href="#" onClick={() => this.changeState("forgotPassword")}>
              Forgot password
            </a>
          </span>
        </Message>
      </Container>
    );
  }
}

SignIn.propTypes = {
  authData: PropTypes.object,
  authState: PropTypes.string,
  history: PropTypes.object.isRequired,
  location: PropTypes.object,
  onAwsLogin: PropTypes.func.isRequired
};

export default SignIn;
