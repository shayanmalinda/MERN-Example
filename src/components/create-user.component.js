import React, { Component } from "react";
import axios from "axios";

class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
    };
  }

  onChangeUserName(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
    };

    axios.post("http://localhost:5000/users/add", user).then((result) => {
      console.log(result.data);
    });

    console.log("user : " + JSON.stringify(user));

    this.setState({
      username: "",
    });
    window.location = "/";
  }

  render() {
    return (
      <div>
        <h3>Create New User: </h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUserName}
            ></input>
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create User"
              className="btn btn-primary"
            ></input>
          </div>
        </form>
      </div>
    );
  }
}

export default CreateUser;
