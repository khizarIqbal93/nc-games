import axios from "axios";

export const getUserByUsername = (username) => {
  return axios
    .get(`https://khizars-games.herokuapp.com/api/users/${username}`)
    .then((response) => response.data.user);
};
