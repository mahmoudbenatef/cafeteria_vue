<template>
  <template>{{ checkUser() }}</template>
  <NavbarComponent :user="user.isAdmin"></NavbarComponent>
  <div class="mt-5">
        <template>{{checkAuth()}}</template>
    <router-view class="col-12"> </router-view>
  </div>
</template>
<script>
import NavbarComponent from "@/components/NavbarComponent";
export default {
  name: "About",
  data() {
    return {
      auth: false,
      user: {
        isAdmin: -1,
      },
    };
  },
  components: {
    NavbarComponent,
  },
  methods: {
    checkAuth() {
      // console.log(this.$router.currentRoute["value"]["path"]);
      // if((this.$router.currentRoute["value"]["path"] == "/authorize/github/callback")){
        
      //   console.log("ssss");
      // }
      // else if (
      //   typeof localStorage.getItem("user") == "undefined" ||
      //   localStorage.getItem("user") === "" ||
      //   localStorage.getItem("user") === null
      // ) {
      
      //   this.auth = false;
        
        
      //   if (!(this.$router.currentRoute["value"]["path"] == "/register")
      //   )
      //     this.$router.push("login");
      // } else if (
      //   this.$router.currentRoute["value"]["path"] === "/register" ||
      //   this.$router.currentRoute["value"]["path"] === "/login"
      // ) {
      //   this.$router.push("/");
      // } else {
      //   this.auth = true;
      // }
    },
    checkUser() {
      if (localStorage.getItem("user") !== null)
        this.user = JSON.parse(localStorage.getItem("user"));
      else
        this.user=-1
    },
  },
  computed: {
    currentRouteName() {
      console.log(this.$route.name);
      return this.$route.name;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.alex {
  color: red;
  font-weight: bold;
  font-size: 20px;
}

.smart {
  color: blue;
  font-weight: bold;
  font-size: 20px;
}

.mansoura {
  color: green;
  font-weight: bold;
  font-size: 20px;
}
</style>
