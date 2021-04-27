<template>
  <div class="container">
    <AddRoomComponent
      v-if="!editing"
      v-bind:errors="addRoomErrors"
      v-bind:room="room"
      @addRoom="addRoom"
    ></AddRoomComponent>
    <EditRoomComponent
      v-if="editing"
      v-bind:errors="addRoomErrors"
      v-bind:room="roomToBeEdited"
      @updateRoom="updateRoom"
    ></EditRoomComponent>

    <table class="table table-striped table-active table-bordered mb-5">
      <thead>
        <tr>
          <th>room number</th>
          <th colspan="1">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="room in rooms.data" :key="room.id" class="bg-dark text-light">
          <td>{{ room.number }}</td>
          <td>
            <button @click="editRoom(room)" class="btn btn-link text-light">edit</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="footer">
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li
          v-for="page in rooms['links']"
          :key="page.label"
          :class="[
            'page-item',
            page.active ? 'active' : '',
            page.url == null ? 'disabled' : '',
          ]"
        >
          <a
            class="page-link"
            @click.prevent="getAllRooms(page.url.split('=')[1])"
          >
            <span aria-hidden="true">
              {{
                page.label.split(" ")[1] == "Previous"
                  ? page.label.split(" ")[1]
                  : page.label.split(" ")[0]
              }}
            </span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
import services from "../services/rooms.js";
import AddRoomComponent from "@/components/rooms/AddRoomComponent";
import EditRoomComponent from "@/components/rooms/EditRoomComponent";
import roomServices from "@/components/services/rooms";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      rooms: {},
      room: "",
      addRoomErrors: [],
      editing: false,
      roomToBeEdited: {},
    };
  },
  methods: {
    async getAllRooms(page) {
      const res = await services.displayAllRooms(page);
      const data = await res.json();
      this.rooms = data["data"];
    },
    async deleteRoom(id) {
      const res = await services.getAllRooms();
      const data = await res.json();
      this.rooms = data["data"];
    },
    async addRoom(room) {
      this.addRoomErrors = [];
      const res = services
        .createRoom(room)
        .then((response) => {
          if (response.data.status == "success") {
            this.getAllRooms();
          } 
        })
        .catch((err) => {
          this.addRoomErrors = err.response.data.message;
        });
    },
    editRoom(room) {
      this.roomToBeEdited = room;
      this.editing = true;
    },
    updateRoom(room) {
      services
        .updateRoom(room.id, room.number)
        .then((response) => {
          if (response.data.status == "success") {
            this.getAllRooms();
            this.editing = false;
            this.roomToBeEdited = {};
            this.addRoomErrors = [];
          }
        })
        .catch((err) => {
          this.addRoomErrors = err.response.data.message;
        });
    },
  },
  created() {
    this.getAllRooms();
  },
  components: {
    EditRoomComponent,
    AddRoomComponent,
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
