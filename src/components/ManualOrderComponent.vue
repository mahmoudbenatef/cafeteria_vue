<template>

<!--<h1>Hello Manual Order</h1>-->
<!--  <div class="container">-->
    <div class="row">
    <div class="col-md-6">
      <OrderComponent v-bind:products="products"></OrderComponent>
    </div>
    <div class="col-md-6">
    <div>Users</div>
      <div class="row">
        <ProductForOrderComponent @addProduct="addProduct"></ProductForOrderComponent>
      </div>
    </div>
    </div>
<!--  </div>-->
</template>

<script>
import ProductForOrderComponent from "@/components/ProductForOrderComponent";
import OrderComponent from "@/components/OrderComponent";
export default {
  name: 'HelloWorld',
  data(){
    return {
      products:[]
    }
  },
  methods:{
    addProduct(product){
      console.log("get product from parent component")
      console.log(product)
      if (!(this.products.find((productArr)=> productArr.id === product.id)))
      {
        product.quantity=1
        this.products.push(product)
      }

    }
  },
  props: {

  },components:{
    ProductForOrderComponent,
    OrderComponent
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
