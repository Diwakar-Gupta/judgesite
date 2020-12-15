import React, { Component } from "react";
import axiosBase from "../../util/axiosWrapper";
import { Link } from "react-router-dom";
import {
  Jumbotron,
  Accordion,
  ListGroup,
  Card,
} from "react-bootstrap";
import Loading from "./loading";

export default class Course extends Component {
  state = {
    loading: true,
    error: "",
    course: {
      id: this.props.match.params["courseid"],
    },
  };

  componentDidMount() {
    axiosBase
      .get(`/apiv0/course/${this.state.course.id}/`)
      .then((res) => {
        console.log(res.data);
        this.setState({
          loading: false,
          course: res.data,
        });
      })
      .catch((mes) => {
        console.log(mes);
        this.setState({
          loading: false,
          error: "Some thing went wrong",
        });
      })
      .catch(console.log);
  }

  renderCourse = (topic, ind) => {
    ind++;
    return (
      <Card key={topic.ind}>
        <Accordion.Toggle as={Card.Header} eventKey={ind}>
          {topic.name}
        </Accordion.Toggle>
        {/* <Card.Header>
          <Accordion.Toggle as={Button} variant eventKey={ind}>
            
          </Accordion.Toggle>
        </Card.Header> */}
        <Accordion.Collapse eventKey={ind}>
          <Card.Body>
            <ListGroup variant="flush">
              {topic.subtopics.map((subtopic) => (
                <ListGroup.Item
                  key={subtopic.id}
                  to={`/course/${this.state.course.id}/${subtopic.id}`}
                  as={Link}
                >
                  {subtopic.name}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    );
  };

  render() {
    const { course } = this.state;
    return (
      <div>
        {this.state.loading ? (
          <div className="text-center">
            <Loading />
          </div>
        ) : (
          <div>
            {this.state.error ? (
              <div>Some thing went wrong</div>
            ) : (
              <Jumbotron>
                <h3 className="text-center">{course.name}</h3>
                <Accordion defaultActiveKey="0">
                  {this.state.course.topics.map((topic, ind) =>
                    this.renderCourse(topic, ind)
                  )}
                </Accordion>
              </Jumbotron>
            )}
          </div>
        )}
      </div>
    );
  }
}
