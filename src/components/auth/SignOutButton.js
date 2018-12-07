import React from "react";
import { Auth } from "aws-amplify";
import { Button } from "semantic-ui-react";

const SignOut = () => <Button inverted onClick={() => Auth.signOut()} />;

export default SignOut;
