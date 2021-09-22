import React from "react";
import { useState } from "react";
import Pagination from "./Pagination";
import { v4 as uuidv4 } from "uuid";

import "./FriendList.css";

const FriendList = () => {
  const [userRegistration, setuserRegistration] = useState({ username: "" });
  const [allUsers, setallUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || []
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    const name = event.target.name;
    const value = event.target.value;
    setuserRegistration({ ...userRegistration, [name]: value });
  };

  const onKeyPress = (ev) => {
    if (ev.key === "Enter") {
      ev.preventDefault();
      const users = [...allUsers];
      users.push({ ...userRegistration, id: uuidv4() });
      localStorage.setItem("users", JSON.stringify(users));
      setallUsers(users);
      setSearchTerm("");
    }
  };

  //Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //delete item
  const deleteItem = (id) => {
    if (confirm("Are you sure you want to delete?")) {
      const users = [...allUsers].filter((user) => {
        return user.id !== id;
      });
      localStorage.setItem("users", JSON.stringify(users));
      setallUsers(users);
    }
  };

  const highlight = (id) => {
    const users = [...allUsers].map((user) => {
      if (user.id === id) {
        return { ...user, isHighlight: !user.isHighlight };
      }
      return user;
    });
    localStorage.setItem("users", JSON.stringify(users));
    setallUsers(users);
  };
  return (
    <div className="main-div">
      <div className="main-header">
        <h3>Friends list</h3>
      </div>
      <div className="main-search">
        <input
          type="text"
          placeholder="Enter your friend's name"
          value={searchTerm}
          id="username"
          name="username"
          onChange={handleChange}
          onKeyPress={onKeyPress}
          className="input-search"
        />
      </div>
      {allUsers
        .filter((user) => {
          if (searchTerm == "") {
            return true;
          } else if (
            user.username.toLowerCase().includes(searchTerm.toLowerCase())
          ) {
            return true;
          }
        })
        .sort((usera, userb) => {
          if (usera.isHighlight && userb.isHighlight) {
            return 0;
          } else if (usera.isHighlight) {
            return -1;
          } else {
            return 1;
          }
        })
        .slice(currentPage * 5 - 5, currentPage * 5)
        .map((user) => {
          return (
            <div className="main">
              <div className="main-name">
                <div className="li-name">{user.username}</div>
                <div className="li-name-sec">is your friend</div>
              </div>

              <span className="li-btn1">
                <button onClick={() => highlight(user.id)}>
                  {user.isHighlight ? "⭐" : "✰"}
                </button>
              </span>
              <span className="li-btn2">
                <button onClick={(e) => deleteItem(user.id)}>🗑️</button>
              </span>
            </div>
          );
        })}
      <Pagination
        postsPerPage={5}
        totalPosts={allUsers.length}
        paginate={paginate}
      />
    </div>
  );
};

export default FriendList;
