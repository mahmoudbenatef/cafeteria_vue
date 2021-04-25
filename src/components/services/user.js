import hostUrl from "./hostUrl";
import axios from "axios";
const usersUrl = hostUrl + "user/";
const user = JSON.parse(localStorage.getItem("user"));
export default {
  getMyOrders: (page = 1) => {
    return axios.get(usersUrl + user["id"] + "/orders?page=" + page, {
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
};
