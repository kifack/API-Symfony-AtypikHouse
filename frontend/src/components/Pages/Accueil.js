import React from "react";
import Destinations from "../template_parts/Destinations";
import GoodMoments from "../template_parts/GoodMoments";
import SearchForm from "../template_parts/SearchForm";
import Slogan from "../template_parts/Slogan";
import { loadDestinations } from "../../actions/destinations";
import { dataThematics } from "../../actions/thematic";
import { loadCategories } from "../../actions/category";
import { connect } from "react-redux";
import { Circular } from "styled-loaders-react";

class Accueil extends React.Component {
  componentDidMount() {
    this.props.loadDestinations();
    this.props.dataThematics();
    this.props.loadCategories();
  }
  render() {
    return this.props.destinations.loading && this.props.thematics.loading ? (
      <>
        <section id="searchSection" className="d-flex align-items-end">
          <div id="conteneur_searchForm" className="container">
            <SearchForm
              thematics={this.props.thematics.thematics}
              destinations={this.props.destinations.destinations}
              categories={this.props.categories.categories}
              history={this.props.history}
            />
          </div>
        </section>
        <section id="experiency" className="blue-sky">
          <GoodMoments thematics={this.props.thematics} />
        </section>
        <section id="destionationsAccueil" className="blue-sky">
          <Destinations destinations={this.props.destinations} />
        </section>
        <section id="slogan">
          <Slogan />
        </section>
      </>
    ) : (
      <div className="conteneurLoader">
        <Circular color="#1b6e86 " size="150px" />
      </div>
    );
  }
}
const destionPropsState = (state) => {
  return {
    thematics: state.thematic,
    destinations: state.destination,
    categories: state.category,
  };
};
export default connect(destionPropsState, {
  dataThematics,
  loadDestinations,
  loadCategories,
})(Accueil);
