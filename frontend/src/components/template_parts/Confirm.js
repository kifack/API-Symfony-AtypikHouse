import React from "react";

const Confirm = (props) => {
  let data = props.data;
  return (
    <div>
      <table className="table table-striped">
        <tbody>
          <tr className="bg-info text-white text-center font-weight-bold">
            <td colspan="2">Sommaire de votre commande</td>
          </tr>

          <tr>
            <td>Nom</td>
            <td>{data.name}</td>
          </tr>
          <tr>
            <td>Adresse</td>
            <td>{data.address}</td>
          </tr>
          <tr>
            <td>Logement</td>
            <td>{data.location}</td>
          </tr>
          <tr>
            <td>Nombre de personne</td>
            <td>{data.persons}</td>
          </tr>
          <tr>
            <td>Adresse du Logement</td>
            <td> {data.locationAddress}</td>
          </tr>
          <tr>
            <td>Date d'arrivée</td>
            <td> {data.startAt.toLocaleDateString()}</td>
          </tr>
          <tr>
            <td>Date de départ</td>
            <td> {data.endAt.toLocaleDateString()}</td>
          </tr>
          <tr className="table-success">
            <td>Prix</td>
            <td>
              {data.total}
              <i className="fas fa-euro-sign ml-2"></i>
            </td>
          </tr>
          {/* <tr>
            <td>Carte bancaire</td>
            <td>4546 4575 5655 5856</td>
          </tr> */}
        </tbody>
      </table>

      <div className="form-group d-flex justify-content-around">
        <button onClick={props.prevStep} className="btn btn-light">
          Précédent
        </button>
        <button className="btn btn-info px-4" onClick={props.handleSubmit}>
          <i className="fas fa-shopping-cart mr-4"></i> Valider la commande
        </button>
      </div>
    </div>
  );
};

export default Confirm;
