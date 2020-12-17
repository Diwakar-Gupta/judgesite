import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Loading from '../loading';

export default class Submission extends Component {
  state = {
    id: this.props.id,
    currentSubmissions: this.props.currentSubmissions,
    submissions: this.props.submissions,
    subLoading: this.props.subLoading,
    suberror:''
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
    if (nextProps.suberror !== prevState.suberror) {
      nd.suberror = nextProps.suberror;
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
        {this.state.suberror&&(<Col className='m-4 p-4'>{this.state.suberror}</Col>)}
        
        <Col>
          {this.state.submissions.map( (sub) => {
            <div>{sub.result}</div>
          })}
        </Col>
      </div>
    );
  }
}
