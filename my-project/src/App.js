import React, { useEffect } from "react";
import { PrivateRoute } from "./components/pages/private/private";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import Login from "./components/pages/login";
import Edit from "./components/pages/edit";
import "./App.css";
import Post from "./components/pages/post";
import Home from "./components/pages/home";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";

function App(props) {
  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios
      .get(`${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/login`)
      .then((response) => {
        console.log(response);
        if (response.data.loggedIn == true) {
          props.dispatch({
            type: "login",
            data: response.data.username,
          });
        }
      });
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />
        <div style={{padding:'5vh'}}>
          
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/edit"
            element={<PrivateRoute username={props.username} />}
          >
            <Route path="/edit" element={<Edit />} />
          </Route>
          <Route
            path="/post"
            element={<PrivateRoute username={props.username} />}
          >
            <Route path="/post" element={<Post />} />
          </Route>
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}
const mapStateToProps = (state) => {
  return {
    username: state.username,
  };
};

export default connect(mapStateToProps)(App);

