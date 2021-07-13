import axios from "axios";

export const getAllCategories = () => {
  return axios
    .get(`https://khizars-games.herokuapp.com/api/categories`)
    .then((response) => response.data.categories);
};
