<template>
  <div>
    <div class="border" v-for="order in currentOrders" :key="order.id">
      <table class="table table table-striped table-active table-bordered">
        <thead>
          <tr>
            <th>Order Date</th>
            <th>Name</th>
            <th>Room</th>
            <th>Ext.</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ order.created_at }}</td>
            <td>{{ order.user }}</td>
            <td>{{ order.room }}</td>
            <td>{{ order.ext }}</td>
            <td>
              <a href="#" @click.prevent="updateStatus(order)">deliver</a>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="row">
        <div class="col" v-for="product in order.products" :key="product.id">
          <img
            :src="product.photo"
            alt="product image"
            class="img-fluid"
            style="max-height: 100px"
          />
          <h3>{{ product.name }}</h3>
          <h4>{{ product.quantity }}</h4>
        </div>
      </div>
      <div class="d-flex flex-row-reverse mr-5">
        <p>Total: {{ order.price }}</p>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
  data() {
    return {
      currentOrders: [],
      accessToken: "",
    };
  },
  methods: {
    updateStatus(order) {
      let formData = new FormData();
      axios
        .put(
          `http://127.0.0.1:8000/api/order/${order}`,
          {},
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${this.accessToken}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
          if (response.data.status == "success") {
            for (let i = 0; i < this.currentOrders.length; i++) {
              if (order.id === this.currentOrders[i]) {
                this.currentOrders.splice(i, 1);
              }
            }
          } else {
            console.log("could not update the order status");
          }
        });
    },
    getAccessToken() {
      this.accessToken = localStorage.getItem("user")["token"];
    },
  },

  created() {
    this.getAccessToken();

    fetch("http://127.0.0.1:8000/api/order")
      .then((response) => response.json())
      .then((json) => {
        this.currentOrders = json.data;
        console.log(this.currentOrders);
      });
  },
};
</script>


<style scoped>
</style>