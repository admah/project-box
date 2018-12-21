import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Button, Container, Grid } from "semantic-ui-react";
import HomeBG from "../images/building-plan.jpg";

const HomeContainer = styled(Container)`
  background: linear-gradient(
      180deg,
      rgba(50, 140, 193, 0.8) 0%,
      rgba(255, 255, 255, 0.8) 100%
    ),
    url(${HomeBG}) no-repeat;
  background-size: cover;
  height: 100vh;
  margin-top: -50px;

  h1 {
    color: rgba(0, 0, 0, 0.87);
    font-family: "Alfa Slab One", cursive;
    font-weight: 400;
    font-size: 56px;
    letter-spacing: 1px;
    padding-top: 60px;
    text-align: center;
  }
`;

const Home = ({ history }) => (
  <HomeContainer fluid>
    <Grid verticalAlign="middle" centered stackable>
      <Grid.Row>
        <Grid.Column width={8}>
          <h1>Welcome to a community of do-ers and diy-ers.</h1>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={8}>
          <Button.Group size="large" vertical widths={3}>
            <Button color="orange" onClick={() => history.push("/login")}>
              Already a member? Log In
            </Button>
            <br />
            <Button
              color="blue"
              onClick={() => history.push("/signup", [{ authState: "signUp" }])}
            >
              Join the Community
            </Button>
          </Button.Group>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </HomeContainer>
);

Home.propTypes = {
  history: PropTypes.object.isRequired
};

export default Home;
