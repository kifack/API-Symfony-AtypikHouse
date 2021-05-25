import React, { Component, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Sidebar from "./../template_parts/Sidebar";
import UserEntry from "./../partials/UserEntry";
import { connect } from "react-redux";
import Spinner from "./../template_parts/Spinner";
import { loadUsers, activateUser, deactivateUser } from "../../actions/user";

const Users = ({
  loadUsers,
  activateUser,
  deactivateUser,
  user: { users, loading },
}) => {
  useEffect(() => {
    if (users.length === 0) loadUsers();
  }, [loadUsers]);
  return (
    <React.Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <h1 className="text-center ">Les utilisateurs</h1>
          <table className="table  table-striped">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Email</th>
                <th>Type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <UserEntry
                  entry={user}
                  deactivateUser={() => deactivateUser(user.id)}
                  activateUser={() => activateUser(user.id)}
                  key={uuidv4()}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </React.Fragment>
  );
};
const mapStateToProps = (state) => ({
  user: state.user,
});
export default connect(mapStateToProps, {
  loadUsers,
  activateUser,
  deactivateUser,
})(Users);
