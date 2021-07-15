import axios from "axios";

export const getCommentsById = (review_id) => {
  return axios
    .get(
      `https://khizars-games.herokuapp.com/api/reviews/${review_id}/comments`
    )
    .then((response) => response.data.comments);
};

export const postComment = (review_id, username, comment_body) => {
  return axios
    .post(
      `https://khizars-games.herokuapp.com/api/reviews/${review_id}/comments`,
      { username: username, body: comment_body }
    )
    .then((response) => console.log(response))
    .catch((err) => console.log(err));
};
