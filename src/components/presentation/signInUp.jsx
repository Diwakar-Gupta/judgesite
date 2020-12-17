import React, { Component } from "react";
import GoogleLogin from "react-google-login";
import { connect } from "react-redux";
import { Tabs, Tab, Col } from "react-bootstrap";
import auth from "../../util/auth2";
import Loading from "./loading";

const Actions = require("../../reducers/actions");

class SignInUp extends Component {
  state = {
    user: {},
    username: "",
    password: "",
    oldpassword: "",
    newpassword: "",
    page: "signin",

    loading: false,

    changepassworderror: "",
    signinerror: "",
    signuperror: "",
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      user: nextProps.user,
    });
  }

  loginWithPassword = () => {
    this.setState({ signinerror: "", loading: true });
    const { username, password } = this.state;
    auth.loginWithUserNameAndPassword(
      username,
      password,
      () => {
        this.setState({ loading: false, signinerror: "" });
        this.props.history.push('/')
      },
      (err) => {
        if (err.response) {
          this.setState({
            signinerror: "Incorrect credentials",
            loading: false,
          });
        }
      }
    );
  };

  setPassword = (event) => {
    const un = event.target.value;
    this.setState({
      password: un,
    });
  };

  setUserName = (event) => {
    const un = event.target.value;
    this.setState({
      username: un,
    });
  };

  renderSignUp = () => {
    return (
      <div className="p-3">
        {this.state.signuperror && (
          <div style={{ color: "red" }}>{this.state.signuperror}</div>
        )}
        {this.state.loading && <Loading />}
        <h3>Sign Up</h3>
        {/*<div className="form-group">
          <label>First name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"
          />
        </div>

        <div className="form-group">
          <label>Last name</label>
          <input type="text" className="form-control" placeholder="Last name" />
        </div>

        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          Sign Up
        </button>
         <p className="forgot-password text-right">
          Already registered <a href="#">sign in?</a>
        </p> */}
        <div className="form-group">
          <GoogleLogin
            clientId="742082810734-7jh66acflh9rpibdopf5fd1l7rl68jut.apps.googleusercontent.com"
            buttonText="Login With Google"
            onSuccess={auth.withGoogleToken}
            onFailure={auth.withGoogleToken}
            cookiePolicy={"single_host_origin"}
          />
        </div>
      </div>
    );
  };

  renderSignIn = () => {
    return (
      <div className="p-3">
        {this.state.signinerror && (
          <div style={{ color: "red" }}>{this.state.signinerror}</div>
        )}
        <h3>Sign In</h3>

        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Username"
            value={this.state.username}
            onChange={this.setUserName}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={this.state.password}
            onChange={this.setPassword}
          />
        </div>

        {/* <div className="form-group">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div> */}

        <button
          type="submit"
          onClick={this.loginWithPassword}
          className="btn btn-primary btn-block"
        >
          Submit
        </button>
        {/* <p className="forgot-password text-right">
          Forgot <a href="#">password?</a>
        </p> */}
      </div>
    );
  };

  changePassword = () => {
    const username = this.state.username;
    const { oldpassword, newpassword } = this.state;
    auth.changePassword(username, oldpassword, newpassword);
  };

  renderChangePassword = () => {
    return (
      <div className="p-3">
        <h3>Change Password</h3>

        <div className="form-group">
          <label>Current Password</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter current password"
            value={this.state.oldpassword}
            onChange={(event) => {
              this.setState({ oldpassword: event.target.value });
            }}
          />
        </div>

        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter newpassword"
            value={this.state.newpassword}
            onChange={(event) => {
              this.setState({ newpassword: event.target.value });
            }}
          />
        </div>

        {/* <div className="form-group">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div> */}

        <button
          type="submit"
          onClick={this.changePassword}
          className="btn btn-primary btn-block"
        >
          Change
        </button>
        {/* <p className="forgot-password text-right">
          Forgot <a href="#">password?</a>
        </p> */}
      </div>
    );
  };

  render() {
    const user = this.state.user;
    return (
      <Col
        sm="8"
        md="5"
        style={{ "max-width": "30rem", margin: "auto", "padding-top": "2rem" }}
        className="shadow bg-white"
      >
        {user.username ? (
          <this.renderChangePassword />
        ) : (
          <Tabs
            defaultActiveKey={this.state.page}
            id="uncontrolled-tab-example"
          >
            <Tab eventKey="signin" title="SignIn">
              <this.renderSignIn />
            </Tab>
            <Tab eventKey="signup" title="SignUp">
              <this.renderSignUp />
            </Tab>
          </Tabs>
        )}
      </Col>
    );
    /*return (
      <div>
        <div>username: {user.username || ""}</div>
        <div>is_anonymous: {user.is_anonymous ==false ?"no":"yes"}</div>
        <GoogleLogin
          clientId="742082810734-7jh66acflh9rpibdopf5fd1l7rl68jut.apps.googleusercontent.com"
          buttonText="Login With Google"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
        <div>
          <input
            type="text"
            placeholder="username"
            onChange={this.setUserName}
          />
          <input placeholder="password" onChange={this.setPassword} />
          <input type="button" value="LogIn" onClick={this.login} />
          <input type="button" value="LogOut" onClick={this.logout} />
        </div>
        <div>
          <input
            type="text"
            placeholder="user"
            value={this.state.user.username}
          />
          <input
            type="text"
            placeholder="oldpassword"
            onChange={(event) =>
              this.setState({ oldpassword: event.target.value })
            }
          />
          <input
            type="text"
            placeholder="newpassword"
            onChange={(event) =>
              this.setState({ newpassword: event.target.value })
            }
          />
          <input
            type="button"
            value="Change Password"
            onClick={this.changePassword}
          />
        </div>
      </div>
    );*/
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapPropsToState = (dispatch) => {
  return {
    setUser: (user) => {
      dispatch({ type: Actions.SETUSER, user: user });
    },
  };
};

export default connect(mapStateToProps, mapPropsToState)(SignInUp);
