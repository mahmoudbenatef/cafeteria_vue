import hostUrl from "./hostUrl";
import axios from "axios";
const proudctsUrl = hostUrl + "product";
const token = "Bearer " + JSON.parse(localStorage.getItem("user"))["token"];
export default {
  getAllProudct: () => {
    return fetch(proudctsUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: token,
      },
    });
  },

  createProudct: (proudct) => {
    return axios.post(proudctsUrl, proudct, {
      headers: {
        Authorization: token,
        "Content-Type":
          "multipart/form-data; charset=utf-8; boundary=" +
          Math.random()
            .toString()
            .substr(2),
      },
    });
  },

  updateProudct: (id, proudct) => {
    return axios.post(proudctsUrl + `/${id}?_method=patch`, proudct, {
      headers: {
        Authorization: token,
      },
    });
  },

  deleteProduct: (id) => {
    return axios.delete(proudctsUrl + `/${id}`, {
      headers: {
        Authorization: token,
      },
    });
  },

  getProudctById: (id) => {
    return axios.get(proudctsUrl + `/${id}`, {
      headers: {
        Authorization: token,
      },
    });
  },

  getCategories: () => {
    return axios.get(hostUrl + "categoryLookup", {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });
  },
};
