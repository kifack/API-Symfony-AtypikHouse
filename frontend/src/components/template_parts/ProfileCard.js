import React, { Component } from "react";
import { Link } from "react-router-dom";

class ProfileCard extends Component {
  render() {
    return (
      <div>
        <div className="card" style={{ width: "18rem" }}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog"
            className="card-img-top"
            alt="..."
          />
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <i className="fas fa-city text-info mr-3" />
              Paris
            </li>
            <li className="list-group-item">
              <i className="fas fa-map-marker-alt text-info mr-3" />3 Rue des
              sablons
            </li>
            <li className="list-group-item">
              <i className="fas fa-phone text-info mr-3" />
              07 68 87 41 03
            </li>
            <li className="list-group-item">
              <i className="far fa-envelope text-info mr-3" />
              test@gmail.com
            </li>
          </ul>
          {/* <div className="card-body text-center">
            <Link to="/user/edit-profile" className="card-link">
              Editer Mon Profile
            </Link>
          </div> */}
        </div>
      </div>
    );
  }
}

export default ProfileCard;
