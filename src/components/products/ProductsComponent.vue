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
      <tr v-for="product in products" :key="product.id">
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
</template>

<script>
import services from "../services/products";
import addProduct from "./AddProductComponent";
export default {
  data: () => ({
    products: null,
  }),
  oldProduct: {
    name: null,
    price: null,
  },
  methods: {
    async getAllProudct() {
      const res = await services.getAllProudct();
      const data = await res.json();
      this.products = data["data"];
    },
    updateProduct(product) {
      product.isAvailable = product.isAvailable ? false : true;
      services.updateProudct(product.id, { isAvailable: product.isAvailable });
    },
    async deleteProduct(id) {
      console.log(id);
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
