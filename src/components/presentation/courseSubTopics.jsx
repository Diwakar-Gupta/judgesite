import React, { Component } from "react";
import axiosBase from "../../util/axiosWrapper";
import { Link } from "react-router-dom";
import { Jumbotron, ListGroup } from "react-bootstrap";
import Loading from './loading';

export default class CourseSubTopics extends Component {
  state = {
    loading: true,
    error: "",
    courseid: this.props.match.params["courseid"],
    topic: {
      id: this.props.match.params["subtopicid"],
    },
  };

  componentDidMount() {
    axiosBase
      .get(`/apiv0/course/${this.state.courseid}/${this.state.topic.id}/`)
      .then((res) => {
        console.log(res.data);
        this.setState({
          loading: false,
          topic: res.data,
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

  renderProblem = (problem, ind) => {
    ind++;
    return (
      <ListGroup.Item
        key={problem.code}
        to={`/course/${this.state.courseid}/${this.state.topic.id}/${problem.code}`}
        as={Link}
      >
        {problem.name}
      </ListGroup.Item>
    );
  };

  render() {
    const { problems } = this.state.topic;
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
                <h3 className="text-center">{this.state.topic.name}</h3>
                <ListGroup variant="flush">
                  {problems.map(this.renderProblem)}
                </ListGroup>
              </Jumbotron>
            )}
          </div>
        )}
      </div>
    );
  }
}
