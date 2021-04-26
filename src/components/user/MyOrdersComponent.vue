<template>
  <!-- <DataTable :value="orders.data">
    <Column field="created_at" header="Order Date"></Column>
    <Column field="status" header="Status"></Column>
    <Column field="price" header="Amount"></Column>
  </DataTable> -->
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
      <tr v-for="order in orders['data']" :key="order.id">
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
</template>

<script>
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
 mounted(){
	 
 }
};
</script>
