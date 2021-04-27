import hostUrl from "./hostUrl";
import axios from "axios";
const categoryUrl = hostUrl + "category";
const token = JSON.parse(localStorage.getItem("user"));
export default {
  getAllCategories: (page = 1) => {
    return axios.get(categoryUrl + "?page=" + page, {
      headers: {
        Authorization: "Bearer " + token["token"],
      },
    });
  },
  createCategory: (category) => {
    return axios.post(
      categoryUrl,
      { name: category },
      {
        headers: {
          Authorization: "Bearer " + token["token"],
          Accept: "application/json",
        },
      }
    );
  },

  deleteCategory: (id) => {
    return axios.delete(categoryUrl + `/${id}`, {
      headers: {
        Authorization: "Bearer " + token["token"],
        Accept: "application/json",
      },
    });
  },
};
