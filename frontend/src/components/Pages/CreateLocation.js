import React, { Fragment, useState, useEffect } from "react";
import Select from "react-select";
import { v4 as uuidv4 } from "uuid";
import FieldGenerator from "../Utils/FieldGenerator";
import { Redirect } from "react-router-dom";
import "../../css/card.css";
import { connect, useSelector } from "react-redux";
import Loader from "../template_parts/Loader";
import { loadCategories, loadFields } from "../../actions/category";
import { dataThematics } from "../../actions/thematic";
import { loadDestinations } from "../../actions/destinations";
import { addLocation } from "../../actions/location";
import { Circular } from "styled-loaders-react";

const CreateLocation = (props) => {
  const [fields, setFields] = useState({
    name: "",
    description: "",
    destination: "",
    street: "",
    city: "",
    postalCode: "",
    price: "",
    surface: "",
    rooms: "",
    travellers: "",
    category: "",
  });

  const {
    dataThematics,
    loadCategories,
    loadDestinations,
    loadFields,
    addLocation,
    isAddingLocation,
  } = props;
  const [formFields, setFormFields] = useState([]);

  const [errors, setErrors] = useState([]);

  const [selectedFiles, setSelectedFiles] = useState([]);

  const [paramFields, setParamsFields] = useState({});

  const [selectedTheamtics, setSelectedThematics] = useState([]);

  const categories = props.category.categories || [];
  const destinations = props.destination.destinations || [];

  useEffect(() => {
    dataThematics();
    loadCategories();
    loadDestinations();
    loadFields();
  }, [loadCategories, dataThematics, loadDestinations, loadFields]);

  if (!props.profil.connect) {
    return <Redirect to="/login?redirect=/create-location" />;
  } else if (
    props.profil.profil &&
    props.profil.profil.roles.indexOf("ROLE_OWNER") == -1
  ) {
    return <Redirect to="/becomeOwner?redirect=/create-location" />;
  }

  const onSelectedFiles = (e) => {
    let files = e.target.files;
    let array = [];
    for (let i = 0; i < files.length; i++) {
      array.push({ id: uuidv4(), file: files.item(i) });
    }
    array = array.concat(selectedFiles);
    setSelectedFiles(array);
  };

  const onRemoveFile = (id) => {
    let filteredFiles = selectedFiles.filter((item) => item.id !== id);
    setSelectedFiles(filteredFiles);
  };

  const handleChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const handleParamsFields = (e) => {
    setParamsFields({ ...paramFields, [e.target.name]: e.target.value });
  };

  const categoryChange = (e) => {
    let categoryId = e.target.value;
    setFields({ ...fields, category: categoryId });
    let data = props.category.fields;

    data = data.filter((item) => item.category.id === parseInt(categoryId));

    let vals = {};
    data.forEach((f) => {
      if (f.typeName === "select") vals[f.name] = f.choices[0].valueItem;
      else vals[f.name] = f.val;
    });
    setParamsFields({ ...vals });
    setFormFields(data);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let err = validateInputs(
      fields,
      selectedFiles,
      selectedTheamtics,
      paramFields,
      formFields
    );
    if (err.length > 0) {
      setErrors(err);
    } else {
      let fieldValues = [];

      for (let fieldName in paramFields) {
        let field = formFields.find((item) => item.name === fieldName);

        if (field) {
          fieldValues.push({
            fieldId: field.id,
            value: paramFields[fieldName],
          });
        }
      }

      let formData = new FormData();

      formData.append("name", fields.name);
      formData.append("description", fields.description);
      formData.append("street", fields.street);
      formData.append("postal_code", fields.postalCode);
      formData.append("city", fields.city);
      formData.append("price", fields.price);
      formData.append("rooms", fields.rooms);
      formData.append("surface", fields.surface);
      formData.append("category", fields.category);
      formData.append("destination", fields.destination);
      formData.append("travelers", fields.travellers);

      let thematics = selectedTheamtics.map((item) => item.value);

      formData.append("thematics", JSON.stringify(thematics));
      formData.append("fields", JSON.stringify(fieldValues));

      for (let index = 0; index < selectedFiles.length; index++) {
        formData.append("file" + index, selectedFiles[index].file);
      }

      addLocation(formData);

      console.log("Ok Can add it");

      if (!isAddingLocation) props.history.push("/locations");
    }
  };

  let isLoading =
    !props.thematic.loading ||
    !props.destination.loading ||
    props.category.loading ||
    props.category.isLoadingFields;

  if (isLoading) {
    return (
      <div className="conteneurLoader">
        <Circular color="#1b6e86 " size="150px" />
      </div>
    );
  } else {
    let array = props.thematic.thematics || [];
    let thematicsOptions = array.map((item) => ({
      value: item.id,
      label: item.name,
    }));

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 mx-auto">
            {errors.length > 0 && (
              <div className="alert alert-danger px-4">
                <ul>
                  {errors.map((error) => (
                    <li key={uuidv4()}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
            <form onSubmit={onSubmit}>
              <h1 className="text-info text-center">Poster une annonce</h1>
              <div className="form-group">
                <label>Type d'hébergement:</label>
                <select
                  className="form-control"
                  onChange={categoryChange}
                  value={fields.category}
                >
                  <option value=""></option>
                  {categories.length > 0 &&
                    categories.map((item, index) => {
                      // index == 0 && setCategory(item.id);
                      return (
                        <option key={uuidv4()} value={item.id}>
                          {item.name}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="form-group">
                <label>Nom:</label>
                <input
                  type="text"
                  name="name"
                  value={fields.name}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Description:</label>
                <textarea
                  name="description"
                  value={fields.description}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label>Thematique:</label>
                  <Select
                    isMulti
                    options={thematicsOptions}
                    onChange={setSelectedThematics}
                  />
                </div>
                <div className="col-md-6">
                  <label>Destination:</label>
                  <select
                    name="destination"
                    value={fields.destination}
                    onChange={handleChange}
                    id=""
                    className="form-control"
                  >
                    {destinations.length > 0 &&
                      destinations.map((item) => (
                        <option key={uuidv4()} value={item.id}>
                          {item.address}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <label>Rue:</label>
                  <input
                    type="text"
                    name="street"
                    value={fields.street}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="col-md-4">
                  <label>Ville:</label>
                  <input
                    type="text"
                    value={fields.city}
                    onChange={handleChange}
                    name="city"
                    className="form-control"
                  />
                </div>
                <div className="col-md-4">
                  <label>Code Postal:</label>
                  <input
                    type="text"
                    value={fields.postalCode}
                    onChange={handleChange}
                    name="postalCode"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label>Prix:</label>
                  <input
                    type="number"
                    value={fields.price}
                    onChange={handleChange}
                    name="price"
                    className="form-control"
                  />
                </div>
                <div className="col-md-6">
                  <label>Surface:</label>
                  <input
                    type="text"
                    value={fields.surface}
                    onChange={handleChange}
                    name="surface"
                    className="form-control"
                  />
                </div>
                <div className="col-md-6">
                  <label>Nombre de Chambre:</label>
                  <input
                    type="number"
                    value={fields.rooms}
                    onChange={handleChange}
                    name="rooms"
                    className="form-control"
                  />
                </div>
                <div className="col-md-6">
                  <label>Nombre de Voyageurs:</label>
                  <input
                    type="number"
                    value={fields.travellers}
                    onChange={handleChange}
                    name="travellers"
                    className="form-control"
                  />
                </div>
              </div>
              {formFields.length > 0 && (
                <div>
                  <h4 className="text-info text-center">
                    Parametres supplémentaires
                  </h4>
                  <div className="row">
                    <Fragment>
                      {formFields.map((field, index) => (
                        <div
                          key={`${field.name}-${index}`}
                          className="col-md-6"
                        >
                          {FieldGenerator.generate(
                            field,
                            handleParamsFields,
                            fields
                          )}
                        </div>
                      ))}
                    </Fragment>
                  </div>
                </div>
              )}
              <div className="form-group">
                <label>Les prises de vue</label>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span
                      className="input-group-text"
                      id="inputGroupFileAddon01"
                    >
                      Images
                    </span>
                  </div>
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      id="inputGroupFile01"
                      multiple={true}
                      accept="image/*"
                      aria-describedby="inputGroupFileAddon01"
                      onChange={onSelectedFiles}
                    />
                    <label
                      className="custom-file-label"
                      htmlFor="inputGroupFile01"
                    >
                      {selectedFiles.length > 0
                        ? selectedFiles.length + " images sélectionnées"
                        : "Sélectionnez vos images"}
                    </label>
                  </div>
                </div>

                <div id="selected-image-container">
                  {selectedFiles.map((file) => (
                    <div
                      key={file.id}
                      className="selected-img"
                      onClick={(e) => onRemoveFile(file.id)}
                    >
                      <img src={URL.createObjectURL(file.file)} alt="image" />
                      <div className="remove">
                        <i className="fas fa-times" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-group">
                {isAddingLocation && (
                  <i className="fas fa-spinner fa-pulse mr-3"></i>
                )}
                <button className="btn btn-info btn-block py-2">Ajouter</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
};

function validateInputs(fields, files, thematics, paramFields, formFields) {
  let errors = [];

  if (!fields.name) errors.push("Veuillez renseigner le nom du logment");

  if (!fields.description)
    errors.push("Veuillez renseigner la description du logment");

  if (!fields.street)
    errors.push("Veuillez renseigner l'adresse ou se trouve le logement");

  if (!fields.postalCode) errors.push("Veuillez renseigner le code postal");

  if (!fields.city) errors.push("Veuillez renseigner la ville");

  if (!fields.price) errors.push("Veuillez renseigner le prix du logment");

  if (!fields.rooms)
    errors.push("Veuillez renseigner la capacité d'accueil du logment");

  if (!fields.surface)
    errors.push("Veuillez renseigner l'étendu du logment en m²");

  if (!fields.category)
    errors.push(
      "Veuillez sélectionner la categorie d'hébergement correspondant"
    );

  if (!fields.destination)
    errors.push("Veuillez sélectionner la région de votre d'hébergement");

  if (!fields.travellers)
    errors.push("Veuillez renseigner le nombre de voyageurs");

  if (thematics.length <= 0)
    errors.push("Veuillez sélectionner au moins une thématique");

  if (files.length <= 1) errors.push("Veuillez renseigner au moins une image");

  for (let fieldName in paramFields) {
    let field = formFields.find((item) => item.name === fieldName);

    if (field) {
      if (!paramFields[fieldName])
        errors.push("Veuillez renseigner le paramétre " + field.label);
    }
  }

  return errors;
}

const mapStateToProps = (state) => ({
  thematic: state.thematic,
  category: state.category,
  destination: state.destination,
  profil: state.profil,
  isAddingLocation: state.location.isAddingLocation,
});
export default connect(mapStateToProps, {
  dataThematics,
  loadCategories,
  loadDestinations,
  loadFields,
  addLocation,
})(CreateLocation);
