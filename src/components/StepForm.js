import React, { Component } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { Form, Input, Message, TextArea } from "semantic-ui-react";
import { withFormik } from "formik";
import { createStep, updateStep } from "../graphql/mutations";

class StepForm extends Component {
  static defaultProps = {
    createStep: () => null,
    step: {}
  };

  render() {
    const {
      values,
      touched,
      errors,
      handleChange,
      handleBlur,
      handleSubmit,
      closeModal
    } = this.props;
    return (
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Field
          required
          id="form-input-control-step-name"
          control={Input}
          label="Step Name"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.name}
          name="name"
          placeholder="Enter your project name"
        />
        {errors.name && touched.name && <div id="feedback">{errors.name}</div>}
        <Form.Field
          id="form-input-control-step-description"
          control={TextArea}
          label="Step Description"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.description}
          name="description"
          placeholder="Enter a description"
        />
        {errors.description && touched.description && (
          <div id="feedback">{errors.description}</div>
        )}
        <Form.Field
          id="form-input-control-step-time"
          control={Input}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.time}
          name="tags"
          placeholder="(e.g. 10 minutes, 1 hour)"
          icon="clock"
          iconPosition="left"
          label="How long does this step take?"
          labelPosition="right"
        />
        {errors.tags && touched.tags && <div id="feedback">{errors.tags}</div>}

        <br />
        <br />
        <Message
          success
          header="Step Created!"
          content="Your step was successfully created. Refresh the page to see it added to the list."
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
    name: props.formMode === "edit" ? props.step.name : "",
    description:
      props.formMode === "edit" && props.step.description
        ? props.step.description
        : "",
    time: props.formMode === "edit" && props.step.time ? props.step.time : ""
  }),

  // Custom sync validation
  validate: values => {
    const errors = {};

    if (!values.name) {
      errors.name = "Required";
    }

    return errors;
  },

  handleChange: event => {
    console.log(event);
  },

  handleSubmit: (values, { props, setSubmitting }) => {
    console.log(values);

    const CreateStepForm = async () =>
      await API.graphql(
        graphqlOperation(createStep, {
          input: {
            ...values
          }
        })
      );
    const UpdateStepForm = async () =>
      await API.graphql(
        graphqlOperation(updateStep, {
          input: {
            stepProjectid: props.project.id,
            ...values
          }
        })
      );

    try {
      props.formMode === "edit" ? UpdateStepForm() : CreateStepForm();
      props.closeModal();
    } catch {
      console.log("problem adding project: ", values);
    }

    setSubmitting(false);
  },

  displayName: "Step Form"
})(StepForm);
