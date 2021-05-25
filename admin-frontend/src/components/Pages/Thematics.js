import React, { useEffect } from "react";
import Card from "../template_parts/Card";
import Sidebar from "./../template_parts/Sidebar";
import Spinner from "./../template_parts/Spinner";
import { connect } from "react-redux";
import { loadThematics } from "../../actions/thematic";
import { IMAGES_ROOT } from "../urls";
import { v4 as uuidv4 } from "uuid";
const Thematic = ({ loadThematics, thematic: { thematics, loading } }) => {
  useEffect(() => {
    if (thematics.length == 0) loadThematics();
  }, [loadThematics]);
  let root = IMAGES_ROOT + "/thematics/";

  return (
    <React.Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <h1 className="text-center">Les experiences</h1>
          <div className="row">
            {thematics.map((thematic) => (
              <Card
                key={uuidv4()}
                image={root + thematic.fileName}
                title={thematic.name}
                description={thematic.description}
              />
            ))}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};
const mapStateToProps = (state) => ({
  thematic: state.thematic,
});
export default connect(mapStateToProps, {
  loadThematics,
})(Thematic);
