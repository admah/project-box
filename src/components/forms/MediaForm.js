import React, { Component } from "react";
import styled from "styled-components";
import Dropzone from "react-dropzone";
import { API, graphqlOperation, Storage } from "aws-amplify";
import { Form, Header, Icon, Message } from "semantic-ui-react";
import moment from "moment";
import { withFormik } from "formik";
import { createMedia } from "../../graphql/mutations";

const StyledDropzone = styled(Dropzone)`
  border-width: 2px;
  border-color: rgb(102, 102, 102);
  border-style: dashed;
  border-radius: 5px;
  padding: 25px 0 20px;
  width: 100%;
`;

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
      const updatedFilename = this.formatFilename(file.name);

      this.props.values.src.push({ file, updatedFilename });
    });
  };

  onCancel() {
    this.setState({
      files: []
    });
  }

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
        <StyledDropzone
          required
          onDrop={this.onDrop}
          onFileDialogCancel={this.onCancel.bind(this)}
          name="src"
        >
          <Header icon textAlign="center">
            <Icon name="picture" />
            Drag files here or click to add them to your project.
          </Header>
        </StyledDropzone>
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
          <Form.Button type="button" onClick={closeModal}>
            Cancel
          </Form.Button>
        </Form.Group>
      </Form>
    );
  }
}

export default withFormik({
  enableReinitialize: true,

  mapPropsToValues: () => ({ src: [] }),

  handleSubmit: async (values, { props, setSubmitting }) => {
    const CreateMediaForm = async filename =>
      await API.graphql(
        graphqlOperation(createMedia, {
          input: {
            mediaProjectId: props.project.id,
            src: filename
          }
        })
      );

    values.src.forEach(src => {
      try {
        CreateMediaForm(src.updatedFilename);
        Storage.put(src.updatedFilename, src.file, {
          contentType: src.file.type
        })
          .then(result => console.log(result))
          .catch(err => console.log(err));
      } catch {
        console.log("problem adding media: ", values);
      }
    });
    props.closeModal();
    setSubmitting(false);
  },

  displayName: "Media Form"
})(MediaForm);
