import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";

export default class FileUpload extends Component {
  state = {
    language: this.props.allowed_languages?.[0]?.key,
    code: "",
    allowed_languages: [],
    error: "",
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      allowed_languages: nextProps.allowed_languages,
      language: this.state.language || nextProps.allowed_languages?.[0]?.key,
    });
    // this.forceUpdate();
  }

  onFileChange = (event) => {
    if (!event.target.files[0]) return;

    const file = event.target.files[0];
    const text = file.text();
    text.then((value) => {
      this.setState({
        code: value,
      });
    });
  };

  handleSubmit = (event) => {
    event.preventdefault?.();
    if (this.state.code.length === 0) {
      this.setState({
        error: "No code in the file",
      });
      return;
    }
    console.log("submit problem");
    console.log(this.state.code);
    console.log(this.state.language);

    if (!this.state.language) {
      this.setState({
        language: this.state.allowed_languages[0].key,
      });
    }
    const language = this.state.language || this.state.allowed_languages[0].key
    this.props.submitCode({
      key: language,
      code: this.state.code,
    });
  };

  render() {
    return (
      <Form onsubmit={this.handleSubmit}>
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Upload Source</Form.Label>
          <Form.Control
            as="select"
            onChange={(event) => {
              this.setState({ language: event.target.value });
            }}
          >
            {this.state.allowed_languages.map((lan) => (
              <option key={lan.key} value={lan.key}>
                {lan.common_name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.File
            id="exampleFormControlFile1"
            onChange={this.onFileChange}
          />
        </Form.Group>
        <Button
          variant="primary"
          disabled={this.state.code.length === 0}
          onClick={this.handleSubmit}
        >
          Submit
        </Button>
      </Form>
    );
  }
}
/*

<form>
          <input type="file" onChange={this.onFileChange} />
        </form>
        <div>{this.state.text}</div>

        */
