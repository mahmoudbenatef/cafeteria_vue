<template>
  <div class="card m-3"  style="width: 10rem;" v-for="product in products" :key="product.id" @click="addProduct(product)">
    <img :src='product.photo' style="height: 5rem;" class="card-img-top" alt="">
<div class="row">
      <span class="col">{{product.name}}</span>
      <span class="col">{{product.price+" "}}$</span>
</div>
  </div>
</template>
<script>
import userServices from "../services/user"
import productServices from "../services/products"
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
      this.$emit("addProduct",product)
    },
  },
  props: {
    msg: String
  },
  created() {
    userServices.getUsers()
        .then((res) => {
          this.users= res.data.data
        })
        .catch((error) => {
          console.error(error)
        })



    productServices.listAllProducts()
        .then((res) => {
          this.products= res.data.data
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
