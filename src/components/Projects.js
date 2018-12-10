import React from "react";
import { graphqlOperation } from "aws-amplify";
import { Connect, withAuthenticator } from "aws-amplify-react";
import {
  Button,
  Card,
  Container,
  Dimmer,
  Header,
  Loader,
  Modal
} from "semantic-ui-react";
import { listProjects } from "../graphql/queries";
import { onCreateProject } from "../graphql/subscriptions";
import ProjectCard from "./ProjectCard";
import ProjectForm from "./forms/ProjectForm";

const Projects = ({ authData }) => (
  <Container style={{ marginTop: "20px" }}>
    <Modal
      trigger={<Button positive icon="plus" content="Add a Project" />}
      closeIcon
    >
      <Header icon="browser" content="Add a Project" />
      <Modal.Content>
        <ProjectForm formMode="create" user={authData} />
      </Modal.Content>
    </Modal>
    {authData && (
      <Card.Group
        style={{ marginTop: "30px" }}
        itemsPerRow={4}
        stackable={true}
      >
        <Connect
          query={graphqlOperation(listProjects, {
            input: { userId: authData.attributes.sub }
          })}
          subscription={graphqlOperation(onCreateProject)}
          onSubscriptionMsg={(prev, { onCreateProject }) => {
            console.log(onCreateProject);
            return prev;
          }}
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
    )}
  </Container>
);

export default withAuthenticator(Projects);
