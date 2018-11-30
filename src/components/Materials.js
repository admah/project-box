import React, { Component } from "react";
import Amplify, { graphqlOperation } from "aws-amplify";
import { Connect } from "aws-amplify-react";
import { Button, Dimmer, Header, Item, Loader, Modal } from "semantic-ui-react";
import { listMaterials } from "../graphql/queries";
import MaterialForm from "./MaterialForm";

class Materials extends Component {
  render() {
    return (
      <div className="ui container" style={{ marginTop: "70px" }}>
        <Item.Group>
          <Connect query={graphqlOperation(listMaterials)}>
            {({ data: { listMaterials }, loading, error }) => {
              if (error) return <h3>Error</h3>;
              if (loading || !listMaterials)
                return (
                  <Dimmer active>
                    <Loader />
                  </Dimmer>
                );
              return listMaterials.items.map(material => (
                <Item key={material.id}>
                  <Item.Image size="tiny" src="/images/wireframe/image.png" />
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
                      <Header icon="edit outline" content="Edit Material" />
                      <Modal.Content>
                        <MaterialForm formMode="edit" material={material} />
                      </Modal.Content>
                    </Modal>
                  </Item.Extra>
                </Item>
              ));
            }}
          </Connect>
        </Item.Group>
      </div>
    );
  }
}

export default Materials;
