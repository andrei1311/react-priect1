import React from "react";
import UserList from "./components/UserList";
import UserAddForm from "./components/UserAddForm";
import PostList from "./components/PostList";
import Header from "./components/Header";
import "./components/Header.css";
import "./components/UserList.css";
import "./components/PostList.css";
import "./components/UserItem.css";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      color: "white",
      users: [],
      posts: [],
      isUserDisplay: true,
    };
  }
  
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        data = data.filter((user) => user.id < 4);
        data.forEach((user) => {
          user.isGoldClient = false;
        });
        this.setState({ users: data });
      });

    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((postList) => {
        console.log(postList);
        const newPostList = postList.filter((post) => post.id <= 3);
        this.setState({ posts: newPostList });
      });
  }

  handleColorChange(event) {
    const newColor = event.target.value;
    this.setState({ color: newColor });
  }

  handleClickUsers() {
    this.setState({ isUserDisplay: true });
  }
  handleClickPosts() {
    this.setState({ isUserDisplay: false });
  }

  getMaxId(users) {
    let maxId = 0;

    users.forEach((user) => {
      if (user.id > maxId) {
        maxId = user.id;
      }
    });

    return maxId;
  }

  submitAddForm(event, name, email, wage, src, isGoldClient) {
    event.preventDefault();
    this.setState((prevState) => {
      return {
        users: [
          ...prevState.users,
          {
            id: this.getMaxId(prevState.users) + 1,
            name,
            email,
            wage,
            src,
            isGoldClient,
          },
        ],
      };
    });
  }

  render() {
    return (
      <div className="app" style={{ color: this.state.color }}>
        <Header />
        <UserAddForm
          submitAddForm={(event, name, email, wage, src, isGoldClient) =>
            this.submitAddForm(event, name, email, wage, src, isGoldClient)
          }
        />
        {this.state.isUserDisplay ? (
          <UserList users={this.state.users} />
        ) : (
          <PostList posts={this.state.posts} />
        )}

       <div className="container">
          <input
            id="color"
            type="color"
            onChange={(event) => this.handleColorChange(event)}
          />
          <button
            className="button"
            type="button"
            onClick={() => this.handleClickUsers()}
          >
            Afiseaza useri
          </button>
          <button
            className="button"
            type="button"
            onClick={() => this.handleClickPosts()}
          >
            Afiseaza postari
          </button>
        </div>
      </div>
    );
  }
}

export default App;
