import React, { Component } from "react";
import axios from "axios";
import FileUpload from "./submittion/fileUpload";

export default class Problem extends Component {
  state = {
    code: "",
    description: "",
    name: "",
    loading: true,
  };

  componentDidMount() {
    const code = this.props.match.params.code;
    this.setState({
      code,
    });
    axios
      .get(`/apiv0/problem/${code}`)
      .then((res) => {
        console.log(res);
        const { code, description, name } = res.data.problem;
        console.log(`${code} ${description} ${name}`);
        this.setState({
          code,
          description,
          name,
          loading: false,
        });
      })
      .catch((mes) => console.log(mes));
  }

  render() {
    return (
      <div>
      <h4>problem page</h4>
        {this.state.loading ? (
          <div>loading</div>
        ) : (
          <div className="description">
            <h4>{this.state.name}</h4>
            {this.state.description}
            <FileUpload code={this.state.code}></FileUpload>
          </div>
        )}
      </div>
    );
  }
}
