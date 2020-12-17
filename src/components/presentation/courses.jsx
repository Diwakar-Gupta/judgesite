import React, { Component } from "react";
import axiosBase from "../../util/axiosWrapper";
import { Link } from "react-router-dom";
import Loading from "./loading";
import { Button, Card, CardColumns } from "react-bootstrap";

export default class Courses extends Component {
  state = {
    loading: true,
    error: "",
    courses: [],
  };

  componentDidMount() {
    axiosBase
      .get("/apiv0/courses/")
      .then((res) => {
        console.log(res.data);
        this.setState({
          loading: false,
          courses: res.data,
          error: "",
        });
      })
      .catch( (err) => {
        if(err.response){
          if(err.response.status == 404){
            this.setState({loading: false, error: 'Resourse not available'})
          }else{
            this.setState({loading: false, error: err.response.data})
          }
        }else{
          this.setState({loading: false, error: err.message})
        }
      });
  }

  renderCourse = (course) => {
    return (
      <Card
        key={course.id}
        
      >
        <Card.Body>
          <Card.Title>{course.name}</Card.Title>
          <Card.Text
            className="text-muted"
          >
            {course.description.substring(0,100)}
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
          <CardColumns>
            {this.state.error ? (
              <div className="text-center">{this.state.error}</div>
            ) : this.state.courses.length === 0 ? (
              <div className="text-center">{"No Course available for u"}</div>
            ) : (
              this.state.courses.length == 0?( <div>No Course For U Now</div> ):
              this.state.courses.map(this.renderCourse)
            )}
          </CardColumns>
        )}
      </div>
    );
  }
}