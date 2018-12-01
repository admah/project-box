import React, { Component } from "react";
import Dropzone from "react-dropzone";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { Form, Header, Icon, Input, Message, Segment } from "semantic-ui-react";
import axios from "axios";
import moment from "moment";
import { withFormik } from "formik";
import { createMedia, updateMedia } from "../graphql/mutations";

class MediaForm extends Component {
  static defaultProps = {
    createMedia: () => null
  };

  state = {
    name: "",
    file: null
  };

  onDrop = async acceptedFiles => {
    console.log(acceptedFiles);
    /*const req = request.post("/upload");
    acceptedFiles.forEach(file => {
      req.attach(file.name, file);
    });
    req.end(callback);*/
  };

  uploadToS3 = async (file, signedRequest) => {
    const options = {
      headers: {
        "Content-Type": file.type
      }
    };
    await axios.put(signedRequest, file, options);
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
    const {
      values,
      touched,
      errors,
      handleChange,
      handleBlur,
      handleSubmit,
      closeModal,
      setFieldValue
    } = this.props;
    return (
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Dropzone
          required
          onDrop={this.onDrop}
          onChange={e => {
            setFieldValue("file", this.state.file);
          }}
          name="src"
        >
          <Segment>
            <Header icon>
              <Icon name="picture" />
              Drag files here or click to add them to your project.
            </Header>
          </Segment>
        </Dropzone>

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
    const { file } = this.state;

    const response = await props.s3Sign({
      variables: {
        filename: this.formatFilename(file.name),
        filetype: file.type
      }
    });

    console.log("props: ", props);

    const { signedRequest, url } = response.data.signS3;
    await this.uploadToS3(file, signedRequest);

    const CreateMediaForm = await API.graphql(
      graphqlOperation(createMedia, {
        input: {
          mediaProjectid: props.project.id,
          caption: values.caption,
          src: url
        }
      })
    );
    const UpdateMediaForm = await API.graphql(
      graphqlOperation(updateMedia, {
        input: {
          mediaProjectid: props.project.id,
          ...values
        }
      })
    );

    try {
      //props.formMode === "edit" ? UpdateMediaForm() : CreateMediaForm();
      //props.closeModal();
      console.log(props);
      console.log(values);
    } catch {
      console.log("problem adding project: ", values);
    }

    setSubmitting(false);
  },

  displayName: "Media Form"
})(MediaForm);
