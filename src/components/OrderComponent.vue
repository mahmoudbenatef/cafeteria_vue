<template>
  <template>{{calcTotalPrice()}}</template>
  <table class="table">
<tbody v-if="products.length>0">
    <tr v-for="product in products">
      <td>{{product.name}}</td>
      <td> <input type="number"  disabled v-bind:value="product.quantity"></td>
      <td><span @click="increaseQuantity(product)" class="btn btn-primary">+</span> <span @click="decreaseQuantity(product)" class="btn btn-danger">-</span></td>
      <td>{{product.price* product.quantity}}</td>
    </tr>
</tbody>

  </table>
  <div class="mb-3 row">
    <label for="" class="form-label col-md-3">Room</label>
    <select  v-model="room" class="form-select form-select-lg mb-3 form-control col-md-8" aria-label=".form-select-lg example">
      <option selected>Open this select menu</option>
      <option v-for="room in rooms"   v-bind:value="room.id">{{ room.number }}</option>
    </select>
  </div>
  <div class="mb-3 row">
    <label  class="form-label col-md-3">Notes</label>
    <textarea class="form-control col-md-8" v-model="notes"></textarea>
  </div>

  <div class="mb-3 row">
    <div class="col-md-4"></div>
<button class="btn btn-primary col-md-4" @click="confirmOrder">Confirm</button>
  </div>

  <h1>{{totalPrice}}</h1>
</template>
<script>
import axios from "axios";

export default {
  name: 'HelloWorld',
  data() {
    return {
      rooms: [],
      totalPrice: 0,
      room:"",
      notes:"",
      accessToken:"",
    }
  },
  props: {
    products: Array
  },
  methods: {
    calcTotalPrice(){

    this.totalPrice=  this.products.reduce((accumulator, product, currentIndex, array) => {
        return accumulator + product.price* product.quantity
      }, 0)

    },
    confirmOrder(){
      console.log("hello world ")
      let formData = new FormData()
      formData.append("products",JSON.stringify(this.products))
      formData.append("room",this.room)
      formData.append("notes",this.notes)
      formData.append("price",this.totalPrice)
      console.log(formData  )
      axios.post('http://127.0.0.1:8000/api/order', formData, {
            headers: {
              'Accept':"application/json",
              'Authorization': `Bearer ${this.accessToken}`,
            }
          }
      )
          .then(response=>{
            console.log(response)
            if (response.data.status == "done")
            {
                this.$router.push('login')
            }
            else
            {
              console.log("howwwwwwwwwwww")
            }

            // let data = response.data
            // console.log("here")
            // if (data.status === "Error")
            // {
            //   this.errors = data.message;
            // }
            // else {
            //
            //   // this.$router.push('login')
            // }

          })

    },
    increaseQuantity(product) {
      product.quantity += 1
    },
    decreaseQuantity(product) {
      if (product.quantity === 1) {
        this.products.splice(this.products.find((productArr) => productArr.id === product.id), 1)
      } else {
        product.quantity -= 1
      }
    },
    getAccessToken (){
      this.accessToken = localStorage.getItem("user")["token"]
    }

  },
  created() {
    this.getAccessToken()

    fetch('http://127.0.0.1:8000/api/room')
        .then(response => response.json())
        .then(json => {
          this.rooms = json.data
          console.log(this.rooms)
        })
  },

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
