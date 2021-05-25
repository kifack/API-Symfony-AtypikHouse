import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
// Fichiers css
import "./../css/App.css";
import "./../css/Responsive.css";
//*** Template parts  */
import Header from "./template_parts/Header.js";
import Footer from "./template_parts/Footer";
//*************Pages generique */
import Accueil from "./Pages/Accueil";
import Destinations from "./Pages/Destinations";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Inspirations from "./Pages/Inspirations";
import Categories from "./Pages/Categories";
import Locations from "./Pages/Locations";
import Location from "./Pages/Location";
import CreateLocation from "./Pages/CreateLocation";
import CreateActivity from "./Pages/CreateActivity";
import Order from "./Pages/Order";

/* *********OWNER********************* */
import BecomeOwner from "./Pages/becomeOwner";
// Les pages d'utilisateur
import Profile from "./User/Profile";
import Bookings from "./User/Bookings";
import EditProfile from "./User/EditProfile";
import Contact from "./Pages/Contact";
import WhishList from "./Pages/WhishList";

import { Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { loadingData } from "./../actions";
import { Circular } from "styled-loaders-react";
import Orders from "./Owner/Orders";

//Pages du proprietaires
import Properties from "./Owner/Properties";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        {this.props.loading ? (
          <>
            <Header />
            <main>
              <Switch>
                <Route
                  path="/destinations"
                  render={(props) => <Destinations {...props} />}
                />
                <Route exact path="/" component={Accueil} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/inspirations" component={Inspirations} />
                <Route path="/categories" component={Categories} />
                <Route path="/locations" component={Locations} />
                <Route path="/location/:id" component={Location} />

                <Route path="/contact" component={Contact} />
                <Route path="/whishlist" component={WhishList} />

                <Route path="/create-location" component={CreateLocation} />
                <Route path="/order" component={Order} />
                {/* Les routes utilisateur */}
                {this.props.connect ? (
                  <>
                    <Route path="/user/profile/:id" component={Profile} />
                    <Route path="/user/bookings" component={Bookings} />
                    <Route path="/user/edit-profile" component={EditProfile} />
                    <Route path="/user/properties" component={Properties} />
                    <Route path="/user/:locationId/orders" component={Orders} />
                    <Route
                      path="/user/:locationId/create-activity"
                      component={CreateActivity}
                    />
                    <Route path="/becomeOwner" component={BecomeOwner} />
                  </>
                ) : (
                  <>
                    <Redirect to="/" />
                  </>
                )}
              </Switch>
            </main>
            <Footer />
          </>
        ) : (
          <div className="conteneurLoader">
            <Circular color="#1b6e86 " size="150px" />
          </div>
        )}
      </BrowserRouter>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    loading: state.loading.load,
    connect: state.profil.connect,
  };
};

export default connect(mapStateToProps)(App);
