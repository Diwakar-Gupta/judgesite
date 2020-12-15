import React, { Component } from "react";
import axios from "../../../util/axiosWrapper";
import { Container, Row, Col } from "react-bootstrap";
import Loading from '../loading';

export default class Submission extends Component {
  state = {
    id: this.props.id,
    currentSubmissions: this.props.currentSubmissions,
    submissions: this.props.submissions,
    subLoading: this.props.subLoading
  };

  

  static getDerivedStateFromProps(nextProps, prevState) {
    const nd = {};
    if (nextProps.currentSubmissions !== prevState.currentSubmissions) {
      nd.currentSubmissions = nextProps.currentSubmissions;
    }
    if (nextProps.submissions !== prevState.submissions) {
      nd.submissions = nextProps.submissions;
    }
    if (nextProps.subLoading !== prevState.subLoading) {
      nd.subLoading = nextProps.subLoading;
    }
    return nd;
  }

  render() {
    const currsub = this.state.currentSubmissions;
    return (
      <div>
        <Col>
          {this.state.subLoading?(<Loading/>):(
            <div>{currsub?.result}</div>
          )}
        </Col>
        <Col>
          {this.state.submissions.map( (sub) => {
            <div>{sub.result}</div>
          })}
        </Col>
      </div>
    );
  }
}
