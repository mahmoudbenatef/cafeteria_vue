<template @submit.prevent>
  <!--  <form class="mt-5">-->
  <h1>edit</h1>
  <br />
  <div class="mb-3 row">
    <label for="name" class="form-label col-md-3">Name</label>
    <input
      type="text"
      v-model="user.name"
      class="form-control col-md-8"
      id="name"
    />
  </div>
  <div class="row">
    <div class="col-md-3"></div>
    <div class="col-md-8">
      <p v-if="'name' in errors && user.name === ''">
        {{ errors["name"][0] }}
      </p>
    </div>
  </div>
  <div class="mb-3 row">
    <label for="exampleInputEmail1" class="form-label col-md-3"
      >Email address</label
    >
    <input
      type="email"
      v-model="user.email"
      class="form-control col-md-8"
      id="exampleInputEmail1"
      aria-describedby="emailHelp"
    />
  </div>
  <div class="row">
    <div class="col-md-3"></div>
    <div class="col-md-8">
      <p v-if="'email' in errors && user.email === ''">
        {{ errors["email"][0] }}
      </p>
    </div>
  </div>

  <div class="mb-3 row">
    <label for="exampleInputPassword1" class="form-label col-md-3"
      >Password</label
    >
    <input
      type="password"
      v-model="user.password"
      class="form-control col-md-8"
      id="exampleInputPassword1"
    />
  </div>

  <div class="row">
    <div class="col-md-3"></div>
    <div class="col-md-8">
      <p v-if="'password' in errors">
        {{ errors["password"][0] }}
      </p>
    </div>
  </div>

  <div class="mb-3 row">
    <label for="exampleInputEmail1" class="form-label col-md-3">Room</label>
    <select
      v-model="user.room_id"
      class="form-select form-select-lg mb-3 form-control col-md-8"
      aria-label=".form-select-lg example"
    >
      <option selected>Open this select menu</option>
      <option v-for="room in rooms" v-bind:value="room.id" :key="room.id">
        {{ room.number }}
      </option>
    </select>
  </div>
  <div class="row">
    <div class="col-md-3"></div>
    <div class="col-md-8">
      <p v-if="'room_id' in errors">
        {{ errors["room_id"][0] }}
      </p>
    </div>
  </div>

  <div class="mb-3 row">
    <label for="name" class="form-label col-md-3">Ext</label>
    <input
      type="text"
      v-model="user.ext"
      class="form-control col-md-8"
      id="ext"
    />
  </div>
  <div class="row">
    <div class="col-md-3"></div>
    <div class="col-md-8">
      <p v-if="'ext' in errors && myuser.ext === ''">
        {{ errors["ext"][0] }}
      </p>
    </div>
  </div>
  <div class="mb-3 row">
    <label for="name" class="form-label col-md-3">Profile pic</label>
    <input
      type="file"
      class="form-control col-md-8"
      v-on:change="onFileChange"
    />
  </div>

  <button type="" class="btn btn-primary">{{ myuser }}</button>
  <button type="submit" class="btn btn-primary" @click="updateData">
    update
  </button>
  <!--  </form>-->
</template>

<script>
import axios from "axios";
import user from "./services/user";

export default {
  name: "UpdateUser",
  data() {
    return {
      photo: "",
      rooms: [],
      user: {
        name: "",
        email: "",
        password: "",
        c_password: "",
        room_id: "",
        ext: "",
        photo: null,
      },
      errors: {},
      hasImage: false,
    };
  },
  components: {},
  props: ["myuser"],

  methods: {
    testme() {
      console.log("edit user ", this.myuser);
    },
    onFileChange(e) {
      this.user.photo = e.target.files[0];
      this.hasImage = true;
      console.log("my image", this.photo);
    },

    updateData() {
      //   let response;
      let formData;
      if (this.hasImage) {
        formData = new FormData();
        // formData.append("photo", this.photo);
        console.log("inside if");
        for (const [key, value] of Object.entries(this.user)) {
          formData.append(key, value);
        }
      } else {
        formData = this.user;
      }
      console.log(this.user);

      axios
        .post(
          `http://127.0.0.1:8000/api/user/${this.myuser.id}?_method=patch`,
          formData
        )
        .then((response) => {
          console.log(response, "this is axios new way ");
          //   this.$router.push("admin");
          this.$emit("submitAddUserClicked", "AdminListUsers");
        })
        .catch(function (error) {
          console.log(error);
          console.log("please check your data ");
        });
      //=======================
    },
    // async updateProduct() {
    //   if (this.validateForm()) {
    //     let response;
    //     if (this.hasImage) {
    //       let formData = new FormData();
    //       for (const [key, value] of Object.entries(this.product)) {
    //         formData.append(key, value);
    //       }
    //       response = await services.updateProudct(this.product.id, formData);
    //     } else {
    //       response = await services.updateProudct(
    //         this.product.id,
    //         this.product
    //       );
    //     }
    //     response["data"]["status"] == "success"
    //       ? this.$router.push("/products")
    //       : (this.errors = response["data"]["message"]);
    //   }
    // },
  },
  created() {
    this.user = this.myuser;
    fetch("http://127.0.0.1:8000/api/room")
      .then((response) => response.json())
      .then((json) => {
        this.rooms = json.data;
        console.log(this.rooms);
      });
  },
};
</script>

<style scoped>
</style>
