import axios from "axios";

export const getCommentsById = (review_id) => {
  return axios
    .get(
      `https://khizars-games.herokuapp.com/api/reviews/${review_id}/comments`
    )
    .then((response) => response.data.comments);
};
