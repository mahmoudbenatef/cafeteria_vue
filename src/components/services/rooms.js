import hostUrl from "./hostUrl";
import axios from "axios";
const roomsUrl = hostUrl + "room";
const token = JSON.parse(localStorage.getItem("user"));
export default {
  getAllRooms: () => {
    return fetch(roomsUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + token["token"],
      },
    });
  },
  displayAllRooms: (page = 1) => {
    return fetch(hostUrl + "rooms?page=" + page, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + token["token"],
      },
    });
  },
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

  updateRoom: (id, number) => {
    console.log(number);
    return axios.patch(
      roomsUrl + `/${id}`,
      { number: number },
      {
        headers: {
          Authorization: "Bearer " + token["token"],
        },
      }
    );
  },
};
