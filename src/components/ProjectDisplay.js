import React, { Component } from "react";
import Amplify, { graphqlOperation } from "aws-amplify";
import { Connect } from "aws-amplify-react";
import {
  Button,
  Container,
  Dimmer,
  Divider,
  Header,
  Loader,
  Modal
} from "semantic-ui-react";
import { getProject } from "../graphql/queries";
import ProjectForm from "./ProjectForm";
import ProjectCard from "./ProjectCard";

const ProjectDisplay = ({ match }) => (
  <div className="ui container" style={{ marginTop: "80px" }}>
    <Modal
      trigger={<Button icon="edit outline" floated="right" size="tiny" />}
      closeIcon
    >
      <Header icon="edit outline" content="Edit Project" />
      <Modal.Content>
        <ProjectForm mode="edit" projectId={match.params.projectId} />
      </Modal.Content>
    </Modal>

    <Container style={{ marginTop: "30px" }}>
      <Connect
        query={graphqlOperation(getProject, { id: match.params.projectId })}
      >
        {({ data: { getProject }, loading, error }) => {
          if (error) return <h3>Error</h3>;
          if (loading || !getProject)
            return (
              <Dimmer active>
                <Loader />
              </Dimmer>
            );
          return (
            <div>
              <h3>{getProject.name}</h3>
              <Divider />
              <p>{getProject.description}</p>
            </div>
          );
        }}
      </Connect>
    </Container>
  </div>
);

export default ProjectDisplay;
