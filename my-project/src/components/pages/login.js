import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    let username = event.target.username.value;
    let password = event.target.password.value;
    let ip = process.env.REACT_APP_IP || "localhost";
    let port = process.env.REACT_APP_PORT || 8080;
    const url = `${ip}:${port}/login`;
    const formData = {
      username,
      password,
    };
    axios.defaults.withCredentials = true;
    axios
      .post(url, formData)
      .then((res) => {
        let username = res.data.username;
        this.props.dispatch({
          type: "login",
          data: username,
        });
        this.setState({
          redirect: true,
        });
      })
      .catch((err) => {
        alert(err.response.data.msg);
      });
  };

  render() {
    if (this.state.redirect || this.props.username) {
      return <Navigate to="/" />;
    }

    return (
      <div
        style={{
          padding: "2vw",
          width: "30vw",
          margin: "0 auto",
          textAlign: "left",
        }}
      >
        <form onSubmit={this.handleSubmit}>
          <h3 style={{ textAlign: "center" }}>Login</h3>

          <div className="form-group" style={{ marginTop: "2vh" }}>
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              required={true}
              name="username"
              placeholder="Enter Username"
              style={{ marginTop: "2vh" }}
            />
          </div>

          <div className="form-group" style={{ marginTop: "2vh" }}>
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              required={true}
              name="password"
              placeholder="Enter password"
              style={{ marginTop: "2vh" }}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block"
            style={{ marginTop: "2vh" }}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    username: state.username,
  };
};

export default connect(mapStateToProps)(Login);
