import React, { Component } from "react";
import { API, graphqlOperation, Storage } from "aws-amplify";
import { S3Image, withAuthenticator } from "aws-amplify-react";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  Item,
  Message,
  Modal,
  Segment
} from "semantic-ui-react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { getProject } from "../graphql/queries";
import ProjectForm from "./forms/ProjectForm";
import MaterialForm from "./forms/MaterialForm";
import MediaForm from "./forms/MediaForm";
import StepForm from "./forms/StepForm";

class UserProjectDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeModal: "",
      linkCopied: false,
      project: {},
      s3media: []
    };

    this.closeModal = this.closeModal.bind(this);
    this.copyLink = this.copyLink.bind(this);
  }

  async componentWillMount() {
    const project = await API.graphql(
      graphqlOperation(getProject, {
        id: this.props.match.params.projectId,
        userId: this.props.user.id
      })
    );
    project &&
      this.setState({
        project: project.data.getProject
      });
    project.data.getProject.media.items.map(item =>
      Storage.get(item.src).then(data => {
        this.setState({
          s3media: this.state.s3media.concat({
            key: item.src,
            storageUrl: data
          })
        });
      })
    );
  }

  closeModal() {
    this.setState({
      activeModal: ""
    });
  }

  copyLink() {
    this.setState({ linkCopied: true, linkMessageVisible: true });
    setTimeout(() => {
      this.setState({ linkMessageVisible: false });
    }, 2500);
  }

  render() {
    const { history, user } = this.props;

    const materials =
      this.state.project && this.state.project.materials
        ? this.state.project.materials.items
        : [];
    const totalMaterialCost = materials.reduce(
      (prev, cur) => prev + cur.totalCost,
      0
    );

    return (
      <Container>
        <React.Fragment>
          {this.state.linkMessageVisible && (
            <Message positive>
              <p>Project link copied successfully to clipboard!</p>
            </Message>
          )}
          <Container>
            <Modal
              trigger={
                <Button
                  icon="edit outline"
                  floated="right"
                  size="tiny"
                  onClick={() =>
                    this.setState({
                      activeModal: "project"
                    })
                  }
                />
              }
              onClose={this.closeModal}
              open={this.state.activeModal === "project"}
              closeIcon
            >
              <Header icon="edit outline" content="Edit Project" />
              <Modal.Content>
                <ProjectForm
                  formMode="edit"
                  history={history}
                  project={this.state.project}
                  closeModal={this.closeModal}
                  user={user}
                />
              </Modal.Content>
            </Modal>
            <Header as="h2">
              {this.state.project.public && (
                <CopyToClipboard
                  text={window.location.href}
                  onCopy={() => this.copyLink()}
                >
                  <Icon link name="linkify" aria-label="get project link" />
                </CopyToClipboard>
              )}
              <Header.Content>{this.state.project.name}</Header.Content>
            </Header>
            <Divider />
            <Grid>
              <Grid.Column width={4}>
                <Modal
                  trigger={
                    <Button
                      content="Add Material"
                      fluid
                      style={{ marginBottom: "10px" }}
                      onClick={() =>
                        this.setState({
                          activeModal: "material"
                        })
                      }
                    />
                  }
                  onClose={this.closeModal}
                  open={this.state.activeModal === "material"}
                  closeIcon
                >
                  <Header icon="plus" content="Add Material" />
                  <Modal.Content>
                    <MaterialForm
                      formMode="create"
                      project={this.state.project}
                      closeModal={this.closeModal}
                    />
                  </Modal.Content>
                </Modal>
                <Modal
                  trigger={
                    <Button
                      content="Add Media"
                      fluid
                      style={{ marginBottom: "10px" }}
                      onClick={() =>
                        this.setState({
                          activeModal: "media"
                        })
                      }
                    />
                  }
                  onClose={this.closeModal}
                  open={this.state.activeModal === "media"}
                  closeIcon
                >
                  <Header icon="plus" content="Add Media" />
                  <Modal.Content>
                    <MediaForm
                      formMode="create"
                      project={this.state.project}
                      closeModal={this.closeModal}
                    />
                  </Modal.Content>
                </Modal>
                <Modal
                  trigger={
                    <Button
                      content="Add Step"
                      onClick={() =>
                        this.setState({
                          activeModal: "step"
                        })
                      }
                      fluid
                    />
                  }
                  onClose={this.closeModal}
                  open={this.state.activeModal === "step"}
                  closeIcon
                >
                  <Header icon="plus" content="Add Step" />
                  <Modal.Content>
                    <StepForm
                      formMode="create"
                      projectId={this.state.project.id}
                      closeModal={this.closeModal}
                    />
                  </Modal.Content>
                </Modal>
                {this.state.s3media.length > 0 && (
                  <div style={{ marginTop: "15px" }}>
                    <h4>Images</h4>
                    <Image.Group size="tiny" style={{ display: "flex" }}>
                      {this.state.s3media.map(item => (
                        <Modal
                          key={item.key}
                          trigger={
                            <S3Image
                              key={item.key}
                              imgKey={item.key}
                              style={{
                                width: "60px",
                                height: "60px",
                                padding: "0 5px",
                                overflow: "hidden"
                              }}
                            />
                          }
                          closeIcon
                        >
                          <Modal.Content>
                            <Image fluid src={item.storageUrl} />
                          </Modal.Content>
                        </Modal>
                      ))}
                    </Image.Group>
                  </div>
                )}
              </Grid.Column>
              <Grid.Column width={12}>
                <Segment>
                  <h2>Description</h2>
                  <Divider />
                  <div
                    dangerouslySetInnerHTML={{
                      __html: this.state.project.description
                    }}
                  />
                </Segment>
                {materials.length > 0 && (
                  <Segment style={{ margin: "20px 0" }}>
                    <h2>Materials</h2>
                    <p>{`Total Cost: $${parseInt(totalMaterialCost, 10)}`}</p>
                    <Divider />
                    <Item.Group>
                      {materials.map(material => (
                        <Item key={material.id}>
                          <Item.Content>
                            <Item.Header
                              as="a"
                              href={material.productUrl}
                              target="_blank"
                            >
                              {material.name}
                            </Item.Header>
                            <Item.Meta>{`Quantity: ${
                              material.quantityNeeded
                            } / Price: ${material.pricePerItem}`}</Item.Meta>
                            <Item.Extra>
                              <Modal
                                trigger={
                                  <Button
                                    icon="edit outline"
                                    size="tiny"
                                    onClick={() =>
                                      this.setState({
                                        activeModal: `material-${material.id}`
                                      })
                                    }
                                  />
                                }
                                onClose={this.closeModal}
                                open={
                                  this.state.activeModal ===
                                  `material-${material.id}`
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
                                    closeModal={this.closeModal}
                                  />
                                </Modal.Content>
                              </Modal>
                            </Item.Extra>
                          </Item.Content>
                        </Item>
                      ))}
                    </Item.Group>
                  </Segment>
                )}
                {materials.length === 0 && (
                  <Segment placeholder>
                    <Header icon>
                      <Icon name="home" />
                      This project does not have any materials yet.
                    </Header>
                    <Button
                      onClick={() =>
                        this.setState({
                          activeModal: "material"
                        })
                      }
                      primary
                    >
                      Add Material
                    </Button>
                  </Segment>
                )}
              </Grid.Column>
            </Grid>
          </Container>
        </React.Fragment>
      </Container>
    );
  }
}

export default UserProjectDisplay;
