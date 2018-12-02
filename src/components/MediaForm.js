import React, { Component } from "react";
import Dropzone from "react-dropzone";
import { API, graphqlOperation, Storage } from "aws-amplify";
import { Form, Header, Icon, Message, Segment } from "semantic-ui-react";
import moment from "moment";
import { withFormik } from "formik";
import { createMedia } from "../graphql/mutations";

class MediaForm extends Component {
  static defaultProps = {
    createMedia: () => null
  };

  state = {
    name: "",
    files: []
  };

  onDrop = async acceptedFiles => {
    this.setState({
      files: this.state.files.concat(acceptedFiles)
    });

    acceptedFiles.forEach(file => {
      this.props.setFieldValue("src", file.name);

      Storage.put(file.name, file, {
        contentType: file.type
      })
        .then(result => console.log(result))
        .catch(err => console.log(err));
    });
  };

  formatFilename = filename => {
    const date = moment().format("YYYYMMDD");
    const randomString = Math.random()
      .toString(36)
      .substring(2, 7);
    const cleanFileName = filename.toLowerCase().replace(/[^a-z0-9]/g, "-");
    const newFilename = `images/${date}-${randomString}-${cleanFileName}`;
    return newFilename.substring(0, 60);
  };

  render() {
    const { handleSubmit, closeModal } = this.props;
    return (
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Dropzone required onDrop={this.onDrop} name="src">
          <Segment>
            <Header icon>
              <Icon name="picture" />
              Drag files here or click to add them to your project.
            </Header>
          </Segment>
        </Dropzone>
        {this.state.files.length > 0 &&
          this.state.files.map(file => <p key={file.name}>{file.name}</p>)}
        <br />
        <br />
        <Message
          success
          header="Media Added!"
          content="Your media was successfully added. Refresh the page to see it."
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
    src: props.formMode === "edit" && props.media.src ? props.media.src : ""
  }),

  handleSubmit: async (values, { props, setSubmitting }) => {
    console.log("values: ", values);
    console.log("props: ", props);

    const CreateMediaForm = await API.graphql(
      graphqlOperation(createMedia, {
        input: {
          mediaProjectId: props.project.id,
          src: values.src
        }
      })
    );

    try {
      CreateMediaForm();
      props.closeModal();
      console.log("success adding media: ", values);
    } catch {
      console.log("problem adding media: ", values);
    }

    setSubmitting(false);
  },

  displayName: "Media Form"
})(MediaForm);
