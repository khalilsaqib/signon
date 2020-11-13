import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Mainpage from "./Components/Mainpage";
import Ridermain from "./Components/Ridermain";
import Formpage from "./Components/Formpage";
import Officialmain from "./Components/Officialmain";
import Createevent from "./Components/Createevent";
import Riderqr from "./Components/Riderqr";
import Eventqrscanner from "./Components/Eventqrscanner"
import Entrantsdata from "./Components/Entrantsdata"
import Entrantsedit from "./Components/Entrantsedit"

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Mainpage}/>
        <Route exact path="/Ridermain" component={Ridermain} />
        <Route exact path="/Formpage" component={Formpage} />
        <Route exact path="/Officialmain" component={Officialmain} />
        <Route exact path="/Createevent" component={Createevent} />
        <Route exact path="/Riderqr" component={Riderqr} />
        <Route exact path="/Eventqrscanner" component={Eventqrscanner} />
        <Route exact path="/Entrantsdata" component={Entrantsdata} />
        <Route exact path="/Entrantsedit" component={Entrantsedit} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
  