import React from "react";
import { Link } from "react-router-dom";

function LocationEntry(props) {
  let { id, name, description, category, status } = props.entry;
  let validate = props.validateLocation;
  let deactivateLocation = props.deactivateLocation;
  return (
    <tr>
      <td>{name}</td>
      <td>{category.name}</td>
      <td>
        {status == 0 ? (
          <span>
            <i className="fas fa-spinner fa-spin text-primary mr-2"></i>
            <span className="text-blue">En Attente</span>
          </span>
        ) : status == 1 ? (
          <span>
            <i className="fas fa-check text-success p-1 mr-2"></i>
            <span className="text-success">Validé</span>
          </span>
        ) : (
          <span>
            <i className="fas fa-check text-danger p-1 mr-2"></i>
            <span className="text-danger">Désactivé</span>
          </span>
        )}
      </td>
      <td>
        {status == 0 ? (
          <div className="btn-group mr-2" role="group" aria-label="First group">
            <Link to={`/location/${id}`} className="btn btn-light">
              <i className="far fa-eye p-1 text-blue"></i>
              <span className="text-secondary">Consulter</span>
            </Link>
            <button type="button" className="btn btn-light" onClick={validate}>
              <i className="fas fa-check text-success p-1 px-2 mr-2"></i>
              <span className="text-success">Valider</span>
            </button>
          </div>
        ) : status == 1 ? (
          <div className="btn-group mr-2" role="group" aria-label="First group">
            <Link to={`/location/${id}`} className="btn btn-light">
              <i className="far fa-eye p-1 text-blue"></i>
              <span className="text-secondary">Consulter</span>
            </Link>

            <button
              type="button"
              className="btn text-danger btn-light"
              onClick={deactivateLocation}
            >
              <i className="far fa-times-circle p-1 mr-2"></i>
              <span className="text-danger">Désactiver</span>
            </button>
          </div>
        ) : (
          <div className="btn-group mr-2" role="group" aria-label="First group">
            <Link to={`/location/${id}`} className="btn btn-light">
              <i className="far fa-eye p-1 text-info"></i>
              <span className="text-info">Consulter</span>
            </Link>

            <button
              type="button"
              className="btn text-success btn-light"
              onClick={validate}
            >
              <i className="fas fa-power-off p-1 px-2 mr-2"></i>
              <span className="text-success">Activer</span>
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}

export default LocationEntry;
