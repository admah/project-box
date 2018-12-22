import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { API, graphqlOperation, Storage } from "aws-amplify";
import { S3Image } from "aws-amplify-react";
import {
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  Item,
  Modal,
  Segment
} from "semantic-ui-react";
import { getProject } from "../graphql/queries";

const TagA = styled.a`
  :after {
    content: ", ";
  }

  :last-of-type:after {
    content: "";
  }
`;

class CommunityProjectDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: {},
      s3media: []
    };
  }

  async componentWillMount() {
    const project = await API.graphql(
      graphqlOperation(getProject, {
        id: this.props.match.params.projectId
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

  render() {
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
        <Header as="h2">
          <Header.Content>{this.state.project.name}</Header.Content>
        </Header>
        <Divider />
        <Grid>
          <Grid.Column width={4}>
            <h4>Tags</h4>
            {this.state.project.tags && this.state.project.tags.length > 0 ? (
              this.state.project.tags.map(tag => (
                <TagA href={`/community/${tag}`}>{tag}</TagA>
              ))
            ) : (
              <p>This project has no tags.</p>
            )}
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
              </Segment>
            )}
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

CommunityProjectDisplay.propTypes = {
  match: PropTypes.object.isRequired
};

export default CommunityProjectDisplay;
