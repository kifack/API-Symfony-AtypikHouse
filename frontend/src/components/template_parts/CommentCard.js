import React from "react";

const CommentCard = (props) => {
  let comment = props.comment;
  return (
    <React.Fragment>
      <div className="col-md-6">
        <div className="row">
          <div className="col-md-4">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTfw-Nl9aa2QK3Et-Ew2FObV_3QRwoDw988viiWQbKM-be6NPV8bPnRckdOdOTXfzK0HwluQJXUm8hWJJDnXpp9Pew6DNVXsbYc_A&usqp=CAU&ec=45690273"
              style={{ width: 120 }}
            />
          </div>
          <div className="col-md-8" style={{ marginLeft: "-40px" }}>
            <h3 className="text-info">
              {comment.author != undefined && comment.author.name}
            </h3>
            <p>{comment.content}</p>
            <span className="text-muted">Posté le {comment.dateCreated}</span>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CommentCard;
