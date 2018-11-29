import React, { Component } from "react";
import Amplify, { graphqlOperation } from "aws-amplify";
import { Connect } from "aws-amplify-react";
import { Button, Dimmer, Header, Loader, Modal } from "semantic-ui-react";
import { listProjects } from "../graphql/queries";
import ProjectCard from "./ProjectCard";
import NewProject from "./NewProject";

class Projects extends Component {
  render() {
    return (
      <div className="ui container" style={{ marginTop: "80px" }}>
        <Modal
          trigger={<Button positive icon="plus" content="Add a Project" />}
          closeIcon
        >
          <Header icon="browser" content="Add a Project" />
          <Modal.Content>
            <NewProject />
          </Modal.Content>
        </Modal>

        <div style={{ marginTop: "30px" }}>
          <Connect query={graphqlOperation(listProjects)}>
            {({ data: { listProjects }, loading, error }) => {
              if (error) return <h3>Error</h3>;
              if (loading || !listProjects)
                return (
                  <Dimmer active>
                    <Loader />
                  </Dimmer>
                );
              return listProjects.items.map(project => (
                <ProjectCard
                  key={project.id}
                  name={project.name}
                  description={project.description}
                />
              ));
            }}
          </Connect>
        </div>
      </div>
    );
  }
}

export default Projects;
