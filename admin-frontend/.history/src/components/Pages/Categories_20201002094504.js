import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./../template_parts/Sidebar";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  return (
    <div className="wrapper">
      <Sidebar />
      <div className="main_content" style={{ marginTop: -50 }}>
        <h2 className="text-center text-dark mb-2">Les types d'hébergements</h2>
        <table className="table  table-striped">
          <thead>
            <tr>
              <th>Nom </th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Cabane dans l'air</td>
              <td>Jolie Cabane dans l'air</td>
              <td>
                <Link className="btn btn-outline-info mx-2" to={`/new-field`}>
                  Ajouter un parametre
                </Link>
                <Link
                  className="btn btn-outline-info mx-2 my-2"
                  to={`/fddfvd/fields`}
                >
                  Les paramétres
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="mt-2">
          <Link className="btn btn-primary" to="/category">
            Ajouter un type d'hébergement
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Categories;
