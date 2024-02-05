import {Routes,Route} from "react-router-dom";
import Home from "./Home";
import './App.css';
import Success from "./Success";
import Failure from "./Failure";

function App() {
  return (
    <Routes>
      <Route exact path={'/'} element={<Home/>} />
      <Route exact path={'/success'} element={<Success/>} />
      <Route exact path={'/failure'} element={<Failure/>} />
    </Routes>
  );
}

export default App;
