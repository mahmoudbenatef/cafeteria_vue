
<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light " v-if="user===1">
    <div class="container-fluid">
      <div class="row justify-content-between w-100">
        <div class="d-flex left">
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
        </ul>
      </div>
    </div>
        <div class="d-flex ">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Admin</a>
            </li>
          </ul>
        </div>
        <div class="d-flex ">
    <img src="" class="photo" :src="photo">
        </div>
        <div class="d-flex ">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <button class="nav-link active" aria-current="page" @click="Logout" >Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>

  <nav class="navbar navbar-expand-lg navbar-light bg-light" v-if="user===0">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <div class="d-flex ">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <button class="nav-link active" aria-current="page" @click="Logout" >Logout</button>
            </li>
          </ul>
        </div>
          <li class="nav-item">
            <router-link class="navbar-brand" to="/userOrder">Order</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item dropdown">
            
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Dropdown
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
          </li>
        </ul>
        <form class="d-flex">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
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
      photo: JSON.stringify(localStorage.getItem("user"))["photo"]
    }
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
  border-radius: 35%;
}
</style>
