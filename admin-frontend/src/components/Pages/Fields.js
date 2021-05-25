import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./../template_parts/Sidebar";
import { connect } from "react-redux";
import FieldEntry from "./../partials/FieldEntry";
import Spinner from "./../template_parts/Spinner";
import { loadFields, addField } from "../../actions/field";

const Fields = ({ loadFields, field: { fields, loading }, match }) => {
  let categoryId = match.params.categoryId;
  useEffect(() => {
    loadFields(categoryId);
  }, [loadFields]);
  return (
    <React.Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <div className="row">
          <div className="col-md-10 mx-auto">
            <h2 className="text-center">Liste des paramétres</h2>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Nom du parametre</th>
                  <th>Label</th>
                  <th>Type du parametre</th>
                  <th>Liste de choix</th>
                </tr>
              </thead>

              <tbody>
                {fields && fields.length > 0 ? (
                  fields.map((field) => (
                    <FieldEntry entry={field} key={field.id} />
                  ))
                ) : (
                  <tr>
                    <td colspan="4">
                      <div className="alert alert-warning">
                        <i className="fas fa-info mr-2"></i>Aucun paramètre pour
                        cette categorie
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="mt-2 pull-right">
              <Link className="btn btn-info" to={`/${categoryId}/new-field`}>
                Ajouter un paramétre
              </Link>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};
const mapStateToProps = (state) => ({
  field: state.field,
});
export default connect(mapStateToProps, {
  loadFields,
})(Fields);
