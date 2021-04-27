import hostUrl from "./hostUrl";
import axios from "axios";
const usersUrl = hostUrl + "user/";
export default {
  getMyOrders: (page = 1) => {
    const user = JSON.parse(localStorage.getItem("user"));
    return axios.get(usersUrl + user["id"] + "/orders?page=" + page, {
      headers: {
        Authorization: "Bearer " + user["token"],
      },
    });
  },
  getMyFilteredOrders: (date) => {
    const user = JSON.parse(localStorage.getItem("user"));
    return fetch(usersUrl + user["id"] + "/orders/filter" + date, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + user["token"],
      },
    });
  },
  getUsers: () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return axios.get(usersUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user["token"],
      },
    });
  },
  updateOrder: (id, order) => {
    const user = JSON.parse(localStorage.getItem("user"));
    return axios.patch(hostUrl + `order/${id}`, order, {
      headers: {
        Authorization: "Bearer " + user["token"],
      },
    });
  },
};
