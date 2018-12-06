import React, { Component } from "react";
import { Auth, graphqlOperation } from "aws-amplify";
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

class Projects extends Component {
  async getAuthUserId() {
    const authUser = await Auth.currentAuthenticatedUser();

    return authUser.attributes.sub;
  }

  render() {
    return (
      <Container style={{ marginTop: "20px" }}>
        <Modal
          trigger={<Button positive icon="plus" content="Add a Project" />}
          closeIcon
        >
          <Header icon="browser" content="Add a Project" />
          <Modal.Content>
            <ProjectForm formMode="create" />
          </Modal.Content>
        </Modal>

        <Card.Group
          style={{ marginTop: "30px" }}
          itemsPerRow={4}
          stackable={true}
        >
          <Connect
            query={graphqlOperation(listProjects, {
              input: { userId: this.getAuthUserId }
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
      </Container>
    );
  }
}

export default withAuthenticator(Projects);
