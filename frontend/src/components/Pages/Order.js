import React, { useState, useEffect } from "react";

import Calendar from "../template_parts/Calendar";
import Confirm from "../template_parts//Confirm";
import CheckoutForm from "../template_parts/CheckoutForm";
import "../../css/calendar.css";
import { connect } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { Redirect } from "react-router-dom";
import { addBooking } from "../../actions/booking";
import { loadDateSlots } from "../../actions/booking";
import Loader from "../template_parts/Loader";
import {
  CardElement,
  Elements,
  CardNumberElement,
  useStripe,
  ElementsConsumer,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(`	
pk_test_51Han1IFwzXyd3351l4QT3b6wuJWxr6MNJTlIvu8qvzRotLpyYMOCPoICDDOBXWtc1DYowA1cozHTqdXe0DdouWJu00LCu1hzbU`);

function Order(props) {
  //   if (!props.location) props.history.push("/locations");
  //   if (!props.connect) props.history.push("/login?redirect=orders");

  let loadDateSlots = props.loadDateSlots;

  useEffect(() => {
    if (props.loaction) {
      loadDateSlots(props.location.id);
    }
  }, [loadDateSlots]);

  const [step, setStep] = useState(1);
  const [state, setState] = useState({});
  const [stripeInfo, setStripeInfo] = useState(null);

  const nextStep = (data) => {
    // console.log(data);
    setState({ ...state, ...data });
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  let isLoading = props.booking.loadingSlots;

  const handleSubmit = async (e) => {
    let data = {
      location: props.location.id,
      startAt: state.startDate.toLocaleDateString().replaceAll("/", "-"),
      endAt: state.endDate.toLocaleDateString().replaceAll("/", "-"),
      persons: state.persons,
      persons: parseInt(state.persons),
      name: state.name,
      lastName: state.lastName,
      email: state.email,
      total: state.total,
      token: stripeInfo.id,
      last4: stripeInfo.card.last4,
      expiresAt: stripeInfo.card.exp_month + "/" + stripeInfo.card.exp_year,
    };

    let formData = new FormData();

    for (let key in data) {
      formData.append(key, data[key]);
    }

    console.log(formData);

    props.addBooking(formData);
    props.history.push("/user/bookings");
  };

  let result;
  switch (step) {
    case 1:
      result = (
        <Calendar
          location={props.location}
          nextStep={nextStep}
          history={props.history}
          slots={props.booking.slots}
          // handleChange={this.handleChange}
        />
      );
      break;
    case 2:
      result = (
        <Elements stripe={stripePromise}>
          <CheckoutForm
            profil={props.profil}
            nextStep={nextStep}
            prevStep={prevStep}
            setInfo={setStripeInfo}
          />
        </Elements>
      );
      break;
    case 3:
      let confirmData = {
        name: state.name,
        // name: props.profil.name + " " + props.profil.lastName,
        address: state.address,
        location: props.location.name,
        locationAddress:
          props.location.street +
          " ," +
          props.location.city +
          " , " +
          props.location.postal_code,
        persons: state.persons,
        startAt: state.startDate,
        endAt: state.endDate,
        total: state.total,
      };
      result = (
        <Confirm
          data={confirmData}
          handleSubmit={handleSubmit}
          prevStep={prevStep}
        />
      );
      break;

    default:
      console.log("This is a multi-step form built with React.");
  }

  if (!props.location) return <Redirect to={"/locations"} />;

  return (
    <div className="container my-4">
      {props.connect ? (
        <>
          {isLoading ? (
            <Loader />
          ) : (
            <div className="row">
              <div className="col-md-10 mx-auto">{result}</div>)
            </div>
          )}
        </>
      ) : (
        <Redirect to={"/login?redirect=/order"} />
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  location: state.location.location,
  connect: state.profil.connect,
  profil: state.profil.profil,
  booking: state.booking,
});
export default connect(mapStateToProps, { addBooking, loadDateSlots })(Order);
