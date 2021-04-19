<template>
  <template>{{checkUser()}}</template>
  <NavbarComponent v-if="auth" :user="user.isAdmin" ></NavbarComponent>
<!--  <div class="col-md-4"><router-link to="/">Home</router-link></div>-->
<!--  <div class="col-md-4"><router-link to="login">Login</router-link></div>-->
<!--  <br>-->
<!--<div v-if="user.isAdmin==1">-->
<!--  <h1>Admin logged in</h1>-->
<!--</div>-->

<!--  <div v-if="user.isAdmin==0">-->
<!--    <h1>User logged in</h1>-->
<!--  </div>-->
  <div class="mt-5">
    <template>{{checkAuth()}}</template>
    <router-view class="col-12">

    </router-view>
  </div>

</template>

<script>
import NavbarComponent from "@/components/NavbarComponent";
export default {
  name: 'About',
  data(){
    return{
      auth:false,
      user:{
        isAdmin:-1
      }

    }
  },
  components:{
    NavbarComponent
  },
  methods:{
    checkAuth(){
      console.log("whaaaaaaaaaaaaaaaaat",typeof localStorage.getItem("user") )
      console.log(this.$router.currentRoute["value"]['path'])
      // console.log(["_rawValue"]); // path is /post
     if ( typeof  localStorage.getItem("user")== 'undefined' || localStorage.getItem("user")=== "" || localStorage.getItem("user")=== null )
     {
       console.log("unauthed")
       this.auth=false
       if (!(this.$router.currentRoute["value"]['path'] == "/register"))
       this.$router.push('login')
     }
     else if ((this.$router.currentRoute["value"]['path'] === "/register" || this.$router.currentRoute["value"]['path'] === "/login"))
     {
       console.log("noooooooooooooooooooo")
       this.$router.push('/')

     }
     else{
       console.log("sooooooooooooooooooo")

       this.auth=true
     }
    },
    checkUser(){
      if (localStorage.getItem("user") !==null)
        this.user= JSON.parse(localStorage.getItem("user"))
    }
  },
  computed: {
    currentRouteName() {
      console.log(this.$route.name)
      return this.$route.name;
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.alex{
  color: red ;
  font-weight: bold;
  font-size: 20px;
}

.smart{
  color: blue ;
  font-weight: bold;
  font-size: 20px;
}

.mansoura{
  color: green ;
  font-weight: bold;
  font-size: 20px;
}
</style>
