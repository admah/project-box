import React, { Component } from "react";
import { Auth, graphqlOperation } from "aws-amplify";
import { Connect, withAuthenticator } from "aws-amplify-react";
import {
  Button,
  Container,
  Divider,
  Header,
  Item,
  Modal
} from "semantic-ui-react";
import { listMaterials } from "../graphql/queries";
import MaterialForm from "./forms/MaterialForm";

class Materials extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeModal: ""
    };

    this.closeModal = this.closeModal.bind(this);
  }

  async getAuthUserId() {
    const authUser = await Auth.currentAuthenticatedUser();

    return authUser.attributes.sub;
  }

  closeModal() {
    this.setState({
      activeModal: ""
    });
  }

  render() {
    return (
      <Container>
        <h2>All Materials</h2>
        <Divider />
        <Item.Group>
          <Connect
            query={graphqlOperation(listMaterials, {
              input: { userId: this.getAuthUserId }
            })}
          >
            {({ data: { listMaterials }, loading, error }) => {
              if (error) return <h3>Error</h3>;
              if (loading || !listMaterials) return <div />;
              return listMaterials.items.map(material => (
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
                          this.state.activeModal === `material-${material.id}`
                        }
                        closeIcon
                      >
                        <Header icon="edit outline" content="Edit Material" />
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
              ));
            }}
          </Connect>
        </Item.Group>
      </Container>
    );
  }
}

export default withAuthenticator(Materials);
