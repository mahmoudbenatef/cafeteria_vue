<template>
  <form class="form-inline" @submit.prevent="filterDate">
    <div class="form-group m-1">
      <label for="">From</label>
      <input
        v-model="date.from"
        class="form-control"
        type="date"
        name="date_from"
      />
    </div>
    <div class="form-group m-1">
      <label for="">To</label>
      <input
        v-model="date.to"
        class="form-control"
        type="date"
        name="date_to"
      />
    </div>
    <input type="submit" class="btn btn-success mx-1" />
    <input type="reset" class="btn btn-info mx-1" @click="getMyOrders" />
  </form>
  <table class="table table-borderd">
    <thead>
      <tr>
        <th>Order Date</th>
        <th>Status</th>
        <th>Amount</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="order in orders" :key="order.id">
        <td>{{ order.created_at }}</td>
        <td>{{ order.status }}</td>
        <td>{{ order.price }}</td>
        <td>
          <!-- <button class="btn btn-link" @click="updateProduct(product)">
            {{ product.isAvailable ? "available" : "unavailable" }}
          </button> -->
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import services from "../services/user";
export default {
  data: () => ({
    orders: null,
    date: {
      from: null,
      to: null,
    },
  }),
  methods: {
    async getMyOrders() {
      const response = await services.getMyOrders();
      this.orders = response["data"]["data"];
    },
    async filterDate() {
      let fullDate = "?";
      Object.entries(this.date).forEach(([key, value]) => {
        fullDate += `${key}=${value}&`;
      });
      const response = await services
        .getMyFilteredOrders(fullDate)
        .then((res) => res.json());
      this.orders = response["data"];
    },
  },
  created() {
    this.getMyOrders();
  },
};
</script>
