import React, { Component } from "react";
import GoogleLogin from "react-google-login";
import axiosBase from "../../../util/axiosWrapper";

export default class Auth extends Component {
  state = {
    user: "anon",
    username: "",
    password: "",
  };

  componentDidMount() {
    this.whoami();
  }

  changePassword = () => {
    axiosBase.post('/api-auth/changepassword/', {
      username : this.state.user.username,
      oldpassword : this.state["oldpassword"],
      newpassword : this.state['newpassword']
    })
    .then( (res) => {
      this.whoami()
    })
  }

  whoami = () => {
    axiosBase.get("/api-auth/whoami/").then((res) => {
      console.log(res.data);
      this.setState({
        user: res.data,
      });
    });
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

  logout = () => {
    axiosBase.get("/api-auth/signout/").then(() => {
      this.whoami();
    });
  };

  login = () => {
    axiosBase
      .post("/api-auth/signin/", {
        username: this.state.username,
        password: this.state.password,
      })
      .then((res) => {
        console.log(res.data);
        this.whoami();
      });
  };

  responseGoogle = (response) => {
    console.log(response);
    console.log(response.tokenId);
    axiosBase
      .post("/socialauth/google/", {
        token: response.tokenId,
      })
      .then((res) => {
        console.log(res);
        this.whoami();
      });
  };

  render() {
    return (
      <div>
        <div>username: {this.state.user.username}</div>
        <div>is_anonymous: {this.state.user.is_anonymous ? "yes" : "no"}</div>
        <GoogleLogin
          clientId="742082810734-7jh66acflh9rpibdopf5fd1l7rl68jut.apps.googleusercontent.com"
          buttonText="Login With Google"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
        <div>
          <input type="text" placeholder='username' onChange={this.setUserName} />
          <input placeholder='password' onChange={this.setPassword} />
          <input type="button"  value="LogIn" onClick={this.login} />
          <input type="button" value="LogOut" onClick={this.logout} />
        </div>
        <div>
          <input type="text" placeholder="user" value={this.state.user.username} />
          <input
            type="text"
            placeholder="oldpassword"
            onChange={ (event) => this.setState({ oldpassword: event.target.value })}
          />
          <input
            type="text"
            placeholder="newpassword"
            onChange={ (event) => this.setState({ newpassword: event.target.value })}
          />
          <input type="button" value="Change Password" onClick={this.changePassword} />
        </div>
      </div>
    );
  }
}
