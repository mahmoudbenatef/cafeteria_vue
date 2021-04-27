import hostUrl from "./hostUrl";
import axios from "axios";
const ordersUrl = hostUrl + "order";
const token = JSON.parse(localStorage.getItem("user"));
export default {
  createRoom: (room) => {
    return axios.post(
      roomsUrl,
      { number: room },
      {
        headers: {
          Authorization: "Bearer " + token["token"],
          Accept: "application/json",
        },
      }
    );
  },
  createOrder: (order) => {
    return axios.post(ordersUrl, order, {
      headers: {
        Authorization: "Bearer " + token["token"],
        Accept: "application/json",
      },
    });
  },
};
