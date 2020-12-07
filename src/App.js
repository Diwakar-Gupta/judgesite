// import logo from './logo.svg';
import "./static/scss/App.scss";
import { Route, Switch } from "react-router-dom";
import Home from "./components/presentation/home";
import ProblemView from "./components/presentation/problem/problemview";
import Courses from "./components/presentation/courses";
import Course from "./components/presentation/course";
import CourseSubTopics from "./components/presentation/courseSubTopics";
import Header from "./components/presentation/header";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="content">
        <Switch>
          <Route path="/courses" component={Courses}></Route>
          <Route
            path="/course/:courseid/:subtopicid/:problemcode/:page"
            component={ProblemView}
          ></Route>
          <Route
            path="/course/:courseid/:subtopicid/:problemcode/"
            component={ProblemView}
          ></Route>
          
          <Route
            path="/course/:courseid/:subtopicid"
            component={CourseSubTopics}
          ></Route>

          <Route path="/course/:courseid" component={Course}></Route>
          <Route path="/:problemcode" component={ProblemView}></Route>
          <Route path="/" component={Home}></Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
