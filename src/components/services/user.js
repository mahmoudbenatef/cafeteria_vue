import hostUrl from "./hostUrl";
import axios from "axios";
const usersUrl = hostUrl + "user/";
const user = JSON.parse(localStorage.getItem("user"));
export default {
  getMyOrders: () => {
    return axios.get(usersUrl + user["id"] + "/orders", {
      headers: {
        Authorization: "Bearer " + user["token"],
      },
    });
  },
  getMyFilteredOrders: (date) => {
    return fetch(usersUrl + user["id"] + "/orders/filter" + date, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + user["token"],
      },
    });
  },
  updateUser: (id, user) => {
    return axios.patch(usersUrl + `/${id}`, user, {
      headers: {
        // Authorization: "Bearer " + token["token"],
      },
    });
  },
  getUserById: (id) => {
    return axios.get(usersUrl + `/${id}`, {
      headers: {
        // Authorization: "Bearer " + token["token"],
      },
    });
  }

};
