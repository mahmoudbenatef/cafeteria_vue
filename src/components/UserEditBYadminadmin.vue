<template @submit.prevent>
<!--  <form class="mt-5">-->
  <h1>edit </h1>
  <br>
    <div class="mb-3 row">
      <label for="name" class="form-label col-md-3">Name</label>
      <input type="text"  v-model="myuser.name" class="form-control col-md-8" id="name" >
    </div>
  <div class="row">
    <div class="col-md-3"></div>
    <div class="col-md-8">
      <p v-if="'name'in errors && myuser.name ==='' ">
        {{errors["name"][0]}}
      </p>
    </div>
  </div>
    <div class="mb-3 row">
      <label for="exampleInputEmail1" class="form-label col-md-3">Email address</label>
      <input type="email" v-model="myuser.email" class="form-control col-md-8" id="exampleInputEmail1" aria-describedby="emailHelp">
    </div>
  <div class="row">
    <div class="col-md-3"></div>
    <div class="col-md-8">
      <p v-if="'email'in errors && myuser.email ===''">
        {{errors["email"][0]}}
      </p>
    </div>
  </div>

  <div class="mb-3 row">
    <label for="exampleInputPassword1" class="form-label col-md-3">Password</label>
    <input type="password" v-model="myuser.password" class="form-control col-md-8" id="exampleInputPassword1">
  </div>

  <div class="row">
    <div class="col-md-3"></div>
    <div class="col-md-8">
      <p v-if="'password'in errors">
        {{errors["password"][0]}}
      </p>
    </div>
  </div>



  <div class="mb-3 row">
    <label for="exampleInputEmail1" class="form-label col-md-3">Room</label>
    <select v-model="myuser.room_id" class="form-select form-select-lg mb-3 form-control col-md-8" aria-label=".form-select-lg example">
      <option selected>Open this select menu</option>
      <option v-for="room in rooms"   v-bind:value="room.id">{{ room.number }}</option>
    </select>
  </div>
  <div class="row">
    <div class="col-md-3"></div>
    <div class="col-md-8">
      <p v-if="'room_id'in errors">
        {{errors["room_id"][0]}}
      </p>
    </div>
  </div>

  <div class="mb-3 row">
    <label for="name" class="form-label col-md-3">Ext</label>
    <input type="text"  v-model="myuser.ext" class="form-control col-md-8" id="ext" >
  </div>
  <div class="row">
    <div class="col-md-3"></div>
    <div class="col-md-8">
      <p v-if="'ext'in errors && myuser.ext ===''">
        {{errors["ext"][0]}}
      </p>
    </div>
  </div>
  <div class="mb-3 row">
  <label for="name" class="form-label col-md-3">Profile pic</label>
  <input type="file" class="form-control col-md-8" v-on:change="onFileChange" >
  </div>

  <button type="" class="btn btn-primary" >{{myuser}}</button> 
  <button type="submit" class="btn btn-primary" @click="updateData">update</button> 
<!--  </form>-->
</template>
<script>
import services from "./services/user";
export default {
  data: () => ({
       
     myuser:{
       name:"",
       email:'',
        password:'',
    //    c_password:'',
       room_id:'',
       ext:''
    },
    errors: {},
    hasImage: false,
    categories: null,
  }),
  methods: {
    async getUser(id) {
      const response = await services.getUserById(id);
      this.myuser = response["data"]["data"];
    },

    
    uploadImage(e) {
      this.myuser.photo = e.target.files[0];
      this.hasImage = true;
    },
    validateForm() {
      this.errors = {};
      //   let isValid = this.product.category_id != "null" ;
      // //   || this.product.price != "";
      //   console.log(isValid);
      for (const key in this.product) {
        this.myuser[key] == null && (this.errors[key] = `${key} is required`);
      }
      return Object.keys(this.errors).length == 0 ? true : false;
    },
    async updateData() {
      if (this.validateForm()) {
        let response;
        if (this.hasImage) {
          let formData = new FormData();
          for (const [key, value] of Object.entries(this.myuser)) {
            formData.append(key, value);
          }
          response = await services.updateUser(this.myuser.id, formData);
        } else {
          response = await services.updateUser(
            this.myuser.id,
            this.myuser
          );
        }
        response["data"]["status"] == "success"
          ? this.$router.push("/login")
          : (this.errors = response["data"]["message"]);
      }
    },
  },
  created() {
    this.getUser(this.$route.params.id);
  
  },
};
</script>
