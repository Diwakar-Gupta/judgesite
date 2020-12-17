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
    },
    allowed_languages: [],
    problemloading: false,
    errorProblem: "",

    submissions: [],
    currentSubmissions: null,
    subLoading: false,
    suberror: "",

    page: this.props.match.params.page || "problem",
    error: "",
  };

  /* componentDidMount() {
    const { courseid, subtopicid, code } = this.state;
    this.setState({
      subLoading: true,
    });
    axiosBase
      .get(`/apiv0/course/${courseid}/${subtopicid}/${code}/submission/2/`)
      .then((sub) => {
        this.setState({
          currentSubmissions: sub.data,
          subLoading: false,
        });
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status == 404) {
            this.setState({ subLoading: false, error: "Resourse not available" });
          } else {
            this.setState({ subLoading: false, error: err.response.data });
          }
        } else {
          this.setState({ subLoading: false, error: err.message });
        }
      });
  }
*/
  moveToPage = (page) => {
    const { courseid, subtopicid, code } = this.state;
    this.props.history.push(
      `/course/${courseid}/${subtopicid}/${code}/${page}`
    );
    this.setState({ page });
  };

  renderSubmission = () => {
    const { submissions, currentSubmissions, suberror } = this.state;
    return (
      <div>
        <Submission
          subLoading={this.state.subLoading}
          currentSubmissions={currentSubmissions}
          submissions={submissions}
          suberror={suberror}
        />
      </div>
    );
  };

  submitCode = (packet) => {
    console.log(packet);
    const { courseid, subtopicid, code } = this.state;
    this.setState({ subLoading: true });
    this.moveToPage("submission");
    axiosBase
      .post(
        `/apiv0/course/${courseid}/${subtopicid}/${code}/submission/`,
        packet
      )
      .then((res) => {
        const id = res.data;
        axiosBase
          .get(`/apiv0/cachedsubmission/${id}/`)
          .then((sub) => {
            this.setState({
              currentSubmissions: sub.data,
              subLoading: false,
              suberror: "",
            });
          })
          .catch((err) => {
            if (err.response) {
              if (err.response.status == 404) {
                this.setState({
                  subLoading: false,
                  suberror: "Something not found in server",
                });
              } else {
                this.setState({
                  subLoading: false,
                  suberror: err.response.data,
                });
              }
            } else
              this.setState({
                subLoading: false,
                suberror: err.message,
              });
          });
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status == 404) {
            this.setState({
              subLoading: false,
              suberror: "Something not found in server",
            });
          } else {
            this.setState({
              subLoading: false,
              suberror: err.response.data,
            });
          }
        } else
          this.setState({
            subLoading: false,
            suberror: err.message,
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
      if (this.state.errorProblem)
        return <div className="text-center p-4">{this.state.errorProblem}</div>;
      if (this.state.problemloading) {
        return (
          <div className="text-center">
            <Loading />
          </div>
        );
      }

      const { courseid, subtopicid, code } = this.state;
      axiosBase
        .get(`/apiv0/course/${courseid}/${subtopicid}/${code}/`)
        .then((res) => {
          console.log(res);
          this.setState({ problemloading: true });
          this.setState({
            problem: res.data.problem,
            allowed_languages: res.data.allowed_languages,
            problemloading: false,
          });
        })
        .catch((err) => {
          if (err.response) {
            if (err.response.status == 404) {
              this.setState({
                problemloading: false,
                errorProblem: "Resourse not available",
              });
            } else {
              this.setState({
                problemloading: false,
                errorProblem: err.response.data,
              });
            }
          } else {
            this.setState({ problemloading: false, errorProblem: err.message });
          }
        });

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
            <strong>
              {problemname} {this.state.error}
            </strong>
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
                <Tab eventKey="editor" title="</>">
                  <Editor
                    allowed_languages={this.state.allowed_languages}
                    submitCode={this.submitCode}
                    className="mt-5 mb-3"
                  />
                </Tab>
                <Tab eventKey="submission" title="Submission">
                  <this.renderSubmission />
                </Tab>
              </Tabs>
            </Container>
          </Col>
          <Col md={3}>
            <SideBar
              submitCode={this.submitCode}
              allowed_languages={this.state.allowed_languages}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}
