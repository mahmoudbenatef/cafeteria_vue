<template>
  <div>
    <div class="container">
      <form class="form-inline mb-3" @submit.prevent="filterDate">
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
      <div class="border mb-3" v-for="order in orders['data']" :key="order.id">
        <table
          class="table table-striped table-active table-bordered mb-5 text-center"
        >
          <thead>
            <tr>
              <th>Order Date</th>
              <th>Status</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-dark text-light">
              <td>{{ order.created_at }}</td>
              <td>{{ order.status }}</td>
              <td>{{ order.price }}</td>
              <td>
                <button
                  @click="toggleClass($event)"
                  class="btn btn-success more"
                >
                  +
                </button>
                <button
                  v-if="order.status === 'running'"
                  class="btn text-light btn-link"
                  @click="updateOrder(order)"
                >
                  Cancel
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div style="display: none" class="row">
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
      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
          <li
            v-for="page in orders['links']"
            :key="page.label"
            :class="[
              'page-item',
              page.active ? 'active' : '',
              page.url == null ? 'disabled' : '',
            ]"
          >
            <a
              class="page-link"
              @click.prevent="getMyOrders(page.url.split('=')[1])"
            >
              <span aria-hidden="true">
                {{
                  page.label.split(" ")[1] == "Previous"
                    ? page.label.split(" ")[1]
                    : page.label.split(" ")[0]
                }}
              </span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
var $ = require("jquery");
import services from "../services/user";
export default {
  data: () => ({
    orders: {},
    date: {
      from: null,
      to: null,
    },
  }),
  methods: {
    async getMyOrders(page) {
      const response = await services.getMyOrders(page);
      this.orders = response["data"]["data"];
    },
    async filterDate() {
      const fullDate = `?from=${this.date.from}&to=${this.date.to}`;
      const response = await services
        .getMyFilteredOrders(fullDate)
        .then((res) => res.json());
      this.orders = response["data"];
    },
    async updateOrder(order) {
      order.status = "canceled";
      const response = await services.updateOrder(order.id, order);
      console.log(response);
    },
    toggleClass(event) {
      $(event.target)
        .parent()
        .parent()
        .parent()
        .parent()
        .siblings("div")
        .fadeToggle();
      $(event.target).toggleClass("btn-success btn-danger more less");
      $(".more").text("+");
      $(".less").text("-");
    },
  },
  created() {
    this.getMyOrders();
  },
  mounted() {},
};
</script>
