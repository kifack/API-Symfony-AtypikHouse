import React, { Component } from "react";
import ProfileCard from "./../template_parts/ProfileCard";

class Profile extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <ProfileCard />
            </div>
            <div className="col-md-8">
              <h5 style={{ color: "#bbb", fontWeight: "bold" }}>
                Kshiti Ghelani
              </h5>
              <div className="profile-rating">
                Notes :<span className="fa fa-star text-warning" />
                <span className="fa fa-star text-warning" />
                <span className="fa fa-star text-warning" />
                <span className="fa fa-star text-warning" />
                <span className="fa fa-star text-secondary" />
              </div>
              <div className="card my-4">
                <div className="card-header bg-info text-white">
                  Biens postés
                </div>
                <div className="card-body">
                  <table className="table">
                    <tbody>
                      <tr>
                        <td>Une Cabane dans l'air</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-outline-info"
                          >
                            Consulter
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>Une Cabane dans l'air</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-outline-info"
                          >
                            Consulter
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Profile;
