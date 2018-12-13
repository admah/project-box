import React from "react";
import { graphqlOperation } from "aws-amplify";
import { Connect } from "aws-amplify-react";
import { Card, Container, Dimmer, Loader } from "semantic-ui-react";
import { listProjects } from "../graphql/queries";
import ProjectCard from "./ProjectCard";

const Community = () => (
  <Container style={{ marginTop: "30px" }}>
    <h1> Projects from the Community</h1>
    <Card.Group style={{ marginTop: "30px" }} itemsPerRow={4} stackable={true}>
      <Connect
        query={graphqlOperation(listProjects, {
          filter: { public: { eq: true } }
        })}
      >
        {({ data: { listProjects }, loading, error }) => {
          if (error) return <h3>Error</h3>;
          if (loading || !listProjects)
            return (
              <Dimmer active>
                <Loader />
              </Dimmer>
            );
          return listProjects.items.map(project => (
            <ProjectCard key={project.id} {...project} />
          ));
        }}
      </Connect>
    </Card.Group>
  </Container>
);

export default Community;
