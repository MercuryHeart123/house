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
  const imageRunner = async (path) => {
    let ip = process.env.REACT_APP_IP || "localhost";
    let port = process.env.REACT_APP_PORT || 8080;
    const url = `${ip}:${port}/getbase64`;
    const formPath = {
      path,
    };
    const response = await axios.post(url, formPath);
    console.log(response);
    return `data:image/png;base64,${response.data}`;
  };
  const createImg = () => {
    if (props.list) {
      const imageList = [];
      for (let i = 0; i < props.list.length; i++) {
        console.log(props.list[i].path);
        const path = props.list[i].path[0];
        const base64 = imageRunner(path);
        console.log(base64);
        imageList.push(<img key={i} src={base64} />);
      }
      return imageList;
    }
  };

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

    axios
      .get(`${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/listpost`)
      .then((response) => {
        console.log(response);
        props.dispatch({
          type: "update",
          data: response.data,
        });
      });
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />
        {props.list && createImg()}

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
