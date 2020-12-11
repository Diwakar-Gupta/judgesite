import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";

export default class FileUpload extends Component {
  state = {
    text: "",
    language: "cpp",
  };

  allowedLanguages = this.props.languages || [
    "cpp",
    "java8",
    "java11",
    "python2",
    "python3",
  ];

  onFileChange = (event) => {
    if (!event.target.files[0]) return;

    const file = event.target.files[0];
    const text = file.text();
    text.then((value) => {
      this.setState({
        text: value,
      });
    });
  };

  handleSubmit = (event) => {
    event.preventdefault?.();
    if(this.state.text.length===0)return;
    console.log('submit problem');
    console.log(this.state.text);
    console.log(this.state.language);
    
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
            {this.allowedLanguages.map((lan) => (
              <option key={lan}>{lan}</option>
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
          disabled={this.state.text.length === 0}
          onClick = {this.handleSubmit}
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
