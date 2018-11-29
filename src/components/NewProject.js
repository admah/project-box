import React, { Component } from "react";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { Form } from "semantic-ui-react";
import { withFormik, Field } from "formik";
import { createProject } from "../graphql/mutations";

class NewProject extends Component {
  static defaultProps = {
    createProject: () => null
  };

  render() {
    const {
      values,
      touched,
      errors,
      handleChange,
      handleBlur,
      handleSubmit
    } = this.props;
    return (
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Field
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.name}
          name="name"
          placeholder="Enter your project name"
        />
        {errors.name && touched.name && <div id="feedback">{errors.name}</div>}
        <br />
        <Field
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.description}
          name="description"
          placeholder="Enter a description"
        />
        {errors.description && touched.description && (
          <div id="feedback">{errors.description}</div>
        )}
        <br />
        <br />
        <Form.Button type="submit">Submit</Form.Button>
      </Form>
    );
  }
}

export default withFormik({
  mapPropsToValues: () => ({
    name: "",
    description: ""
  }),

  // Custom sync validation
  validate: values => {
    const errors = {};

    if (!values.name) {
      errors.name = "Required";
    }

    return errors;
  },

  handleChange: date => {
    this.setState({
      startDate: date
    });
  },

  handleSubmit: (values, { props, setSubmitting }) => {
    console.log("values", values);
    const newProject = async () =>
      await API.graphql(graphqlOperation(createProject, { input: values }));
    try {
      newProject();
      console.log("project added: ", values);
    } catch {
      console.log("problem adding project: ", values);
    }

    setSubmitting(false);
    //props.history.push("/projects?saved=true");*/
  },

  displayName: "New Project"
})(NewProject);
