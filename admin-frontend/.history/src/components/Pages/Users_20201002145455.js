import React, { Component } from "react";
import Sidebar from "./../template_parts/Sidebar";

class Users extends Component {
  render() {
    return (
      <div className="wrapper">
        <Sidebar />
        <div className="main_content">
          <h1 class="text-center my-4">Les utilisateurs</h1>
          <table class="table  table-striped">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Email</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
              <tr>
                <td>Joh Doe</td>
                <td>joh.doe@gmail.com</td>
                <td>
                  <span className="text-success">Actif</span>
                </td>
                <td>
                  <div
                    class="btn-group mr-2"
                    role="group"
                    aria-label="First group"
                  >
                    <a type="button" class="btn btn-light">
                      <i class="far fa-eye p-1 text-info"></i>
                    </a>
                    <button type="button" class="btn text-danger btn-light">
                      <i class="fas fa-times p-1 text-danger"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    );
  }
}

export default Users;
