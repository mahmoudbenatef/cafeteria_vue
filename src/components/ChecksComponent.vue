<template>
  <h2>Checks</h2>

  <div class="container">
    <label for="" class="form-label">Users</label>
    <select
      v-model="selected_user"
      @change="filterData()"
      class="form-select form-select-lg mb-3 form-control col-md-8"
      aria-label=".form-select-lg example"
    >
      <option v-for="user in users" v-bind:value="user" :key="user.id">
        {{ user.name }}
      </option>
    </select>

    <form class="form-inline" @submit.prevent="filterData()">
      <div class="form-group m-3">
        <label for="" class="mr-2">From</label>
        <input
          v-model="date.from"
          class="form-control"
          type="date"
          name="date_from"
        />
      </div>
      <div class="form-group m-1">
        <label for="" class="mr-2">To</label>
        <input
          v-model="date.to"
          class="form-control"
          type="date"
          name="date_to"
        />
      </div>
      <input type="submit" class="btn btn-success mx-1" />
      <input type="reset" class="btn btn-info mx-1" @click="resetChecks" />
    </form>
    <div class="text-center mt-4">
      <table class="table table-striped table-active table-bordered mb-5">
        <thead>
          <tr>
            <th>Name</th>
            <th>Total amount</th>
          </tr>
        </thead>
        <tbody v-for="check in checks" :key="check.id">
          <template v-if="check.orders.length > 0">
            <tr class="bg-dark text-light">
              <td>{{ check.name }}</td>
              <td>{{ currencyFormatter(check.totalAmount) }}</td>
              <td>
                <button
                  @click="toggleClass($event)"
                  class="btn btn-success more"
                >
                  +
                </button>
              </td>
            </tr>
            <tr class="" style="display: none">
              <table
                class="table table-striped table-active table-bordered"
                style="margin-left: 6rem; margin-right: 6rem"
              >
                <thead>
                  <tr>
                    <th>Order Date</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody v-for="order in check.orders" :key="order.id">
                  <template v-if="order.products">
                    <tr>
                      <td>
                        {{ order.created_at }}
                      </td>
                      <td>{{ currencyFormatter(order.price) }}</td>
                      <td>
                        <button
                          @click="toggleClass($event)"
                          class="btn btn-success more"
                        >
                          +
                        </button>
                      </td>
                    </tr>
                    <tr style="display: none">
                      <div
                        class="row"
                        style="margin-left: 10rem; margin-right: 5rem"
                      >
                        <div
                          class="col"
                          v-for="product in order.products"
                          :key="product.id"
                        >
                          <img
                            :src="product.photo"
                            alt="product image"
                            class="img-fluid"
                            style="height: 50px"
                          />
                          <h5>{{ product.name }}</h5>
                          <h6>{{ currencyFormatter(product.price) }}</h6>
                          <h6>{{ product.pivot.quantity }}</h6>
                        </div>
                      </div>
                    </tr>
                  </template>
                </tbody>
              </table>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
var $ = require("jquery");

export default {
  data() {
    return {
      checks: [],
      users: [],
      selected_user: null,
      date: {
        from: null,
        to: null,
      },
      accessToken: "",
    };
  },
  methods: {
    getAllChecks() {
      fetch("http://127.0.0.1:8000/api/checks", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${this.accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          this.users = json.data.users;
          this.checks = json.data.checks;
        });
    },

    filterData() {
      let url = `http://127.0.0.1:8000/api/checks`;
      if (this.date.from !== null && this.date.to !== null) {
        url = url + `?from=${this.date.from}&to=${this.date.to}`;
      }
      if (this.selected_user !== null) {
        if (this.date.from !== null && this.date.to !== null) {
          url = url + `&user_id=${this.selected_user.id}`;
        } else {
          url = url + `?user_id=${this.selected_user.id}`;
        }
      }
      fetch(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${this.accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          this.users = json.data.users;
          this.checks = json.data.checks;
        });
    },

    resetChecks() {
      this.date.from = null;
      this.date.to = null;
      this.getAllChecks();
    },
    getAccessToken() {
      const user = JSON.parse(localStorage.getItem("user"));
      this.accessToken = user["token"];
    },
    toggleClass(event) {
      $(event.target).parent().parent().siblings("tr").fadeToggle();
      $(event.target).toggleClass("btn-success btn-danger more less");
      $(".more").text("+");
      $(".less").text("-");
    },
  },

  computed: {
    currencyFormatter() {
      let formatter = Intl.NumberFormat("en-EG", {
        style: "currency",
        currency: "EGP",
        minimumFractionDigits: 0,
      });
      return (value) => formatter.format(value);
    },
  },

  created() {
    this.getAccessToken();
    this.getAllChecks();
  },
};
</script>

<style scoped>
</style>
