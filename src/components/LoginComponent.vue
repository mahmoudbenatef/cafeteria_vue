<template @submit.prevent>
<!--  <form class="mt-5">-->
    <div class="mb-3 row">
      <label for="exampleInputEmail1" class="form-label col-md-3">Email address</label>
      <input type="email" v-model="user.email" class="form-control col-md-8" id="exampleInputEmail1" aria-describedby="emailHelp">
    </div>

    <div class="mb-3 row">
      <label for="exampleInputPassword1" class="form-label col-md-3">Password</label>
      <input type="password" v-model="user.password" class="form-control col-md-8" id="exampleInputPassword1">
    </div>
  <div class="row">
    <div class="col-md-4"></div>
    <div class="col-md-4">
      <p v-if="errors != ''">
        {{errors}}
      </p>
    </div>
  </div>

  <button type="submit" class="btn btn-primary" @click="login">Submit</button>
<!--  </form>-->
</template>

<script>
export default {
  name: 'Register',
  data(){
    return{
      user:{
        email:'',
        password:''
      },
      errors:""
    }
  },
  components:{

  },
  methods:{
    login(){
      fetch('http://127.0.0.1:8001/api/login',{
        method:'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'

        },
        body: JSON.stringify(this.user)
      }).then((response)=>response.json())
          .then(data=>{
            console.log(data.message)
            if (data.message === "The given data was invalid.")
            {
              this.errors = data.message;
            }
            else{
              localStorage.setItem("user", JSON.stringify(data["user"]))
              this.$router.push('/')

            }
          })
    }
  }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
