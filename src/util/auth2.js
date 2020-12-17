import axios from "./axiosWrapper";
import reduxStore from "./reduxStore";

const Actions = require("../reducers/actions");

const setUser = (user) => {
  reduxStore.dispatch({ type: Actions.SETUSER, user: user });
};

const loginWithToken = (token) => {
  axios.defaults.headers.common["authorization"] = `Token ${token}`;
  axios.defaults.headers.common["www-authorization"] = `Token ${token}`;
  axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
  axios.defaults.xsrfCookieName = "csrftoken";
};

const whoami = (calback) => {
  axios.get("/api-auth/whoami/").then((res) => {
    const user = res.data.is_anonymous ? {} : res.data;
    if (user.username) {
      user.logout = logout;
    }
    setUser(user);
    calback?.(user);
  });
};

const logout = (request = true) => {
  if (request)
    axios
      .get("/apiv0/auth2/logout/")
      .then((res) => {
        whoami();
      })
      .catch((mes) => {
        whoami();
      });
  delete axios.defaults.headers.common["authorization"];

  //   axios.get("/api-auth/signout/").then(() => {
  //   });
};

const passwordReset = (succ, fail) => {
  axios
    .get("/apiv0/auth2/password-reset/")
    .then((res) => {
      logout(false);
      succ?.();
    })
    .catch((mes) => {
      fail?.();
    });
  //   axios.get("/api-auth/signout/").then(() => {
  //   });
};

const loginWithUserNameAndPassword = (
  username = "",
  password = "",
  onSuccess = null,
  onFailure = null
) => {
  axios
    .post("/apiv0/auth2/api-token-auth/", {
      username: username,
      password: password,
    })
    .then((res) => {
      console.log(res);
      const token = res.data.token;
      loginWithToken(token);
      whoami();
    })
    .catch((err) => {
      //   console.log(err);
      onFailure?.(err);
    });
};

const changePassword = (
  username = "",
  oldpassword = "",
  newpassword = "",
  succ = null,
  fail = null
) => {
  axios
    .post("/apiv0/auth2/change-password/", {
      username: username,
      oldpassword: oldpassword,
      newpassword: newpassword,
    })
    .then((res) => {
      logout(false);
      succ?.();
    })
    .catch((mess) => {
      fail?.();
    });
};

const withGoogleToken = (response) => {
  if (response.tokenId) {
    axios
      .post("/apiv0/auth2/social-google/", {
        token: response.tokenId,
      })
      .then((res) => {
        const token = res.data.token;
        loginWithToken(token);
        whoami();
      });
  }
};

const auth2 = {
  whoami,
  logout,
  loginWithUserNameAndPassword,
  changePassword,
  withGoogleToken,
  passwordReset,
};

export default auth2;
