import React, { Component } from "react";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { Form, Input, Message, TextArea } from "semantic-ui-react";
import { withFormik } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createProject, updateProject } from "../graphql/mutations";

class ProjectForm extends Component {
  static defaultProps = {
    createProject: () => null,
    project: {}
  };

  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date()
    };
  }

  render() {
    const {
      values,
      touched,
      errors,
      handleChange,
      handleBlur,
      handleSubmit,
      setFieldValue
    } = this.props;
    console.log(values);
    return (
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Field
          required
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
        <DatePicker
          name={"startDate"}
          selected={values["startDate"]}
          onChange={e => setFieldValue("startDate", e)}
          placeholderText="Start Date"
        />
        <DatePicker
          name={"endDate"}
          selected={values["endDate"]}
          onChange={e => setFieldValue("endDate", e)}
          placeholderText="End Date"
        />
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
        {errors.tags && touched.tags && <div id="feedback">{errors.tags}</div>}

        <br />
        <br />
        <Message
          success
          header="Project Created!"
          content="Your project was successfully created. Refresh the page to see it added to the list."
        />
        <Form.Button type="submit">Save</Form.Button>
      </Form>
    );
  }
}

export default withFormik({
  enableReinitialize: true,
  mapPropsToValues: props => ({
    name: props.formMode === "edit" ? props.project.name : "",
    description:
      props.formMode === "edit" && props.project.description
        ? props.project.description
        : "",
    tags:
      props.formMode === "edit" && props.project.tags
        ? String(props.project.tags)
        : "",
    startDate:
      props.formMode === "edit" && props.project.startDate
        ? props.project.startDate
        : new Date(),
    endDate:
      props.formMode === "edit" && props.project.endDate
        ? props.project.endDate
        : new Date()
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
    const projectTags = values.tags ? values.tags.split(/[ ,]+/) : [];

    const CreateProjectForm = async () =>
      await API.graphql(
        graphqlOperation(createProject, {
          input: {
            name: values.name,
            description: values.description,
            tags: projectTags,
            startDate: values.startDate,
            endDate: values.endDate,
            created: Date.now()
          }
        })
      );
    const UpdateProjectForm = async () =>
      await API.graphql(
        graphqlOperation(updateProject, {
          input: {
            id: props.project.id,
            name: values.name,
            description: values.description,
            tags: projectTags,
            startDate: values.startDate,
            endDate: values.endDate
          }
        })
      );

    try {
      props.formMode === "edit" ? UpdateProjectForm() : CreateProjectForm();
      console.log("project success: ", {
        id: props.project.id || "",
        name: values.name,
        description: values.description,
        startDate: values.startDate,
        endDate: values.endDate,
        tags: projectTags || values.tags,
        materials: {
          items: values.materials
        },
        created: Date.now()
      });
    } catch {
      console.log("problem adding project: ", values);
    }

    setSubmitting(false);
    //props.history.push("/projects?saved=true");*/
  },

  displayName: "Project Form"
})(ProjectForm);
