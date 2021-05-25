import React, { useEffect, useState } from "react";
import Card from "../template_parts/Card";
import Sidebar from "./../template_parts/Sidebar";
import ProfileCard from "./../template_parts/ProfileCard";
import "../../css/card.css";
import { connect } from "react-redux";
import { loadUser } from "../../actions/user";
import Spinner from "./../template_parts/Spinner";

const UserProfile = ({ loadUser, user: { user, loadingUser }, match }) => {
  let id = match.params.id;
  useEffect(() => {
    loadUser(id);
  }, [loadUser]);

  const [current, setCurrent] = useState(0);
  const onTabClick = (e, index) => {
    e.target.classList.add("active");
    setCurrent(index);
  };
  return (
    <React.Fragment>
      {user == null ? (
        <Spinner />
      ) : (
        <div className="row ">
          <div className="col-md-4 col-sm-12">
            <ProfileCard user={user} />
          </div>
          <div className="col-md-8 col-sm-12 ">
            <div className="tabs bg-white">
              <div className="tab-header">
                <div
                  className={`${current == 0 ? "active" : ""}`}
                  onClick={(e) => onTabClick(e, 0)}
                >
                  Client
                </div>
                {user.outsider && (
                  <div
                    className={`${current == 1 ? "active" : ""}`}
                    onClick={(e) => onTabClick(e, 1)}
                  >
                    Entreprise
                  </div>
                )}
              </div>
              <div
                className="tab-indicator"
                style={{ left: `calc(calc(100% / 2) * ${current})` }}
              />
              <div className="tab-body">
                <div className={`${current == 0 ? "active" : ""}`}>
                  <h4 className="text-center">
                    Informations sur &nbsp;
                    <span className="text-info">
                      {user.name + " " + user.lastName}
                    </span>
                  </h4>

                  <table className="table table-striped mt-4">
                    <tr>
                      <td>Zip Code</td>
                      <td>{user.zipCode}</td>
                    </tr>
                    <tr>
                      <td>Date de Naissance</td>
                      <td>{new Date(user.dateOfBirth).toLocaleDateString()}</td>
                    </tr>

                    <tr>
                      <td>Compte crée le</td>
                      <td>{new Date(user.dateCreated).toLocaleDateString()}</td>
                    </tr>
                    <tr>
                      <td>Référence</td>
                      <td>{user.reference}</td>
                    </tr>
                    <tr>
                      <td>Nombre de réservations</td>
                      <td>
                        {user.bookings.length > 0
                          ? user.bookings.length
                          : "Aucune"}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        {user.comments.length > 0
                          ? user.comments.length
                          : "Aucun"}
                      </td>
                      <td>Commentaires postés</td>
                    </tr>
                    <tr>
                      <td>Compte</td>
                      <td>
                        {user.status == 1 ? (
                          <span className="text-success">Actif</span>
                        ) : (
                          <span className="text-danger">Désactivé</span>
                        )}
                      </td>
                    </tr>
                  </table>
                </div>
                {user.outsider != null && (
                  <div className={`${current == 1 ? "active" : ""}`}>
                    <h2 className="text-info text-center">
                      Information sur l'entreprise
                    </h2>
                    <table className="table table-striped mt-4">
                      <tr>
                        <td>Dénomination</td>
                        <td>{user.outsider.denomination}</td>
                      </tr>
                      <tr>
                        <td>Numéro de Siret</td>
                        <td>{user.outsider.numberSiret}</td>
                      </tr>

                      <tr>
                        <td>Adresse</td>
                        <td>{user.outsider.street}</td>
                      </tr>
                      <tr>
                        <td>Ville</td>
                        <td>{user.outsider.city}</td>
                      </tr>
                      <tr>
                        <td>Code Naf</td>
                        <td>{user.outsider.codeNaf}</td>
                      </tr>
                      <tr>
                        <td>Forme légale</td>
                        <td>{user.outsider.formLegal}</td>
                      </tr>
                      <tr>
                        <td>Entreprise enregistrée le </td>
                        <td>
                          {new Date(
                            user.outsider.dateCreated
                          ).toLocaleDateString()}
                        </td>
                      </tr>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};
const mapStateToProps = (state) => ({
  user: state.user,
});
export default connect(mapStateToProps, {
  loadUser,
})(UserProfile);
