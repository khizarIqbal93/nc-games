import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MyNav from "./components/Nav";
import Login from "./components/LoginPage";
import Home from "./components/Home";
import Reviews from "./components/Reviews";
import ReviewPage from "./components/ReviewPage";
import User from "./components/User";
import { UserContext } from "./contexts/UserContext";
import { Switch, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  const [user, setUser] = useState("");

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="App">
        <MyNav></MyNav>
        <Switch>
          <Route path="/reviews/:category/:review_id">
            <ReviewPage></ReviewPage>
          </Route>
          <Route path="/user/:username">
            <User></User>
          </Route>
          <Route path="/reviews">
            <Reviews />
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/">
            <Home></Home>
          </Route>
        </Switch>
      </div>
    </UserContext.Provider>
  );
}

export default App;
