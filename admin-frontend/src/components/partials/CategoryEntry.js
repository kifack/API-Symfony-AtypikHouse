import React from "react";
import { Link } from "react-router-dom";

function LocationEntry(props) {
  let { id, name, description } = props.entry;

  return (
    <tr>
      <td>{name}</td>
      {/* <td>{description}</td> */}
      <td>
        <Link className="btn btn-outline-blue mx-2" to={`/${id}/new-field`}>
          Ajouter un parametre
        </Link>
        <Link className="btn btn-outline-blue mx-2 my-2" to={`/${id}/fields`}>
          Les paramétres
        </Link>
      </td>
    </tr>
  );
}

export default LocationEntry;
