import React, { useEffect } from "react";
import "../../css/card.css";
import CategoryCard from "../template_parts/CategoryCard";
import { v4 as uuidv4 } from "uuid";
import { loadCategories } from "../../actions/category";
import { connect } from "react-redux";
import Loader from "../template_parts/Loader";

const Categories = ({ loadCategories, category }) => {
  useEffect(() => {
    loadCategories();
  }, [loadCategories]);
  let { categories, loading } = category;
  return (
    <React.Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="container my-3">
          <h1 className="text-info my-3">
            Les types d'hébergements disponibles
          </h1>
          <div className="row ">
            {categories.map((category) => (
              <div className="col-md-4 my-2" key={uuidv4()}>
                <CategoryCard category={category} />
              </div>
            ))}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  category: state.category,
});
export default connect(mapStateToProps, {
  loadCategories,
})(Categories);
