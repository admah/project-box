import React from "react";
import { graphqlOperation } from "aws-amplify";
import { Connect, S3Image } from "aws-amplify-react";
import {
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  Item,
  Loader,
  Segment
} from "semantic-ui-react";
import { getProject } from "../graphql/queries";

const CommunityProjectDisplay = ({ match }) => (
  <Container style={{ marginTop: "60px" }}>
    <Connect
      query={graphqlOperation(getProject, { id: match.params.projectId })}
    >
      {({ data: { getProject }, loading, error }) => {
        if (error) return <h3>Error</h3>;
        if (loading || !getProject) return <Loader active inline="centered" />;
        const materials = getProject.materials.items;
        const totalMaterialCost = materials.reduce(
          (prev, cur) => prev + cur.totalCost,
          0
        );

        return (
          <Container>
            <Header as="h2">
              <Header.Content>{getProject.name}</Header.Content>
            </Header>
            <Divider />
            <Grid>
              <Grid.Column width={4}>
                {getProject.media.items.length > 0 && (
                  <div style={{ marginTop: "15px" }}>
                    <h4>Images</h4>
                    <Image.Group size="tiny" style={{ display: "flex" }}>
                      {getProject.media.items.map(item => (
                        <S3Image
                          key={item.src}
                          imgKey={item.src}
                          style={{
                            width: "60px",
                            height: "60px",
                            padding: "0 5px",
                            overflow: "hidden"
                          }}
                        />
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
                      __html: getProject.description
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
      }}
    </Connect>
  </Container>
);

export default CommunityProjectDisplay;
