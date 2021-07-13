import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MyNav from "./components/Nav";
import Reviews from "./components/Reviews";
import ReviewPage from "./components/ReviewPage";
import { Switch, Route } from "react-router-dom";
import bao from "./Screenshot 2021-07-13 at 16.13.59.png";

function App() {
  return (
    <div className="App">
      <MyNav></MyNav>
      <Switch>
        <Route path="/reviews/:review_id">
          <ReviewPage></ReviewPage>
        </Route>
        <Route path="/reviews">
          <Reviews />
        </Route>
        <Route path="/">
          <div>
            <h1>Hungry? Have a snack</h1>
            <img
              src={bao}
              alt="A picture of a bao and coffee"
              width="300"
              height="300"
            />
          </div>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
