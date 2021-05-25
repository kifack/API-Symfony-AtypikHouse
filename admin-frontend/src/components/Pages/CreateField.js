import React, { useState, useEffect, Fragment } from "react";
import Sidebar from "./../template_parts/Sidebar";
import { v4 as uuidv4 } from "uuid";
import { connect } from "react-redux";
import { addField } from "../../actions/field";

const CreateField = ({ addField, history, match }) => {
  let categoryId = match.params.categoryId;
  const [choices, setChoices] = useState([]);
  const [error, setError] = useState("");

  const [fields, setFields] = useState({ name: "", label: "", type: "text" });

  const handleChange = (e) => {
    let id = parseInt(e.target.dataset.id);
    let name = e.target.name;
    let value = e.target.value;

    if (["choiceLabel", "value"].includes(e.target.name)) {
      setChoices(
        choices.map((choice, index) =>
          index === id ? { ...choice, [name]: value } : choice
        )
      );
    } else {
      setFields({ ...fields, [e.target.name]: e.target.value });
    }
  };

  const onSelect = (e) => {
    let val = e.target.value;

    if (val === "select") {
      addChoice();
    } else {
      setChoices([]);
    }
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (name === "" || label === "" || type === "") {
      setError("Veuillez renseigner tous les champ");
      return;
    } else if (type == "select" && choices.length <= 1) {
      setError("Veuillez renseigner plus d'un paramétre pour un champ à choix");
      return;
    }

    if (name.trim().split(" ").length > 1) {
      setError("Le nom du parametre ne doit pas contenir d'espace");
      return;
    }

    let field = {
      name,
      label,
      typeName: type,
      choices: choices.map((item) => ({
        label: item.choiceLabel,
        valueItem: item.value,
      })),
      category: "/api/v01/categories/" + categoryId,
    };
    addField(field);
    history.push(`/${categoryId}/fields`);

    // console.log(field);
  };

  const { name, label, type } = fields;

  const addChoice = (e) => {
    setChoices([...choices, { id: uuidv4(), choiceLabel: "", value: "" }]);
  };
  const removeChoice = (e, id) => {
    setChoices(choices.filter((item) => item.id !== id));
  };
  return (
    <React.Fragment>
      <div className="card">
        <div className="card-header">
          <h4> Ajouter un paramétre</h4>
        </div>
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}
          <form action="" onSubmit={onSubmit}>
            <div className="row">
              <div
                className={
                  choices.length == 0 ? "col-md-8 mx-auto" : "col-md-6"
                }
              >
                <div className="form-group">
                  <label htmlFor="name">Nom du paramétre:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    onChange={handleChange}
                    value={name}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="label">Nom à afficher:</label>
                  <input
                    type="text"
                    name="label"
                    id="label"
                    className="form-control"
                    onChange={handleChange}
                    value={label}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="typeName">Type du paramétre:</label>
                  <select
                    name="type"
                    id="typeName"
                    className="form-control"
                    onChange={onSelect}
                    value={type}
                  >
                    <option value="text">Texte</option>
                    <option value="number">Nombre</option>
                    <option value="textarea">Textarea</option>
                    <option value="select">Choix</option>
                    <option value="radio">Radio</option>
                    <option value="checkbox">Checkbox</option>
                  </select>
                </div>
                <div className="form-group text-center">
                  <button className="btn btn-block bg-blue text-white font-weight-bold">
                    Ajouter le paramétre
                  </button>
                </div>
              </div>
              {choices.length > 0 ? (
                <div className="col-md-6">
                  <table className="table  mt-2">
                    <thead className="p-2">
                      <tr>
                        <th>Label</th>
                        <th>Valeur</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {choices.map((choice, index) => (
                        <tr key={choice.id}>
                          <td>
                            <input
                              type="text"
                              onChange={handleChange}
                              name="choiceLabel"
                              className="form-control"
                              data-id={index}
                              value={choice.choiceLabel}
                            />
                          </td>
                          <td>
                            <input
                              onChange={handleChange}
                              type="text"
                              name="value"
                              data-id={index}
                              value={choice.value}
                              className="form-control"
                            />
                          </td>
                          <td>
                            {index === 0 ? (
                              <button
                                type="button"
                                onClick={addChoice}
                                className="btn bg-blue btn-sm text-white"
                              >
                                <i
                                  className="fa fa-plus"
                                  aria-hidden="true"
                                ></i>
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={(e) => removeChoice(e, choice.id)}
                                className="btn btn-danger btn-sm"
                              >
                                <i
                                  className="fa fa-minus"
                                  aria-hidden="true"
                                ></i>
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                ""
              )}
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};
export default connect(null, { addField })(CreateField);
