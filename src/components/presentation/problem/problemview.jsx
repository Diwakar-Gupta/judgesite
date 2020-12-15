import React, { Component } from "react";
import axiosBase from "../../../util/axiosWrapper";
// import FileUpload from "./submittion/fileUpload";
import Loading from "../loading";
import { Tabs, Tab, Container, Row, Col } from "react-bootstrap";
import SideBar from "./sideBar";
import RenderProblem from "./renderProblem";
import Editor from "./editor";
import Submission from "./submission";

export default class ProblemView extends Component {
  state = {
    code: this.props.match.params.problemcode,
    courseid: this.props.match.params.courseid,
    subtopicid: this.props.match.params.subtopicid,
    problem: {
      code: this.props.match.params.problemcode,
      allowed_languages: [],
    },
    submissions: [],
    currentSubmissions: null,
    subLoading: false,
    page: this.props.match.params.page || "problem",
    error: "",
  };

  componentDidMount() {
    const { courseid, subtopicid, code } = this.state;
    this.setState({
      subLoading:true
    })
    axiosBase
      .get(`/apiv0/course/${courseid}/${subtopicid}/${code}/submission/2/`)
      .then((sub) => {
        this.setState({
          currentSubmissions: sub.data,
          subLoading: false,
        });
      })
      .catch((err) => {
        this.setState({
          subLoading: false,
        });
      });
  }

  moveToPage = (page) => {
    const { courseid, subtopicid, code } = this.state;
    this.props.history.push(
      `/course/${courseid}/${subtopicid}/${code}/${page}`
    );
    this.setState({ page });
  };

  renderSubmission = () => {
    const { submissions, currentSubmissions } = this.state;
    return (
      <div>
        <Submission
          subLoading={this.state.subLoading}
          currentSubmissions={currentSubmissions}
          submissions={submissions}
        />
      </div>
    );
  };

  submitCode = (packet) => {
    console.log(packet);
    const { courseid, subtopicid, code } = this.state;
    axiosBase
      .post(
        `/apiv0/course/${courseid}/${subtopicid}/${code}/submission/`,
        packet
      )
      .then((res) => {
        console.log(res);
        this.setState({ subLoading: true });
        this.moveToPage("submission");
        const id = res.data;
        axiosBase
          .get(
            `/apiv0/course/${courseid}/${subtopicid}/${code}/submission/${id}/`
          )
          .then((sub) => {
            this.setState({
              currentSubmissions: sub.data,
              subLoading: false,
            });
          })
          .catch((err) => {
            this.setState({
              subLoading: false,
            });
          });
      });
  };

  renderProblem = () => {
    const problem = this.state.problem;

    if (problem.description) {
      return (
        <RenderProblem className="p-4" problembody={problem.description} />
      );
    } else {
      if (this.state.problem.error)
        return <div className="text-center p-4">Error</div>;

      const { courseid, subtopicid, code } = this.state;
      axiosBase
        .get(`/apiv0/course/${courseid}/${subtopicid}/${code}/`)
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

      return (
        <div className="text-center p-4">
          <Loading />
        </div>
      );
    }
  };

  render() {
    const { page } = this.state;
    const problemname = this.state.problem.name || "";
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
                <Tab eventKey="problem" title="Problem">
                  <Container style={{ "min-height": "20rem" }}>
                    <this.renderProblem />
                  </Container>
                </Tab>
                <Tab eventKey="submission" title="Submission">
                  <this.renderSubmission />
                </Tab>
                <Tab eventKey="contact" title="Contact">
                  <div>contact</div>
                </Tab>
                <Tab eventKey="editor" title="editor">
                  <Editor
                    allowed_languages={this.state.problem.allowed_languages}
                    submitCode={this.submitCode}
                    className="shadow mt-5 mb-3"
                  />
                </Tab>
              </Tabs>
            </Container>
          </Col>
          <Col md={3}>
            <SideBar
              submitCode={this.submitCode}
              allowed_languages={this.state.problem.allowed_languages}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}
