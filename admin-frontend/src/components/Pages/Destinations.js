import React, { useEffect } from "react";
import Card from "../template_parts/Card";
import Sidebar from "./../template_parts/Sidebar";
import { connect } from "react-redux";
import Spinner from "./../template_parts/Spinner";
import { loadDestinations } from "../../actions/destination";
import { IMAGES_ROOT } from "../urls";
import { v4 as uuidv4 } from "uuid";

const Destinations = ({
  loadDestinations,
  destination: { destinations, loading },
}) => {
  useEffect(() => {
    if (destinations.length == 0) loadDestinations();
  }, [loadDestinations]);
  let root = IMAGES_ROOT + "/destinations/";
  return (
    <React.Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <h1 className="text-center">Les destinations disponibles</h1>
          <div className="row">
            {destinations.map((destination) => (
              <Card
                key={uuidv4()}
                image={root + destination.fileName}
                title={destination.address}
                description={destination.description}
              />
            ))}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};
const mapStateToProps = (state) => ({
  destination: state.destination,
});
export default connect(mapStateToProps, {
  loadDestinations,
})(Destinations);
