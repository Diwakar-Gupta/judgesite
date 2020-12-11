import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from "./loading";
import { Button, Container, Card } from "react-bootstrap";

export default class Courses extends Component {
  state = {
    loading: true,
    error: "",
    courses: [],
  };

  componentDidMount() {
    axios
      .get("/apiv0/courses")
      .then((res) => {
        console.log(res.data);
        this.setState({
          loading: false,
          courses: res.data,
          error: "",
        });
      })
      .catch(console.log);
  }

  renderCourse = (course) => {
    return (
      <Card
        key={course.id}
        className="m-2 f-3"
        style={{
          "max-width": "30rem",
          "min-width": "20rem",
          "max-height": "12rem",
        }}
      >
        <Card.Body>
          <Card.Title>{course.name}</Card.Title>
          <Card.Text className='text-muted' style={{ overflow: "hidden", "height": "3rem",'font-size':'0.9rem', }}>
            {course.description}
          </Card.Text>
          <Button variant="primary" to={`/course/${course.id}`} as={Link}>
            Continue Course
          </Button>
        </Card.Body>
      </Card>
    );
  };

  render() {
    return (
      <div>
        {this.state.loading ? (
          <div>
            <Loading />
          </div>
        ) : (
          <Container fluid className="d-flex" style={{ "flex-wrap": "wrap" }}>
            {this.state.error ? (
              <div className="text-center">Error</div>
            ) : this.state.courses.length === 0 ? (
              <div className="text-center">{"No Course"}</div>
            ) : (
              this.state.courses.map(this.renderCourse)
            )}
          </Container>
        )}
      </div>
    );
  }
}
