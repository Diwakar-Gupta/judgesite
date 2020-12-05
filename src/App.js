// import logo from './logo.svg';
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Home from "./components/presentation/home";
import Problem from "./components/presentation/problem";
import Courses from './components/presentation/courses';
import Course from './components/presentation/course';


function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/courses" component={Courses}></Route>
        <Route path="/course/:courseid" component={Course}></Route>
        <Route path="/:code" component={Problem}></Route>
        <Route path="/" component={Home}></Route>
      </Switch>
    </div>
  );
}

export default App;
