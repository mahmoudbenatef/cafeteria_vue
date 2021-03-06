import hostUrl from "./hostUrl";
import axios from "axios";
const proudctsUrl = hostUrl + "product";
const token = JSON.parse(localStorage.getItem("user"));
export default {
  getAllProudct: (page = 1) => {
    return fetch(proudctsUrl + "?page=" + page, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + token["token"],
      },
    });
  },
  listAllProducts:()=>{
    return axios.get(hostUrl + "listAllProducts" , {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + token["token"],
      },
    });
  },

  getProducts:()=>{
  return   axios.get(proudctsUrl, {
    headers: {
      Authorization: "Bearer " + token["token"],
      'Accept':"application/json"
    }
  })
},
  createProudct: (proudct) => {
    return axios.post(proudctsUrl, proudct, {
      headers: {
        Authorization: "Bearer " + token["token"],
        "Content-Type":
          "multipart/form-data; charset=utf-8; boundary=" +
          Math.random()
            .toString()
            .substr(2),
      },
    });
  },

  updateProudct: (id, proudct) => {
    return axios.patch(proudctsUrl + `/${id}`, proudct, {
      headers: {
        Authorization: "Bearer " + token["token"],
      },
    });
  },

  deleteProduct: (id) => {
    return axios.delete(proudctsUrl + `/${id}`, {
      headers: {
        Authorization: "Bearer " + token["token"],
      },
    });
  },

  getProudctById: (id) => {
    return axios.get(proudctsUrl + `/${id}`, {
      headers: {
        Authorization: "Bearer " + token["token"],
      },
    });
  },

  getCategories: () => {
    return axios.get(hostUrl + "categoryLookup", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token["token"],
      },
    });
  },
};
