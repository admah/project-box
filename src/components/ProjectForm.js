import React, { Component } from "react";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { Form, Input, Message, TextArea } from "semantic-ui-react";
import { withFormik } from "formik";
import { createProject } from "../graphql/mutations";

class ProjectForm extends Component {
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
        <Form.Field
          id="form-input-control-project-name"
          control={Input}
          label="Project Name"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.name}
          name="name"
          placeholder="Enter your project name"
        />
        {errors.name && touched.name && <div id="feedback">{errors.name}</div>}
        <Form.Field
          id="form-input-control-project-description"
          control={TextArea}
          label="Project Description"
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
          id="form-input-control-project-tags"
          control={Input}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.tags}
          name="tags"
          placeholder="Enter tags for your project"
          icon="tags"
          iconPosition="left"
          label="Project Tags"
          labelPosition="right"
        />
        {errors.description && touched.description && (
          <div id="feedback">{errors.description}</div>
        )}
        <br />
        <br />
        <Message
          success
          header="Project Created!"
          content="Your project was successfully created. Refresh the page to see it added to the list."
        />
        <Form.Button type="submit">Submit</Form.Button>
      </Form>
    );
  }
}

export default withFormik({
  mapPropsToValues: () => ({
    name: "",
    description: "",
    tags: ""
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
    const projectTags = values.tags.split(/[ ,]+/);
    const ProjectForm = async () =>
      await API.graphql(
        graphqlOperation(createProject, {
          input: {
            name: values.name,
            description: values.description,
            tags: projectTags,
            created: Date.now()
          }
        })
      );
    try {
      //ProjectForm();
      console.log("project added: ", {
        name: values.name,
        description: values.description,
        tags: projectTags,
        created: Date.now()
      });
    } catch {
      console.log("problem adding project: ", values);
    }

    setSubmitting(false);
    //props.history.push("/projects?saved=true");*/
  },

  displayName: "New Project"
})(ProjectForm);
