import React, { useState } from "react";
import Sidebar from "./../template_parts/Sidebar";
import { connect } from "react-redux";
import { addDestination } from "../../actions/destination";
import { addThematic } from "../../actions/thematic";
import { addCategory } from "../../actions/category";

const AddForm = ({
  type,
  addDestination,
  addThematic,
  addCategory,
  history,
}) => {
  const [file, setFile] = useState(null);
  let [error, setError] = useState("");

  let labels = [
    {
      title: "Ajouter une experience",
      name: "Titre :",
      description: "Description :",
    },
    {
      title: "Ajouter un type de d'hébergement",
      name: "Nom de l'hébergement :",
      description: "Description :",
    },
    {
      title: "Ajouter une destination",
      name: "Ville :",
      description: "Description :",
    },
  ];

  const [inputs, setInputs] = useState({ name: "", description: "" });

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (inputs.name != "" && inputs.description != "" && file != null) {
      if (type == 0) {
        let formData = new FormData();
        formData.append("name", inputs.name);
        formData.append("description", inputs.description);
        formData.append("file", file);
        addThematic(formData);
        history.push("/thematics");
      } else if (type == 1) {
        let formData = new FormData();
        formData.append("name", inputs.name);
        formData.append("description", inputs.description);
        formData.append("file", file);
        addCategory(formData);
        history.push("/category-list");
      } else {
        let formData = new FormData();
        formData.append("address", inputs.name);
        formData.append("description", inputs.description);
        formData.append("file", file);
        addDestination(formData);
        history.push("/destinations");
      }
    } else {
      setError(
        "Veuillez entrer le nom ,la description et sélectionner l'image"
      );
    }
  };
  const onSelectedFile = (e) => {
    setFile(e.target.files.item(0));
  };
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-md-8 mx-auto  bg-white p-4 mt-4">
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={onSubmit}>
            <h3 className="text-center text-blue py-2">{labels[type].title}</h3>
            <div className="form-group">
              <label htmlFor="">{labels[type].name} </label>
              <input
                type="text"
                className="form-control "
                name="name"
                onChange={onChange}
                value={inputs.name}
              />
            </div>
            <div className="form-group">
              <label htmlFor="">{labels[type].description}</label>
              <textarea
                className="form-control "
                name="description"
                onChange={onChange}
                value={inputs.description}
              ></textarea>
            </div>
            <div className="input-group">
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  id="inputGroupFile04"
                  onChange={onSelectedFile}
                />
                <label className="custom-file-label" htmlFor="inputGroupFile04">
                  Choisir un fichier image
                </label>
              </div>
              <div></div>

              <div className="input-group-append">
                <button className="btn btn-outline-secondary " type="button">
                  sélectionner
                </button>
              </div>
            </div>
            {file != null ? (
              <div className="row my-2">
                <div className="col-md-6 mx-auto">
                  <div className="card">
                    <img
                      src={URL.createObjectURL(file)}
                      alt=""
                      className="card-img-top"
                    />
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}

            <button className="btn btn-block bg-blue mt-4 text-white font-weight-bold">
              Ajouter
            </button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default connect(null, { addDestination, addCategory, addThematic })(
  AddForm
);
