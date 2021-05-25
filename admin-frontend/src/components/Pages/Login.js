import React, { Component, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "./../template_parts/Spinner";
import { login } from "../../actions/auth";

const Login = ({
  login,
  isAuthenticated,
  loading,
  isLogining,
  authError,
  history,
}) => {
  const [fields, setFields] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const onChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (fields.email != "" && fields.password != "") {
      login(fields.email, fields.password);

      // history.push("/");
    } else {
      setError("Veuillez saisir votre login et mot de passe");
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
    // history.push("/");
  }
  return (
    <div className="login-container mt-4" style={{ marginTop: 100 }}>
      {loading ? (
        <Spinner />
      ) : (
        <div className="container h-100">
          <div className="row h-100 justify-content-center align-items-center">
            <div className="card w-50 rounded">
              <div className="card-body">
                <h4 className="text-blue pb-3 text-center">
                  <i className="fas fa-sign-in-alt mr-3"></i>
                  Se connecter
                </h4>
                {error && (
                  <div className="alert alert-warning" role="alert">
                    {error}
                  </div>
                )}
                {authError && (
                  <div className="alert alert-danger" role="alert">
                    {authError}
                  </div>
                )}
                <form onSubmit={onSubmit}>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>Adresse mail : </label>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i
                                className="fas fa-envelope text-blue"
                                aria-hidden="true"
                              />
                            </span>
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            value={fields.email}
                            onChange={onChange}
                            name="email"
                            placeholder="jean@gmail.com"
                            // required
                          />
                        </div>
                        <div className="help-block with-errors text-danger" />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>Mot de passe :</label>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i
                                className="fa fa-unlock text-blue"
                                aria-hidden="true"
                              />
                            </span>
                          </div>
                          <input
                            type="password"
                            name="password"
                            value={fields.password}
                            onChange={onChange}
                            placeholder="**********"
                            className="form-control"
                            // required
                          />
                        </div>
                        <div className="help-block with-errors text-danger" />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <button
                        type="submit"
                        className={`btn py-2 bg-blue text-white btn-lg btn-block ${
                          isLogining && "disabled"
                        }`}
                      >
                        {isLogining && (
                          <i className="fas fa-spinner fa-pulse mr-3"></i>
                        )}
                        Connexion
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
  authError: state.auth.error,
  isLogining: state.auth.isLogining,
});

export default connect(mapStateToProps, { login })(Login);
