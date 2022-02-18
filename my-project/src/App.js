import React, { useEffect, useState } from "react";
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
import EachHouse from "./components/Body/HouseShowcase/House/EachHouse/EachHouse";

function App(props) {
  useEffect(async () => {
    axios.defaults.withCredentials = true;
    axios
      .get(`${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/login`)
      .then((response) => {

        if (response.data.loggedIn == true) {
          props.dispatch({
            type: "login",
            data: response.data.username,
          });
        }
      });

    axios
      .get(`${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/listpost`)
      .then(async (response) => {
        let list = response.data
        props.dispatch({
          type: "update",
          data: list,
        });
      });

  }, []);
  const createEachHouseRoute = () => {
    if (props.list) {
      return props.list.map((item, index) => {
        return <Route path={item.name} key={index} element={<EachHouse data={item} />} />
      })
    }
  }
  return (
    <Router>
      <div className="App">
        <Header />
        <div style={{ padding: "5vh" }}></div>
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
          {createEachHouseRoute()}
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}
const mapStateToProps = (state) => {
  return {
    username: state.username,
    list: state.list,
  };
};

export default connect(mapStateToProps)(App);
