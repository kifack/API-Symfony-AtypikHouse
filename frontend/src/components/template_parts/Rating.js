import React from "react";

const Rating = ({ value, color }) => {
  return (
    <div className="rating">
      <span>
        <i
          className={
            value >= 1
              ? "fas fa-star text-warning"
              : value >= 0.5
              ? "fas fa-star-half-alt text-warning"
              : "far fa-star text-secondary"
          }
        ></i>
      </span>
      <span>
        <i
          className={
            value >= 2
              ? "fas fa-star text-warning"
              : value >= 1.5
              ? "fas fa-star-half-alt text-warning"
              : "far fa-star text-secondary"
          }
        ></i>
      </span>
      <span>
        <i
          className={
            value >= 3
              ? "fas fa-star text-warning"
              : value >= 2.5
              ? "fas fa-star-half-alt text-warning"
              : "far fa-star text-secondary"
          }
        ></i>
      </span>
      <span>
        <i
          className={
            value >= 4
              ? "fas fa-star text-warning"
              : value >= 3.5
              ? "fas fa-star-half-alt text-warning"
              : "far fa-star text-secondary"
          }
        ></i>
      </span>
      <span>
        <i
          className={
            value >= 5
              ? "fas fa-star text-warning"
              : value >= 4.5
              ? "fas fa-star-half-alt text-warning"
              : "far fa-star text-secondary"
          }
        ></i>
      </span>
    </div>
  );
};

Rating.defaultProps = {
  color: "#f8e825",
};

export default Rating;
