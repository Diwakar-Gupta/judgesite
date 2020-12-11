import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Card,
  Button,
} from "react-bootstrap";

export default class Editor extends Component {
  state = {
    language: "python3",
  };
  allowedLanguages = this.props.languages || [
    "cpp",
    "java8",
    "java11",
    "python2",
    "python3",
  ];

  render() {
    return (
      <Card className={this.props.className || ""}>
        <Card.Body>
          <Card.Title>
            <Row>
              <Col md={3}>
                <Form.Control
                  as="select"
                  onChange={(event) => {
                    this.setState({ language: event.target.value });
                  }}
                  value={this.state.language || 'python3'}
                >
                  {this.allowedLanguages.map((lan) => (
                    <option key={lan}>{lan}</option>
                  ))}
                </Form.Control>
              </Col>
            </Row>
          </Card.Title>
          <Card.Text>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>
                <Row></Row>
              </Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Card.Text>
        </Card.Body>

        <Card.Footer>
          <Row>
            <Button variant="primary">Run</Button>
            <Button variant="primary">Submit</Button>
          </Row>
        </Card.Footer>
      </Card>
    );
  }
}
