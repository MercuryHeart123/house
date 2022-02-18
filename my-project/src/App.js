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

function App(props) {
  const [img, setImg] = useState([]);
  const imageRunner = async (path) => {
    let ip = process.env.REACT_APP_IP || "localhost";
    let port = process.env.REACT_APP_PORT || 8080;
    const url = `${ip}:${port}/getbase64`;
    const formPath = {
      path,
    };
    const response = await new Promise((resolve, reject) => {
      axios.post(url, formPath).then((res) => {
        resolve(res.data);
      });
    });
    const base64 = `data:image/png;base64,${response}`;
    return base64;
  };
  const CreateImg = img.map((item, index) => {
    return <img key={index} src={item} />;
  });

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
        let list = response.data;
        const imageList = [];
        for (let i = 0; i < list.length; i++) {
          const path = list[i].path[0];
          const base64 = await imageRunner(path);
          imageList.push(base64);
        }
        setImg(imageList);
        props.dispatch({
          type: "update",
          data: list,
        });
      });
  }, []);

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
