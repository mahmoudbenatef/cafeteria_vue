<template>
  <div>
    <div class="container">
      <div class="border mb-3" v-for="order in currentOrders" :key="order.id">
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
            <tr class="bg-dark text-light">
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
          <div
            class="col text-center"
            v-for="product in order.products"
            :key="product.id"
          >
            <img
              :src="product.photo"
              alt="product image"
              class="img-fluid"
              style="height: 100px"
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
  </div>
</template>


<script>
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
      const selectedOrder = JSON.stringify(order);
      fetch(`http://127.0.0.1:8000/api/order/${order.id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${this.accessToken}`,
        },
      }).then((data) => {
        if (data.status === "Error") {
        } else {
          for (let i = 0; i < this.currentOrders.length; i++) {
            if (order.id === this.currentOrders[i].id) {
              this.currentOrders.splice(i, 1);
              break;
            }
          }
        }
      });
    },
    getAccessToken() {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user !== null) this.accessToken = user["token"];
    },
  },

  created() {
    this.getAccessToken();
    fetch("http://127.0.0.1:8000/api/order", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${this.accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        this.currentOrders = json.data;
      });
  },
};
</script>


<style scoped>
</style>