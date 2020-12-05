import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Course extends Component {
  state = {
    loading: true,
    error: "",
    course: {
      id: this.props.match.params["courseid"],
    },
  };

  componentDidMount() {
    axios
      .get(`/apiv0/course/${this.state.course.id}`)
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

  renderCourse = (course) => {
    return <div className='topic' key={course.key}>course.name</div>;
  };

  render() {
    return (
      <div>
        <h4>Course page</h4>
        {this.state.loading ? (
          <div>Loading....</div>
        ) : (
          <div>
            {this.state.error ? (
              <div>Some thing went wrong</div>
            ) : (
              <div className='course'>{this.state.course.topics.map(this.renderCourse)}</div>
            )}
          </div>
        )}
      </div>
    );
  }
}
