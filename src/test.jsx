import React, { Component } from "react";
import axios from "./util/axiosWrapper";
import auth2 from "./util/auth2";
import GoogleLogin from "react-google-login";

export default class test extends Component {
  state: {
    res: "",
    err: "",
    username: "",
    password: "",
    newpassword: "",
  };

  get = () => {
    axios
      .get("/apiv0/hello/")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    // axios.defaults.headers.common['authorization'] = `Token a924c8242c00b10999dd2fe7a233b14c9751cbe0`;
  };

  whoami = () => {
    auth2.whoami((user) => {
      console.log(user);
    });
  };

  render() {
    return (
      <div>
        <input type="button" value="gethello" onClick={this.get} />
        <input type="button" value="whoami" onClick={this.whoami} />
        <input
          type="text"
          placeholder="username"
          onChange={(event) => {
            this.setState({ username: event.target.value });
          }}
        />
        <input
          type="text"
          placeholder="password"
          onChange={(event) => {
            this.setState({ password: event.target.value });
          }}
        />
        <input
          type="button"
          value="Login"
          onClick={() => {
            auth2.loginWithUserNameAndPassword(
              this.state.username,
              this.state.password,
              null,
              (err) => {
                console.log(err);
              }
            );
          }}
        />
        <input
          type="button"
          value="logout"
          onClick={() => {
            auth2.logout();
          }}
        />
        <input
          type="text"
          name=""
          placeholder="newpassword"
          onChange={(event) => {
            this.setState({ newpassword: event.target.value });
          }}
        />
        <input
          type="button"
          value="CHange Pass"
          onClick={() => {
            auth2.changePassword(
              this.state.username,
              this.state.password,
              this.state.newpassword,
              () => {console.log('changed password')},
              (mess) => {console.log('failed to changed password');console.log(mess)},
              
            );
          }}
        />
        <GoogleLogin
          clientId="742082810734-7jh66acflh9rpibdopf5fd1l7rl68jut.apps.googleusercontent.com"
          buttonText="Login With Google"
          onSuccess={auth2.withGoogleToken}
          onFailure={auth2.withGoogleToken}
          cookiePolicy={"single_host_origin"}
        />
      </div>
    );
  }
}
