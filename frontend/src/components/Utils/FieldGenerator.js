import React from "react";

class FieldGenerator {
  static generate(field, handleChange, state = null) {
    const { name, label, typeName, choices } = field;
    // console.log("Generating :" + name);

    if (typeName === "text") {
      return (
        <div key={field._id} className="form-group">
          <label htmlFor="">{label}</label>
          <input
            type="text"
            name={name}
            // value={state[name]}
            id=""
            className="form-control"
            onChange={handleChange}
          />
        </div>
      );
    } else if (typeName === "email") {
      return (
        <div key={field._id} className="form-group">
          <label htmlFor="">{label}</label>
          <input
            type="email"
            name={name}
            // value={state[name]}
            id=""
            className="form-control"
            onChange={handleChange}
          />
        </div>
      );
    }
    if (typeName === "number") {
      return (
        <div key={field._id} className="form-group">
          <label htmlFor="">{label}</label>
          <input
            type="number"
            name={name}
            id=""
            // value={state[name]}
            className="form-control"
            onChange={handleChange}
          />
        </div>
      );
    } else if (typeName === "textarea") {
      return (
        <div key={field._id} className="form-group">
          <label htmlFor="">{label}</label>
          <textarea
            name={name}
            id=""
            // value={state[name]}
            className="form-control"
            onChange={handleChange}
          ></textarea>
        </div>
      );
    } else if (typeName === "select") {
      return (
        <div key={field._id} className="form-group">
          <label htmlFor="">{label}</label>
          <select
            className="form-control"
            name={name}
            onChange={handleChange}
            // value={state[name]}
          >
            {choices.map((choice, index) => (
              <option
                defaultValue={index === 0 && choice.value}
                value={choice.name}
                key={`${choice.name}-${index}`}
              >
                {choice.label}
              </option>
            ))}
          </select>
        </div>
      );
    } else if (typeName === "radio") {
      return (
        <div key={field._id} className="form-group">
          <div>
            <label htmlFor="">{label}</label>
          </div>
          {choices.map((choice, index) => (
            <div
              className="form-check form-check-inline mr-4"
              key={`${choice.name}-${index}`}
            >
              <input
                className="form-check-input"
                type="radio"
                name={choice.name}
                id="inlineRadio1"
                value={choice.value}
                onChange={handleChange}
              />

              <label className="form-check-label" htmlFor="inlineRadio1">
                {choice.label}
              </label>
            </div>
          ))}
        </div>
      );
    } else if (typeName === "checkbox") {
      return (
        <div key={field._id} className="form-group">
          <div>
            <label htmlFor="">{label}</label>
          </div>
          {choices.map((choice, index) => (
            <div
              className="form-check form-check-inline"
              key={`${choice.name}-${index}`}
            >
              <input
                className="form-check-input"
                type="checkbox"
                name="inlineRadioOptions"
                id="inlineRadio1"
                value={choice.label}
              />

              <label className="form-check-label" htmlFor="inlineRadio1">
                {choice.label}
              </label>
            </div>
          ))}
        </div>
      );
    }
  }
}

export default FieldGenerator;
