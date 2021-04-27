<template @submit.prevent>
<!--  <form class="mt-5">-->
  <h1 class="text-center"> Add user </h1>
  <br>
  <div class="container    align-items-center">

       <div class="form-group ">
      <label for="name" class="form-label ">Name</label>
      <input type="text"  v-model="user.name" class="form-control col-md-8 ml-30"  id="name">
    </div>
  <div class="row">
    <div class="col-md-3"></div>
    <div class="col-md-8">
      <p v-if="'name'in errors">
        {{errors["name"][0]}}
      </p>
    </div>
  </div>
    <div class="form-group">
      <label for="exampleInputEmail1" class="form-label">Email address</label>
      <input type="email" v-model="user.email" class="form-control col-md-8" id="exampleInputEmail1" aria-describedby="emailHelp">
    </div>
  <div class="row">
    <div class="col-md-3"></div>
    <div class="col-md-8">
      <p v-if="'email'in errors">
        {{errors["email"][0]}}
      </p>
    </div>
  </div>

  <div class="form-group">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input type="password" v-model="user.password" class="form-control col-md-8" id="exampleInputPassword1">
  </div>

  <div class="row">
    <div class="col-md-3"></div>
    <div class="col-md-8">
      <p v-if="'password'in errors">
        {{errors["password"][0]}}
      </p>
    </div>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1" class="form-label col-md-3">Confirm Password</label>
    <input type="password" v-model="user.c_password" class="form-control col-md-8" id="">
  </div>

  <div class="row">
    <div class="col-md-3"></div>
    <div class="col-md-8">
      <p v-if="'c_password'in errors">
        {{errors["c_password"][0]}}
      </p>
    </div>
  </div>


  <div class="form-group">
    <label for="exampleInputEmail1" class="form-label col-md-3">Room</label>
    <select v-model="user.room_id" class="form-select form-select-lg mb-3 form-control col-md-8" aria-label=".form-select-lg example">
      <option selected>Open this select menu</option>
      <option v-for="room in rooms"   v-bind:value="room.id" :key="room.id">{{ room.number }}</option>
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

  <div class="form-group">
    <label for="name" class="form-label col-md-3">Ext</label>
    <input type="text"  v-model="user.ext" class="form-control col-md-8" id="ext">
  </div>
  <div class="row">
    <div class="col-md-3"></div>
    <div class="col-md-8">
      <p v-if="'ext'in errors">
        {{errors["ext"][0]}}
      </p>
    </div>
  </div>
  <div class="form-group">
  <label for="name" class="form-label col-md-3">Profile pic</label>
  <input type="file" class="form-control col-md-8" v-on:change="onFileChange">
  </div>

  <button type="submit" class="btn btn-primary" @click="register">Add User </button>
  </div>
   
<!--  </form>-->
</template>

<script>
import axios from 'axios';

export default {
  name: 'Register',
  data(){
    return{
      photo:"",
      rooms:[],
     user:{
       name:"",
       email:'',
       password:'',
       c_password:'',
       room_id:'',
       ext:''
     },
      errors:{}
    }
  },
  components:{
  },
  methods:{
    onFileChange(e){
      this.photo = e.target.files[0];
    },
    register() {
      let formData = new FormData()
      formData.append('photo', this.photo)
      for (const [key, value] of Object.entries(this.user)) {
          formData.append(key, value)
      }
      axios.post('http://127.0.0.1:8000/api/register', formData, {
            headers: {
              'Content-Type': "multipart/form-data; charset=utf-8; boundary=" + Math.random().toString().substr(2)
            }
          }
      )
            .then(response=>{
              let data = response.data
            if (data.status === "Error")
            {
              this.errors = data.message;
            }
            else {
              this.$router.push('admin')
             this.$emit("submitAddUserClicked", "AdminListUsers") ; 
     
            }

            })




        // axios({
        //   method: 'post',
        //   url: 'http://127.0.0.1:8000/api/register',
        //   data: data,
        // })
    }
    },
  created() {
    fetch('http://127.0.0.1:8000/api/room')
        .then(response => response.json())
        .then(json => {this.rooms=json.data
        })
  }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
