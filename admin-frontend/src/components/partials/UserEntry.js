import React from "react";
import { Link } from "react-router-dom";

function UserEntry(props) {
  let { id, name, lastName, email, roles, status } = props.entry;
  let activateUser = props.activateUser;
  let deactivateUser = props.deactivateUser;
  return (
    <tr>
      <td>{name + " " + lastName}</td>
      <td>{email}</td>
      <td>
        {roles.indexOf("ROLE_ADMIN") >= 0 ? (
          <span>
            <i className="fas fa-user-shield text-primary mr-2"></i>
            <span className="text-primary">Admin</span>
          </span>
        ) : roles.indexOf("ROLE_OWNER") >= 0 ? (
          <span>
            <i className="fas fa-user-tie text-primary mr-2"></i>
            <span className="text-primary">Propriétaire</span>
          </span>
        ) : (
          <span>
            <i className="fas fa-user fa-a text-primary mr-2"></i>
            <span className="text-primary">Utilisateur</span>
          </span>
        )}
      </td>
      <td>
        {status == 1 ? (
          <span className="text-success">Actif</span>
        ) : (
          <span className="text-danger">Désactivé</span>
        )}
      </td>
      <td>
        <div className="btn-group mr-2" role="group" aria-label="First group">
          <Link type="button" to={"/user/" + id} className="btn btn-light">
            <i className="far fa-eye p-1 text-blue mr-2"></i>
            <span className="text-secondary">Consulter</span>
          </Link>

          {roles.indexOf("ROLE_ADMIN") == -1 &&
            (status == 0 ? (
              <button
                type="button"
                className="btn text-success btn-light"
                onClick={activateUser}
              >
                <i className="fas fa-check p-1 text-success mr-2"></i>
                <span className="text-success">Activer</span>
              </button>
            ) : (
              <button
                type="button"
                className="btn text-danger btn-light"
                onClick={deactivateUser}
              >
                <i className="fas fa-times p-1 text-danger mr-2"></i>
                <span className="text-danger">Désactiver</span>
              </button>
            ))}
        </div>
      </td>
    </tr>
  );
}

export default UserEntry;
