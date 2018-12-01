import React, { Component } from "react";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { Form, Input, Message } from "semantic-ui-react";
import { withFormik } from "formik";
import { createMaterial, updateMaterial } from "../graphql/mutations";

class MaterialForm extends Component {
  static defaultProps = {
    createMaterial: () => null,
    material: {}
  };

  render() {
    const {
      values,
      handleChange,
      handleBlur,
      handleSubmit,
      closeModal
    } = this.props;
    return (
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Group inline>
          <Form.Field
            required
            id="form-input-control-material-name"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            control={Input}
            placeholder="Name"
            width={10}
          />
          <Form.Field
            name="quantityNeeded"
            id="form-input-control-material-quantity-needed"
            value={values.quantityNeeded}
            onChange={handleChange}
            onBlur={handleBlur}
            control={Input}
            placeholder="Qty."
            width={2}
            type="number"
          />
          <Form.Field
            name="pricePerItem"
            id="form-input-control-material-price"
            value={values.pricePerItem}
            onChange={handleChange}
            onBlur={handleBlur}
            control={Input}
            placeholder="Unit Price"
            width={3}
            type="number"
          />
        </Form.Group>

        <Form.Field
          name="productUrl"
          id="form-input-control-material-product-url"
          value={values.productUrl}
          onChange={handleChange}
          onBlur={handleBlur}
          control={Input}
          placeholder="External Product URL"
        />

        <br />
        <br />
        <Message
          success
          header="Materials Added!"
          content="Your materials were successfully added. Refresh the page to see it added to the list."
        />
        <Form.Group>
          <Form.Button type="submit" positive>
            Submit
          </Form.Button>
          <Form.Button type="button" onClick={closeModal} negative>
            Cancel
          </Form.Button>
        </Form.Group>
      </Form>
    );
  }
}

export default withFormik({
  enableReinitialize: true,
  mapPropsToValues: props => ({
    name: props.formMode === "edit" ? props.material.name : "",
    quantityNeeded:
      props.formMode === "edit" ? props.material.quantityNeeded : "",
    pricePerItem: props.formMode === "edit" ? props.material.pricePerItem : "",
    productUrl: props.formMode === "edit" ? props.material.productUrl : ""
  }),

  handleChange: event => {
    console.log(event);
  },

  handleSubmit: (values, { props, setSubmitting }) => {
    const CreateMaterialForm = async () =>
      await API.graphql(
        graphqlOperation(createMaterial, {
          input: {
            name: values.name,
            quantityNeeded: values.quantityNeeded,
            materialProjectId: props.project.id,
            pricePerItem: values.pricePerItem,
            totalCost: values.quantityNeeded * values.pricePerItem,
            productUrl: values.productUrl
          }
        })
      );

    const UpdateMaterialForm = async () =>
      await API.graphql(
        graphqlOperation(updateMaterial, {
          input: {
            id: props.material.id,
            name: values.name,
            quantityNeeded: values.quantityNeeded,
            pricePerItem: values.pricePerItem,
            totalCost: values.quantityNeeded * values.pricePerItem,
            productUrl: values.productUrl
          }
        })
      );

    try {
      props.formMode === "edit" ? UpdateMaterialForm() : CreateMaterialForm();
      props.closeModal();
    } catch {
      console.log("problem adding materials: ", {
        ...values
      });
    }

    setSubmitting(false);
  },

  displayName: "Material Form"
})(MaterialForm);
