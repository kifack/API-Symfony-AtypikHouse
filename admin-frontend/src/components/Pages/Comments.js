import React, { Component, useEffect } from "react";
import Sidebar from "./../template_parts/Sidebar";
import { connect } from "react-redux";
import CommentEntry from "./../partials/CommentEntry";
import { loadComments, deleteComment } from "../../actions/comment";
import Spinner from "./../template_parts/Spinner";
import { v4 as uuidv4 } from "uuid";

const Comments = ({
  loadComments,
  deleteComment,
  comment: { comments, loading },
}) => {
  useEffect(() => {
    if (comments.length == 0) loadComments();
  }, [loadComments]);
  return loading ? (
    <Spinner />
  ) : (
    <React.Fragment>
      <h1 className="text-center">Les commentaires postés</h1>
      <table className="table  table-striped">
        <thead>
          <tr>
            <th>Contenu</th>
            <th>Utilisateur</th>
            <th>Date de publication</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {comments && comments.length > 0 ? (
            comments.map((comment) => (
              <CommentEntry
                key={uuidv4()}
                entry={comment}
                deleteComment={() => deleteComment(comment.id)}
              />
            ))
          ) : (
            <tr>
              <td colspan="4">
                <div className="alert alert-warning">
                  <i className="fas fa-info mr-2"></i>Aucun commentaire posté
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  comment: state.comment,
});
export default connect(mapStateToProps, {
  loadComments,
  deleteComment,
})(Comments);
