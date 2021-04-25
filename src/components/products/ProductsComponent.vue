<template>
  <addProduct @updateProducts="getAllProudct" />
  <table class="table table-borderd">
    <thead>
      <tr>
        <th>Proudct</th>
        <th>Price</th>
        <th>image</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products.data" :key="product.id">
        <td>{{ product.name }}</td>
        <td>{{ product.price }}</td>
        <td>
          <img style="width: 50px" :src="product.photo" alt="" />
        </td>
        <td>
          <button class="btn btn-link" @click="updateProduct(product)">
            {{ product.isAvailable ? "available" : "unavailable" }}
          </button>
          <router-link :to="'/product/' + product.id">
            <button class="btn btn-link">edit</button>
          </router-link>
          <button class="btn btn-link" @click="deleteProduct(product.id)">
            delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li
        v-for="page in products['links']"
        :key="page.label"
        :class="[
          'page-item',
          page.active ? 'active' : '',
          page.url == null ? 'disabled' : '',
        ]"
      >
        <a
          class="page-link"
          @click.prevent="getAllProudct(page.url.split('=')[1])"
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
import services from "../services/products";
import addProduct from "./AddProductComponent";
export default {
  data: () => ({
    products: {},
  }),
  oldProduct: {
    name: null,
    price: null,
  },
  methods: {
    async getAllProudct(page) {
      const res = await services.getAllProudct(page);
      const data = await res.json();
      this.products = data["data"];
    },
    updateProduct(product) {
      product.isAvailable = product.isAvailable ? 0 : 1;

      services.updateProudct(product.id, {
        isAvailable: String(product.isAvailable),
      });
    },
    async deleteProduct(id) {
      const res = await services.deleteProduct(id);
      if (res.data.status == "success") {
        this.getAllProudct();
      }
    },
  },
  created() {
    this.getAllProudct();
  },
  components: {
    addProduct,
  },
};
</script>
