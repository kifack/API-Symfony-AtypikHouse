import React, { useState } from "react";
import ReactDOM from "react-dom";
import { v4 as uuidv4 } from "uuid";

import {
  CardElement,
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const CARD_ELEMENT_OPTIONS = {
  iconStyle: "solid",
  hidePostalCode: true,
  style: {
    base: {
      iconColor: "rgb(240, 57, 122)",
      color: "rgb(240, 57, 122)",
      fontSize: "16px",
      fontFamily: '"Open Sans", sans-serif',
      fontSmoothing: "antialiased",
      "::placeholder": {
        color: "#CFD7DF",
      },
    },
    invalid: {
      color: "#e5424d",
      ":focus": {
        color: "#303238",
      },
    },
  },
};

const CheckoutForm = (props) => {
  let profil = props.profil;
  console.log(profil);
  const stripe = useStripe();
  const elements = useElements();
  const [fields, setFields] = useState({
    name: profil.name,
    lastName: profil.lastName,
    email: profil.email,
    address: profil.rue + "," + profil.zipCode + " " + profil.city,
    persons: 1,
    card: "",
    date: "",
    cvc: "",
  });

  const [card, setCard] = useState({});
  const [errors, setErrors] = useState([]);

  // console.log(stripe);

  const handleChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      console.log("no stripe");
      return;
    }

    let err = validateInputs(fields);
    if (err.length > 0) {
      setErrors(err);
    } else {
      const card = elements.getElement(CardElement);
      const result = await stripe.createToken(card);
      if (result.error) {
        console.log(result.error.message);
        setErrors(["Numéro de carte incorrecte"]);
      } else {
        props.setInfo(result.token);
        console.log(result.token);
        props.nextStep({ ...fields });
      }
    }
  };

  const handleCard = (e) => {
    // console.log(e);
  };

  return (
    <form onSubmit={handleSubmit}>
      {errors.length > 0 && (
        <div className="alert alert-danger px-4">
          <ul>
            {errors.map((error) => (
              <li key={uuidv4()}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="form-group">
        <label htmlFor="da">Name:</label>
        <input
          value={fields.name}
          type="text"
          name="name"
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="da">Prénom:</label>
        <input
          type="text"
          value={fields.lastName}
          name="lastName"
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="da">Email:</label>
        <input
          type="email"
          name="email"
          value={fields.email}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="da">Address:</label>
        <input
          type="text"
          name="address"
          value={fields.address}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="da">Number of person:</label>
        <input
          type="number"
          name="persons"
          onChange={handleChange}
          value={fields.persons}
          className="form-control"
        />
      </div>
      {/* <Elements stripe={stripePromise}> */}
      <div className="form-group">
        <label htmlFor="da">Information bancaire</label>
        <CardElement options={CARD_ELEMENT_OPTIONS} onChange={handleCard} />
      </div>
      {/* </Elements> */}
      <div className="form-group d-flex justify-content-around">
        <button onClick={props.prevStep} className="btn btn-light">
          Précédent
        </button>
        <button disabled={!stripe} className="btn btn-info" type="submit">
          Suivant
        </button>
      </div>
    </form>
  );
};

function validateInputs(fields) {
  let errors = [];

  if (!fields.name) errors.push("Veuillez renseigner votre nom");

  if (!fields.lastName) errors.push("Veuillez renseigner votre prénom");

  if (!fields.email) errors.push("Veuillez renseigner votre email");

  if (!fields.address) errors.push("Veuillez renseigner votre adresse");

  if (!fields.persons || parseFloat(fields.persons) <= 0)
    errors.push("Veuillez renseigner le nombre de personnes");

  return errors;
}

export default CheckoutForm;

// const App = () => (
//   <Elements stripe={stripePromise}>
//     <CheckoutForm />
//   </Elements>
// );
