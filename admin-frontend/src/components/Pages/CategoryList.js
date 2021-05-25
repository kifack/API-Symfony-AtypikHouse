import React, { useEffect } from "react";
import Card from "../template_parts/Card";
import Sidebar from "./../template_parts/Sidebar";
import { connect } from "react-redux";
import Spinner from "./../template_parts/Spinner";
import { loadCategories } from "../../actions/category";
import { IMAGES_ROOT } from "../urls";
import { v4 as uuidv4 } from "uuid";

const CategoryList = ({
  loadCategories,
  category: { categories, loading },
}) => {
  useEffect(() => {
    if (categories.length == 0) loadCategories();
  }, [loadCategories]);
  let root = IMAGES_ROOT + "/categories/";

  return (
    <React.Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <h1 className="text-center">Les destinations disponibles</h1>
          <div className="row">
            {categories.map((category) => (
              <Card
                key={uuidv4()}
                image={root + category.fileName}
                title={category.name}
                description={category.description}
              />
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
})(CategoryList);
