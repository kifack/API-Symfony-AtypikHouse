import React, { Component } from "react";
import { Link } from "react-router-dom";

const ProfileCard = ({ user }) => {
  return (
    <div>
      <div className="card" style={{ width: "18rem" }}>
        <img
          src="https://www.uoh.cl/assets/img/no_img.jpg"
          className="card-img-top"
          style={{ height: "13rem" }}
          alt="..."
        />
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <i className="far fa-user text-info mr-3" />
            {user.name + " " + user.lastName}
          </li>
          <li className="list-group-item">
            <i className="fas fa-city text-info mr-3" />
            {user.city}
          </li>
          <li className="list-group-item">
            <i className="fas fa-map-marker-alt text-info mr-3" />
            {user.rue}
          </li>
          <li className="list-group-item">
            <i className="fas fa-phone text-info mr-3" />
            {user.phone}
          </li>
          <li className="list-group-item">
            <i className="far fa-envelope text-info mr-3" />
            {user.email}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileCard;
