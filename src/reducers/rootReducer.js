const initstate = require("./initialState");
const Actions = require("./actions");

function myReducer(state = initstate, action) {
  switch (action.type) {
    case Actions.SETUSER:
      return { ...state, user: action.user };
    default:
      break;
  }

  return state;
}

export default myReducer;
