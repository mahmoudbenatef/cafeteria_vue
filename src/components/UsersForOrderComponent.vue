<template>
    <label for="" class="form-label col-md-3">Users</label>
    <select v-model="user_id" @change="selectUser(user_id)" class="form-select form-select-lg mb-3 form-control col-md-8" aria-label=".form-select-lg example">
      <option selected>Open this select menu</option>
      <option v-for="user in users"   v-bind:value="user.id">{{ user.name }}</option>
    </select>

</template>
<script>
import axios from "axios";

export default {
  name: 'HelloWorld',
  data(){
    return {
    users:[],
      accessToken:"",
      user_id:-1,
    }
  },
  methods:{
    selectUser(user_id){
      this.$emit("selectUser",user_id)
    },
  getAccessToken (){
    console.log("getting token")
    this.accessToken = localStorage.getItem("user")["token"]
    console.log(this.accessToken = JSON.parse(localStorage.getItem("user"))["token"])
  }
  },
  props: {
  },
  created() {
    this.getAccessToken()
    axios.get('http://127.0.0.1:8000/api/user', {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Accept':"application/json"
      }
    })
        .then((res) => {
          this.users= res.data.data
        })
        .catch((error) => {
          console.error(error)
        })
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
