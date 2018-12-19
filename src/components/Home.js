import React from "react";
import styled from "styled-components";
import { Container } from "semantic-ui-react";
import HomeBG from "../images/building-plan.jpg";

const HomeMasthead = styled.section`
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
    font-size: 42px;
    padding-top: 60px;
    text-align: center;
  }
`;

const Home = () => (
  <Container fluid>
    <HomeMasthead />
  </Container>
);

export default Home;
