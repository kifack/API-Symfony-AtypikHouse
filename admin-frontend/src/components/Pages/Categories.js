import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import Sidebar from "./../template_parts/Sidebar";
import { connect } from "react-redux";
import Spinner from "./../template_parts/Spinner";
import CategoryEntry from "./../partials/CategoryEntry";
import { loadCategories } from "../../actions/category";

const Categories = ({ loadCategories, category: { categories, loading } }) => {
  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  return (
    <React.Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <h2 className="text-center text-dark mb-2">
            Les types d'hébergements
          </h2>
          <div className="d-flex justify-content-end mb-2">
            <Link className="btn btn-success" to="/category">
              Ajouter un type d'hébergement
            </Link>
          </div>
          <table className="table  table-striped">
            <thead>
              <tr>
                <th>Nom </th>
                {/* <th>Description</th> */}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <CategoryEntry entry={category} key={uuidv4()} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  category: state.category,
});
export default connect(mapStateToProps, {
  loadCategories,
})(Categories);
