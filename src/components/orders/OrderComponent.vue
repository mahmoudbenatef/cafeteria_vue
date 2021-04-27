<template>
  <template>{{ calcTotalPrice() }}</template>
  <table class="table">
    <p v-if="'products' in errors" class="errors">
      {{ errors["products"][0] }}
    </p>
    <tbody v-if="products.length > 0">
      <tr v-for="product in products" :key="product.id">
        <td>{{ product.name }}</td>
        <td>
          <input type="number" disabled v-bind:value="product.quantity" />
        </td>
        <td>
          <span @click="increaseQuantity(product)" class="btn btn-primary"
            >+</span
          >
          <span @click="decreaseQuantity(product)" class="btn btn-danger"
            >-</span
          >
        </td>
        <td>{{ product.price * product.quantity + " $" }}</td>
      </tr>
    </tbody>
  </table>
  <div class="mb-3 row">
    <label for="" class="form-label col-md-3">Room</label>
    <select
      v-model="room"
      class="form-select form-select-lg mb-3 form-control col-md-8"
      aria-label=".form-select-lg example"
    >
      <option selected v-bind:value="''">Open this select menu</option>
      <option v-for="room in rooms" :key="room.id" v-bind:value="room.id">
        {{ room.number }}
      </option>
    </select>
  </div>

  <p v-if="'room' in errors" class="errors">
    {{ errors["room"][0] }}
  </p>
  <div class="mb-3 row">
    <label class="form-label col-md-3">Notes</label>
    <textarea class="form-control col-md-8" v-model="notes"></textarea>
  </div>

  <div class="row justify-content-between">
    <col-4></col-4>
    <div class="col-4 align-self-end" v-if="totalPrice > 0">
      <span>Total Price:</span>{{ " " + totalPrice + " $" }}
    </div>
  </div>

  <div class="mb-3 row">
    <div class="col-md-4"></div>
    <button class="btn btn-primary col-md-4" @click="confirmOrder">
      Confirm
    </button>
  </div>
</template>
<script>
import axios from "axios";
import Order from "../services/order"
import roomServices from "@/components/services/rooms";
export default {
  name: "HelloWorld",
  data() {
    return {
      errors: [],
      rooms: [],
      totalPrice: 0,
      room: "",
      notes: "",
      // accessToken: "",
    };
  },
  props: {
    products: Array,
    user_id: String,
  },
  methods: {
    calcTotalPrice() {
      this.totalPrice = this.products.reduce(
        (accumulator, product, currentIndex, array) => {
          return accumulator + product.price * product.quantity;
        },
        0
      );
    },
    confirmOrder() {
      this.errors = [];
      let formData = new FormData();
      formData.append("products", JSON.stringify(this.products));
      formData.append("room", this.room);
      formData.append("notes", this.notes);
      formData.append("price", this.totalPrice);
      formData.append("user_id", this.user_id);

      Order.createOrder(formData)
        .then((response) => {
          if (response.data.status == "done") {
            this.$router.push("login");
          } 
        })
        .catch((err) => {
          this.errors = err.response.data.message;
        });
    },
    increaseQuantity(product) {
      product.quantity += 1;
    },
    decreaseQuantity(product) {
      if (product.quantity === 1) {
        this.products.splice(
          this.products.find((productArr) => productArr.id === product.id),
          1
        );
      } else {
        product.quantity -= 1;
      }
    },

  },
  async created() {
    roomServices.getAllRooms()
        .then((json) => {
          this.rooms = json.data.data;
        });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
