import axiosBase from "./axiosWrapper";
import reduxStore from "./reduxStore";

const Actions = require("../reducers/actions");

const setUser = (user) => {
  reduxStore.dispatch({ type: Actions.SETUSER, user: user });
};

const whoami = () => {
  axiosBase.get("/api-auth/whoami/").then((res) => {
    const user = res.data.is_anonymous ? {} : res.data;
    if (user.username) {
      user.logout = logout;
    }
    setUser(user);
  });
};

const logout = () => {
  axiosBase.get("/api-auth/signout/").then(() => {
    whoami();
  });
};

const loginWithUserNameAndPassword = (username, password) => {
  axiosBase
    .post("/api-auth/signin/", {
      username: username,
      password: password,
    })
    .then((res) => {
      whoami();
    }).catch( (err) => {
      console.log(err);
    } )
};

const changePassword = (username, oldpassword, newpassword) => {
  axiosBase
    .post("/api-auth/changepassword/", {
      username: username,
      oldpassword: oldpassword,
      newpassword: newpassword,
    })
    .then((res) => {
      whoami();
    });
};

const withGoogleToken = (response) => {
  if (response.tokenId) {
    axiosBase
      .post("/socialauth/google/", {
        token: response.tokenId,
      })
      .then((res) => {
        whoami();
      });
  }
};

const auth = {
  whoami,
  logout,
  loginWithUserNameAndPassword,
  changePassword,
  withGoogleToken,
};
console.log('calling whoami');

export default auth;
