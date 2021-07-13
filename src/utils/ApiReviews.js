import axios from "axios";

export const getAllReviews = () => {
  return axios
    .get(`https://khizars-games.herokuapp.com/api/reviews`)
    .then((response) => response.data.reviews);
};

export const getReviewById = (review_id) => {
  return axios
    .get(`https://khizars-games.herokuapp.com/api/reviews/${review_id}`)
    .then((response) => response.data.review[0]);
};
