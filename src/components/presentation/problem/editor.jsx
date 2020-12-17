import React, { Component } from "react";
import { Row, Col, Form, Card, Button } from "react-bootstrap";

export default class Editor extends Component {
  state = {
    language: this.props.allowed_languages?.[0]?.key,
    code: "",
    allowed_languages: [],
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const nd = {};
    if (
      nextProps.allowed_languages &&
      nextProps.allowed_languages !== prevState.allowed_languages
    ) {
      nd.allowed_languages = nextProps.allowed_languages;
    }
    if (nextProps.language && nextProps.language !== prevState.language) {
      nd.language = prevState.language || nextProps.allowed_languages?.[0]?.key;
    }
    return nd;
  }

  setCode = (event) => {
    const code = event.target.value;
    this.setState({
      code,
    });
  };

  submit = () => {
    const language = this.state.language || this.state.allowed_languages[0].key
    this.props.submitCode({ key: language, code: this.state.code });
  };

  render() {
    return (
      <Card className={this.props.className || ""}>
        <Card.Body>
          <Card.Title>
            <Row>
              <Col md={3}>
                <Form.Control
                  as="select"
                  onChange={(valu) => {
                    this.setState({ language: valu.target.value });
                  }}
                  disabled={!this.props.allowed_languages.length ? true : false}
                  value={this.state.language}
                >
                  {this.props.allowed_languages &&
                    this.props.allowed_languages.map((lan, ind) => (
                      <option value={lan.key} key={lan.key}>
                        {lan.common_name}
                      </option>
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
              <Form.Control
                disabled={!this.props.allowed_languages.length ? true : false}
                as="textarea"
                rows={20}
                onChange={this.setCode}
              />
            </Form.Group>
          </Card.Text>
        </Card.Body>

        <Card.Footer>
          <Row>
            <Col></Col>
            <Col>
              <Button variant="primary">Run</Button>
            </Col>
            <Col>
              <Button variant="primary" onClick={this.submit}>
                Submit
              </Button>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    );
  }
}
