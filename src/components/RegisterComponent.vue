<template @submit.prevent>
<!--  <form class="mt-5">-->
  <h1>Register</h1>
  <br>
    <div class="mb-3 row">
      <label for="name" class="form-label col-md-3">Name</label>
      <input type="text"  v-model="user.name" class="form-control col-md-8" id="name">
    </div>
  <div class="row">
    <div class="col-md-3"></div>
    <div class="col-md-8">
      <p v-if="'name'in errors">
        {{errors["name"][0]}}
      </p>
    </div>
  </div>
    <div class="mb-3 row">
      <label for="exampleInputEmail1" class="form-label col-md-3">Email address</label>
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

  <div class="mb-3 row">
      <label for="exampleInputPassword1" class="form-label col-md-3">Password</label>
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
  <div class="mb-3 row">
    <label for="exampleInputPassword1" class="form-label col-md-3">Password</label>
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

    <button type="submit" class="btn btn-primary" @click="register">Submit</button>
<!--  </form>-->
</template>

<script>
export default {
  name: 'Register',
  data(){
    return{
     user:{
       name:"",
       email:'',
       password:'',
       c_password:'',
       photo:"test.png"
     },
      errors:{}
    }
  },
  components:{

  },
  methods:{
    register(){
      // this.errors={}
      fetch('http://127.0.0.1:8001/api/register',{
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.user)
      }).then((response)=>response.json())
          .then(data=>{
            console.log("here")
          if (data.status === "Error")
          {
            this.errors = data.message;
          }
          else {
            this.$router.push('login')

          }

          })

    }
  }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
