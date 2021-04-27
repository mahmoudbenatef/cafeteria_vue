<template @submit.prevent>
  <!--  <form class="mt-5">-->
  <div class="container ">
    <div class="row content">

<div class="login  col-md-6 align-self-center ">
<div class="form">

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
      <p v-if="'email' in errors" class="errors">
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
      <p v-if="'password' in errors" class="errors">
        {{ errors["password"][0] }}
      </p>
    </div>
  </div>
  <div class="row">
    <div class="col-md-3"></div>
    <div class="col-md-8">
      <p v-if="'invalid_credentials' in errors" class="errors">
        {{ errors["invalid_credentials"] }}
      </p>
    </div>
  </div>
  <div class="row">
    <div class="col-md-3"></div>
    <div class="col-md-8">
      <div class="row">
        <div class="col-md-3">
          <button type="submit" class="btn btn-dark  btn-lg button " @click="login">Login  </button>
        </div>

        <div class="col-md-3">
          <router-link to="register" class="btn btn-dark  btn-lg button ">Register</router-link>
        </div>
        <div class="col-md-3">
          <a class="btn btn-dark  btn-lg button " @click="githubLogin"> github</a>

        </div>
        <div class="col-md-3">
          <a class="btn btn-dark  btn-lg button " @click="googleLogin"> google</a>
        </div>

      </div>
    </div>

  </div>
  </div>
  </div>
  </div>
  </div>

  <!--  </form>-->
</template>

<script>
import userAuth from "@/components/services/userAuth";
export default {
  name: "Register",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      errors: [],
    };
  },
  components: {},
  methods: {
    async login() {
      try {
        const res = await userAuth.login(JSON.stringify(this.user));
        localStorage.setItem("user", JSON.stringify(res.data["user"]));
        this.$router.push("/home");
      } catch (error) {
        if (error.response) {
          this.errors = error.response.data.message;

          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
        }
      }
    },
    githubLogin() {
      fetch("http://localhost:8000/api/authorize/github/redirect")
        .then((response) => response.json())
        .then((data) => {
          if (data.url) {
            window.location.href = data.url;
          }
        });
    },
    googleLogin() {
      fetch("http://localhost:8000/api/authorize/google/redirect")
        .then((response) => response.json())
        .then((data) => {
          if (data.url) {
            window.location.href = data.url;
          }
        });
    },
    facebookLogin() {
      fetch("http://localhost:8000/api/authorize/facebook/redirect")
        .then((response) => response.json())
        .then((data) => {
          if (data.url) {
            window.location.href = data.url;
          }
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content{
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
}
.login{
display: flex;
  flex-direction: column;
  /*justify-items: spa;*/
  justify-content: center;
  background: #faebd7;
  border-radius: 30px;
}
</style>
