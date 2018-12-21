import React from "react";
import PropTypes from "prop-types";
import { graphqlOperation } from "aws-amplify";
import { Connect, withAuthenticator } from "aws-amplify-react";
import {
  Button,
  Card,
  Container,
  Header,
  Loader,
  Modal
} from "semantic-ui-react";
import { listProjects } from "../graphql/queries";
import { onCreateProject } from "../graphql/subscriptions";
import ProjectCard from "./ProjectCard";
import ProjectForm from "./forms/ProjectForm";

const UserProjects = ({ user }) => (
  <Container>
    <Modal
      trigger={<Button positive icon="plus" content="Add a Project" />}
      closeIcon
    >
      <Header icon="browser" content="Add a Project" />
      <Modal.Content>
        <ProjectForm formMode="create" user={user} />
      </Modal.Content>
    </Modal>
    {user && (
      <Card.Group
        style={{ marginTop: "30px" }}
        itemsPerRow={4}
        stackable={true}
      >
        <Connect
          query={graphqlOperation(listProjects, {
            input: { userId: user.id }
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
              return <Loader active inline="centered" />;
            return listProjects.items.map(project => (
              <ProjectCard key={project.id} {...project} />
            ));
          }}
        </Connect>
      </Card.Group>
    )}
  </Container>
);

UserProjects.propTypes = {
  authData: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default UserProjects;
