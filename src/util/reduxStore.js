import rootReducer from "../reducers/rootReducer";
import { createStore } from "redux";

const reduxStore = createStore(rootReducer);

export default reduxStore;