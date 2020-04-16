import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

class CreateExercise extends Component {
  constructor(props) {
    super(props);

    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      description: "",
      duration: 0,
      date: new Date(),
      users: [],
    };
  }

  componentDidMount() {
    axios.get("http://localhost:5000/users").then((result) => {
      if (result.data.length > 0) {
        this.setState({
          users: result.data.map((user) => user.username),
          username: result.data[0].username,
        });
      }
    });
  }

  onChangeUserName(e) {
    this.setState(
      {
        username: e.target.value,
      },
      () => {
        console.log(this.state.username);
      }
    );
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value,
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
    };

    axios
      .post("http://localhost:5000/exercises/add", exercise)
      .then((result) => {
        console.log(result.data);
      });

    console.log("exercise" + JSON.stringify(exercise));

    window.location = "/";
  }

  render() {
    return (
      <div>
        <h3>Create New Exercise: </h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <select
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUserName}
            >
              {this.state.users.map((user) => {
                return (
                  <option key={user} valur={user}>
                    {user}
                  </option>
                );
              })}
            </select>
            <div className="form-group">
              <label>Description: </label>
              <input
                type="text"
                required
                className="form-control"
                value={this.state.description}
                onChange={this.onChangeDescription}
              ></input>
            </div>
            <div className="form-group">
              <label>Duration (in minutes): </label>
              <input
                type="text"
                required
                className="form-control"
                value={this.state.duration}
                onChange={this.onChangeDuration}
              ></input>
            </div>
            <div className="form-group">
              <label>Date : </label>
              <div>
                <DatePicker
                  selected={this.state.date}
                  onChange={this.onChangeDate}
                ></DatePicker>
              </div>
            </div>
            <div className="form-group">
              <input
                type="submit"
                value="Create Exercise Log"
                className="btn btn-primary"
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default CreateExercise;
