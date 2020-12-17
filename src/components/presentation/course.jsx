import React, { Component } from "react";
import axiosBase from "../../util/axiosWrapper";
import { Link } from "react-router-dom";
import { Jumbotron, Accordion, ListGroup, Card } from "react-bootstrap";
import Loading from "./loading";

export default class Course extends Component {
  state = {
    loading: true,
    error: "",
    course: {
      id: this.props.match.params["courseid"],
      topics:[]
    },
  };

  componentDidMount() {
    axiosBase
      .get(`/apiv0/course/${this.state.course.id}/`)
      .then((res) => {
        console.log('response')
        console.log(res)
        console.log(res.data);
        this.setState({
          loading: false,
          course: res.data,
        });

      })
      .catch((err) => {
        console.log('error')
        // console.log(err.response);
        console.log(err);
        
        if (err.response) {
          if (err.response.status == 404) {
            this.setState({ loading: false, error: "Resourse not available" });
          } else {
            this.setState({ loading: false, error: err.response.data });
          }
        } else {
          this.setState({ loading: false, error: err.message });
        }
      });
  }

  renderTopic = (topic, ind) => {
    ind++;
    return (
      <Card key={topic.ind}>
        <Accordion.Toggle as={Card.Header} eventKey={ind}>
          {topic.name}
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={ind}>
          <Card.Body>
            <ListGroup variant="flush">
              {topic.subtopics.length == 0 ? (
                <div>No sub Topic Available for now</div>
              ) : (
                topic.subtopics.map((subtopic) => (
                  <ListGroup.Item
                    key={subtopic.id}
                    to={`/course/${this.state.course.id}/${subtopic.id}`}
                    as={Link}
                  >
                    {subtopic.name}
                  </ListGroup.Item>
                ))
              )}
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
              <div>{this.state.error}</div>
            ) : (
              <Jumbotron>
                <h3 className="text-center">{course.name}</h3>
                <Accordion defaultActiveKey="0">
                  {this.state.course.topics.length == 0 ? (
                    <div key={'no topic'}>No Topics Available for now</div>
                  ) : (
                    this.state.course.topics.map((topic, ind) =>
                      this.renderTopic(topic, ind)
                    )
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
