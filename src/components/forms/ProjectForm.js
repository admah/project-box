import React, { Component } from "react";
import { API, Auth, graphqlOperation } from "aws-amplify";
import { Button, Confirm, Form, Input, Message } from "semantic-ui-react";
import { withFormik } from "formik";
import DatePicker from "react-datepicker";
import {
  EditorState,
  convertFromHTML,
  convertToRaw,
  ContentState
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "react-datepicker/dist/react-datepicker.css";
import {
  createProject,
  updateProject,
  deleteProject
} from "../../graphql/mutations";
class ProjectForm extends Component {
  static defaultProps = {
    createProject: () => null,
    project: {}
  };

  state = {
    open: false,
    editorState: this.props.project.description
      ? EditorState.createWithContent(
          ContentState.createFromBlockArray(
            convertFromHTML(this.props.project.description)
          )
        )
      : EditorState.createEmpty()
  };

  open = () => this.setState({ open: true });
  close = () => this.setState({ close: true });
  confirmDelete = async () => {
    this.setState({ open: false });
    await API.graphql(
      graphqlOperation(deleteProject, {
        input: {
          id: this.props.project.id
        }
      })
    );
    this.props.history.push("/projects");
  };

  onEditorStateChange = editorState => {
    const rawContentState = convertToRaw(editorState.getCurrentContent());

    this.props.setFieldValue("description", draftToHtml(rawContentState));
    this.setState({
      editorState
    });
  };

  render() {
    const {
      formMode,
      values,
      touched,
      errors,
      handleChange,
      handleBlur,
      handleSubmit,
      setFieldValue
    } = this.props;

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

        <Editor
          wrapperClassName="project-wysiwyg ui textarea segment"
          editorState={this.state.editorState}
          onEditorStateChange={this.onEditorStateChange}
        />

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

        <div style={{ paddingBottom: "40px" }}>
          <Button type="submit" floated="left" positive>
            Save
          </Button>
          {formMode === "edit" && (
            <div>
              <Button
                type="button"
                floated="right"
                onClick={this.open}
                negative
              >
                Delete
              </Button>
              <Confirm
                open={this.state.open}
                onCancel={this.close}
                onConfirm={this.confirmDelete}
                content="Are you sure that you want to delete this project?"
                confirmButton="Yes"
              />
            </div>
          )}
        </div>
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
        ? new Date(props.project.startDate)
        : new Date(),
    endDate:
      props.formMode === "edit" && props.project.endDate
        ? new Date(props.project.endDate)
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

  handleSubmit: async (values, { props, setSubmitting }) => {
    const projectTags = values.tags ? values.tags.split(/[ ,]+/) : [];
    const authUser = await Auth.currentAuthenticatedUser();

    const CreateProjectForm = async () =>
      await API.graphql(
        graphqlOperation(createProject, {
          input: {
            name: values.name,
            userId: authUser ? authUser.attributes.sub : "",
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
            userId: authUser ? authUser.attributes.sub : "",
            description: values.description,
            tags: projectTags,
            startDate: values.startDate,
            endDate: values.endDate
          }
        })
      );

    try {
      props.formMode === "edit" ? UpdateProjectForm() : CreateProjectForm();
      props.closeModal();
    } catch {
      console.log("problem adding project: ", values);
    }

    setSubmitting(false);
    //props.history.push("/projects?saved=true");*/
  },

  displayName: "Project Form"
})(ProjectForm);
