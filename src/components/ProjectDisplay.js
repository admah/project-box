import React, { Component } from "react";
import Amplify, { graphqlOperation } from "aws-amplify";
import { Connect } from "aws-amplify-react";
import {
  Button,
  Container,
  Dimmer,
  Divider,
  Grid,
  Header,
  Item,
  Loader,
  Modal
} from "semantic-ui-react";
import { getProject } from "../graphql/queries";
import ProjectForm from "./ProjectForm";
import MaterialForm from "./MaterialForm";
import StepForm from "./StepForm";
class ProjectDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false
    };
    this.toggleModal = this.toggleModal.bind(this);
  }
  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  render() {
    const { match } = this.props;

    return (
      <div className="ui container" style={{ marginTop: "80px" }}>
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
                <React.Fragment>
                  <Modal
                    trigger={
                      <Button
                        icon="edit outline"
                        floated="right"
                        size="tiny"
                        onClick={this.toggleModal}
                      />
                    }
                    closeIcon
                    open={this.state.isModalOpen}
                  >
                    <Header icon="edit outline" content="Edit Project" />
                    <Modal.Content>
                      <ProjectForm
                        formMode="edit"
                        project={getProject}
                        toggleModal={this.toggleModal}
                      />
                    </Modal.Content>
                  </Modal>
                  <Container>
                    <h2>{getProject.name}</h2>
                    <Divider />
                    <Grid>
                      <Grid.Column width={4}>
                        <Modal
                          trigger={
                            <Button
                              content="Add Material"
                              fluid
                              style={{ marginBottom: "10px" }}
                            />
                          }
                          closeIcon
                        >
                          <Header icon="plus" content="Add Material" />
                          <Modal.Content>
                            <MaterialForm
                              formMode="create"
                              project={getProject}
                            />
                          </Modal.Content>
                        </Modal>
                        <Modal
                          trigger={<Button content="Add Step" fluid />}
                          closeIcon
                        >
                          <Header icon="plus" content="Add Step" />
                          <Modal.Content>
                            <StepForm
                              formMode="create"
                              projectId={getProject.id}
                            />
                          </Modal.Content>
                        </Modal>
                      </Grid.Column>
                      <Grid.Column width={12}>
                        {getProject.description}

                        <Container style={{ margin: "20px 0" }}>
                          <h3>Project Materials</h3>
                          <Divider />
                          <Item.Group>
                            {getProject.materials &&
                              getProject.materials.items.map(material => (
                                <Item key={material.id}>
                                  <Item.Image
                                    size="tiny"
                                    src="/images/wireframe/image.png"
                                  />
                                  <Item.Content
                                    header={material.name}
                                    meta={`Price: ${material.pricePerItem}`}
                                  />
                                  <Item.Extra>
                                    <Modal
                                      trigger={
                                        <Button
                                          icon="edit outline"
                                          floated="right"
                                          size="tiny"
                                        />
                                      }
                                      closeIcon
                                    >
                                      <Header
                                        icon="edit outline"
                                        content="Edit Material"
                                      />
                                      <Modal.Content>
                                        <MaterialForm
                                          formMode="edit"
                                          material={material}
                                        />
                                      </Modal.Content>
                                    </Modal>
                                  </Item.Extra>
                                </Item>
                              ))}
                          </Item.Group>
                        </Container>
                      </Grid.Column>
                    </Grid>
                  </Container>
                </React.Fragment>
              );
            }}
          </Connect>
        </Container>
      </div>
    );
  }
}

export default ProjectDisplay;
