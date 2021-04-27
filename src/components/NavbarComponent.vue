
<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light " v-if="user===1">
    <div class="container-fluid">
      <div class="row justify-content-between w-100">
        <div style="flex-basis: 60%" class="d-flex left">
      <div class="collapse navbar-collapse" id="">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class=" nav-link active" aria-current="page" to="/manualOrder">Manual Order</router-link>
          </li>
          <li class="nav-item">
            <router-link class=" nav-link active" aria-current="page" to="/room">Rooms</router-link>
          </li>
          <li class="nav-item">
            <router-link class=" nav-link active" aria-current="page" to="/home">Users</router-link>
          </li>

          <li class="nav-item">
            <router-link class=" nav-link active" aria-current="page" to="/products">Products</router-link>
          </li>
          <li class="nav-item">
            <router-link class=" nav-link active" aria-current="page" to="/checks">Checks</router-link>
          </li>
          <li class="nav-item">
            <router-link class=" nav-link active" aria-current="page" to="/orders">Orders</router-link>
          </li>
        </ul>
      </div>
    </div>

        <div style="align-self: flex-end" class="d-flex ">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">          {{photo['name']}} (Admin)</a>
            </li>
            <img class="photo" :src="photo['photo'] " :alt="photo['name']" >
            <button style= " border-radius:5px; margin-left: 10px" class="nav-link active" aria-current="page" @click="Logout" >Logout</button>
          </ul>
        </div>



      </div>
    </div>
  </nav>

  <nav class="navbar navbar-expand-lg navbar-light bg-light" v-if="user===0">
    <div class="container-fluid">
      <div class="row justify-content-between w-100">
        <div style="flex-basis: 60%" class="d-flex left">
          <div class="collapse navbar-collapse" >
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <router-link class=" nav-link active" aria-current="page" to="/manualOrder"> Order</router-link>
              </li>
              <li class="nav-item">
                <router-link class=" nav-link active" aria-current="page" to="/my-orders">My orders</router-link>
              </li>
            </ul>
          </div>
        </div>
        <div style="align-self: flex-end" class="d-flex ">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">{{photo['name']}}</a>
            </li>
            <img class="photo" :src="photo['photo'] " :alt="photo['name']" >
            <button style= " border-radius:5px; margin-left: 10px" class="nav-link active" aria-current="page" @click="Logout" >Logout</button>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  name: 'HelloWorld',
  props: {
    user: String,
  },methods:{
    Logout(){
      localStorage.removeItem("user")
      this.$router.push("/login");

    },

  },
  data(){
    return{
      photo: String
    }
  },
  created(){
    if (localStorage.getItem("user"))
    console.log(this.photo=JSON.parse(localStorage.getItem("user")))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.left{
  flex-basis: 60%;
}
.photo{
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>
