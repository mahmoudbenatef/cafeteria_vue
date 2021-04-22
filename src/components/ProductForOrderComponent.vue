<template>
  <div class="card m-3"  style="width: 10rem;" v-for="product in products" @click="addProduct(product)">
    <img :src='product.photo' style="height: 5rem;" class="card-img-top" alt="">
<div class="row">
      <span class="col">{{product.name}}</span>
      <span class="col">{{product.price+" "}}$</span>
</div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: 'HelloWorld',
  data(){
    return {
    products:[],
    users:[],
      accessToken:""
    }
  },
  methods:{
    addProduct(product){
      console.log("adding product in child comp")
      console.log(product)
      this.$emit("addProduct",product)
    },
  getAccessToken (){
    console.log("getting token")
    this.accessToken = localStorage.getItem("user")["token"]
    console.log(this.accessToken = JSON.parse(localStorage.getItem("user"))["token"])
  }
  },
  props: {
    msg: String
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



    axios.get('http://127.0.0.1:8000/api/product', {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Accept':"application/json"
      }
    })
        .then((res) => {
          this.products= res.data.data
          console.log(this.products)
        })
        .catch((error) => {
          console.error(error)
        })
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
</style>
