<template @submit.prevent>
  <!--  <form class="mt-5">-->
  <div class="mb-3 row">
    <label for="exampleInputEmail1" class="form-label col-md-3">Email address</label>
    <input type="email" v-model="user.email" class="form-control col-md-8" id="exampleInputEmail1"
           aria-describedby="emailHelp">
  </div>
  <div class="row">
    <div class="col-md-3"></div>
    <div class="col-md-8">
      <p v-if="'email'in errors" class="errors">
        {{ errors["email"][0] }}
      </p>
    </div>
  </div>


  <div class="mb-3 row">
    <label for="exampleInputPassword1" class="form-label col-md-3">Password</label>
    <input type="password" v-model="user.password" class="form-control col-md-8" id="exampleInputPassword1">
  </div>
  <div class="row">
    <div class="col-md-3"></div>
    <div class="col-md-8">
      <p v-if="'password'in errors" class="errors">
        {{ errors["password"][0] }}
      </p>
    </div>
  </div>
  <div class="row">
    <div class="col-md-3"></div>
    <div class="col-md-8">
      <p v-if="'invalid_credentials'in errors" class="errors">
        {{ errors["invalid_credentials"] }}
      </p>
    </div>
  </div>
  <button type="submit" class="btn btn-primary m-3" @click="login">Login</button>
  <router-link to="register" class="btn btn-primary">Register</router-link>

  <!--  </form>-->
</template>

<script>
import userAuth from "@/components/services/userAuth";
export default {
  name: 'Register',
  data() {
    return {
      user: {
        email: '',
        password: ''
      },
      errors: []
    }
  },
  components: {},
  methods: {
    async login() {
      try {
        const res = await  userAuth.login(JSON.stringify(this.user))
        console.log(res.data["user"])
          localStorage.setItem("user", JSON.stringify(res.data["user"]))
        this.$router.push('/')
      } catch (error) {

        if (error.response) {
          this.errors = error.response.data.message

          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
        }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
