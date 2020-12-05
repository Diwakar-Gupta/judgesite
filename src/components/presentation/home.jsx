import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Home extends Component {
  state = {
    problems: [],
  };

  componentDidMount() {
    axios.get("/apiv0/problems").then((res) => {
      console.log(res);
      this.setState({ problems: res.data.problems });
    });
  }

  render() {
    return (
      <div>
      <h4>home page</h4>
        {this.state.problems.map((value) => (
          <Link key={value.code} to={value.code}>
            {value.name}
          </Link>
        ))}
      </div>
    );
  }
}
