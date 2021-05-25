import React, { useEffect } from "react";
import setAuthToken from "../utils/setAuthToken";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
// Fichiers css
import "./../css/App.css";
import "./../css/Responsive.css";
//*** Template parts  */
import Header from "./template_parts/Header.js";
import Footer from "./template_parts/Footer";
import Sidebar from "./template_parts/Sidebar.js";
// Les pages coté de l'administrateur
import AdminHome from "./Pages/Home";
import Login from "./Pages/Login";
import Comments from "./Pages/Comments";
import Users from "./Pages/Users";
import Categories from "./Pages/Categories";
import CreateField from "./Pages/CreateField";
import Fields from "./Pages/Fields";
import AddForm from "./Pages/AddForm";
import Location from "./Pages/Location";
import Destinations from "./Pages/Destinations";
import CategoryList from "./Pages/CategoryList";
import Thematics from "./Pages/Thematics";
import UserProfile from "./Pages/UserProfile";

import { loadUser } from "./../actions/auth";

import { connect } from "react-redux";

function App({ isAuthenticated, loadUser, show }) {
  useEffect(() => {
    // Si le token est dans le storage
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      console.log("Set auth token");
      loadUser();
    }
  }, []);
  return (
    <BrowserRouter>
      {isAuthenticated ? (
        <React.Fragment>
          <Header />
          <div className={`wrapper ${show && "collapse-sidebar"}`}>
            <Sidebar />
            <div className="main_content">
              <Switch>
                <Route exact path="/" component={AdminHome} />
                <Route path="/comments" component={Comments} />
                <Route path="/users" component={Users} />
                <Route path="/:categoryId/new-field" component={CreateField} />
                <Route
                  path="/destination"
                  render={(props) => <AddForm type={2} {...props} />}
                />
                <Route
                  path="/category"
                  render={(props) => <AddForm type={1} {...props} />}
                />
                <Route
                  path="/experience"
                  render={(props) => <AddForm type={0} {...props} />}
                />
                <Route path="/categories" component={Categories} />
                <Route path="/:categoryId/fields" component={Fields} />
                <Route path="/location/:id" component={Location} />
                <Route path="/destinations" component={Destinations} />
                <Route path="/thematics" component={Thematics} />
                <Route path="/category-list" component={CategoryList} />
                <Route path="/user/:id" component={UserProfile} />
                <Redirect to="/" />
              </Switch>
            </div>
          </div>
        </React.Fragment>
      ) : (
        <Switch>
          <Route path="/login" component={Login} />
          <Redirect to="/login" />
        </Switch>
      )}

      {/* <Switch>
        <Route path="/login" component={Login} />
      </Switch> */}

      {/* <Footer /> */}
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  show: state.user.showSidebar,
});
export default connect(mapStateToProps, { loadUser })(App);
