import React from "react";

function LocationEntry(props) {
  let { id, content, author, dateCreated } = props.entry;
  let deleteComment = props.deleteComment;

  return (
    <tr>
      <td>{content}</td>
      <td>{author.email}</td>
      <td>{new Date(dateCreated).toLocaleDateString()}</td>
      <td>
        <div class="btn-group mr-2" role="group" aria-label="First group">
          <button
            type="button"
            class="btn text-danger btn-light"
            onClick={deleteComment}
          >
            <i class="fas fa-trash-alt p-1"></i>
          </button>
        </div>
      </td>
    </tr>
  );
}

export default LocationEntry;
