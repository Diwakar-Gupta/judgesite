import React, { Component } from "react";
import axios from "axios";
// import FileUpload from "./submittion/fileUpload";
import Loading from "../loading";
import { Tabs, Tab, Container, Row, Col } from "react-bootstrap";
import SideBar from "./sideBar";
import RenderProblem from "./renderProblem";
import Editor from "./editor";

export default class ProblemView extends Component {
  state = {
    code: this.props.match.params.problemcode,
    courseid: this.props.match.params.courseid,
    subtopicid: this.props.match.params.subtopicid,
    problem: {
      code: this.props.match.params.problemcode,
    },
    submissions: {},
    page: this.props.match.params.page || "problem",
    loading: true,
    error: "",
  };

  moveToPage = (page) => {
    const { courseid, subtopicid, code } = this.state;
    this.props.history.push(
      `/course/${courseid}/${subtopicid}/${code}/${page}`
    );
    this.setState({ page });
  };

  renderSubmission = () => {
    return <div>submission</div>;
  };

  renderProblem = () => {
    const problem = this.state.problem;

    if (problem.description) {
      return (
        <RenderProblem className="p-4" problembody={problem.description} />
      );
    } else {
      const { courseid, subtopicid, code } = this.state;
      axios
        .get(`/apiv0/course/${courseid}/${subtopicid}/${code}`)
        .then((res) => {
          console.log(res);
          this.setState({
            problem: res.data.problem,
          });
        })
        .catch((err) =>
          this.setState({
            problem: { ...problem, error: err },
          })
        );
      return this.state.problem.error ? (
        <div className="text-center">Error</div>
      ) : (
        <div className="text-center">
          <Loading />
        </div>
      );
    }
  };

  render() {
    const { page } = this.state;
    const problemname = this.state.problem.name;
    return (
      <Container>
        <Row className="p-2 mb-3">
          <h3>
            <strong>{problemname}</strong>
          </h3>
        </Row>
        <Row>
          <Col md={9}>
            <Container className="shadow bg-white pt-3">
              <Tabs
                id="controlled-tab-example"
                activeKey={page}
                onSelect={(page) => this.moveToPage(page)}
              >
                <Tab eventKey="problem" title="Problem" className="">
                  <this.renderProblem />
                </Tab>
                <Tab eventKey="submission" title="Submission" className="">
                  <this.renderSubmission />
                </Tab>
                <Tab eventKey="contact" title="Contact">
                  <div>contact</div>
                </Tab>
              </Tabs>
            </Container>
            <Editor className="shadow mt-5 mb-3" />
          </Col>
          <Col md={3}>
            <SideBar />
          </Col>
        </Row>
      </Container>
    );
  }
}
