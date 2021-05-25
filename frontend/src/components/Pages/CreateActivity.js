import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { addActivity } from "../../actions/activity";

const CreateActivity = (props) => {
  const [fields, setFields] = useState({
    description: "",
    distance: 1,
    price: 1,
  });

  const dispatch = useDispatch();

  let locationId = props.match.params.locationId;

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [errors, setErrors] = useState([]);

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

  const onChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
    // console.log(fields);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let err = validateInputs(fields, selectedFiles);
    if (err.length > 0) {
      setErrors(err);
    } else {
      let formData = new FormData();

      formData.append("description", fields.description);
      formData.append("distance", fields.distance);
      formData.append("price", parseFloat(fields.price));
      formData.append("location", locationId);

      for (let index = 0; index < selectedFiles.length; index++) {
        formData.append("file" + index, selectedFiles[index].file);
      }

      dispatch(addActivity(formData));

      props.history.push("/user/properties");
    }
    // console.log(fields);
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <h1 className="text-info text-center">
            Ajouter une activité autour du logement
          </h1>
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
            <div className="form-group">
              <label>Description:</label>
              <textarea
                name="description"
                value={fields.description}
                onChange={onChange}
                className="form-control"
              />
            </div>
            <div className="row">
              <div className="col-md-6 form-group">
                <label>Distance du logement:</label>
                <input
                  type="number"
                  name="distance"
                  value={fields.distance}
                  onChange={onChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-6 form-group">
                <label>Prix:</label>
                <input
                  type="number"
                  name="price"
                  value={fields.price}
                  onChange={onChange}
                  className="form-control"
                />
              </div>
            </div>
            <div className="form-group">
              <label>Les prises de vue</label>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="inputGroupFileAddon01">
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
              <button className="btn btn-info btn-block py-2">Ajouter</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

function validateInputs(fields, files) {
  let errors = [];

  if (!fields.description)
    errors.push("Veuillez renseigner une descriptionpour l'activité");

  if (!fields.distance || parseFloat(fields.distance) == 0)
    errors.push(
      "Veuillez renseigner la distance a laquelle se trouve l'activité"
    );

  if (!fields.price || parseFloat(fields.price) == 0)
    errors.push("Veuillez renseigner le prix de l'activité");

  if (files.length <= 1) errors.push("Veuillez renseigner au moins une image");

  return errors;
}

export default CreateActivity;
