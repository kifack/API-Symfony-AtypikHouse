import React, { useState } from "react";
import Sidebar from "./../template_parts/Sidebar";

const AddForm = ({ type }) => {
  const [file, setFile] = useState(null);
  console.log(type);

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
      alert("valid");
    }
  };
  const onSelectedFile = (e) => {
    setFile(e.target.files.item(0));
  };
  return (
    <div className="wrapper">
      <Sidebar />
      <div className="main_content">
        <div className="row">
          <div className="col-md-8 mx-auto">
            <form onSubmit={onSubmit}>
              <h1 className="text-center">{labels[type].title}</h1>
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
                  <label
                    className="custom-file-label"
                    htmlFor="inputGroupFile04"
                  >
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

              <button className="btn btn-block btn-info mt-4">Ajouter</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddForm;
