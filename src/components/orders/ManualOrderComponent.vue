<template>

<!--<h1>Hello Manual Order</h1>-->
<!--  <div class="container">-->
    <div class="row">
    <div class="col-md-6">
      <OrderComponent v-bind:products="products" v-bind:user_id="user_id"></OrderComponent>
    </div>
    <div class="col-md-6">
      <div class="row">
        <UsersForOrderComponent @selectUser="selectUser"></UsersForOrderComponent>
      </div>

      <div class="row">
        <ProductForOrderComponent @addProduct="addProduct"></ProductForOrderComponent>
      </div>
    </div>
    </div>
<!--  </div>-->
</template>

<script>
import ProductForOrderComponent from "@/components/orders/ProductForOrderComponent";
import OrderComponent from "@/components/orders/OrderComponent";
import UsersForOrderComponent from "@/components/orders/UsersForOrderComponent";
export default {
  name: 'HelloWorld',
  data(){
    return {
      products:[],
      user_id:-1,
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

    },
    selectUser(user_id){
      this.user_id= user_id
    }
  },
  props: {

  },components:{
    ProductForOrderComponent,
    OrderComponent,
    UsersForOrderComponent
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
