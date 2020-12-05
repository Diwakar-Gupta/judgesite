import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Course(course) {
  return <div key={course.key}>
    <Link to={`/course/${course.key}`}>{course.name}</Link>
  </div>;
}

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

  render() {
    return (
      <div>
      <h4>Courses page</h4>
        {this.state.loading ? (
          <div>Loading....</div>
        ) : (
          <div>
            {this.state.error ? (
              <div>error</div>
            ) : (
              this.state.courses.map(Course)
            )}
          </div>
        )}
      </div>
    );
  }
}
