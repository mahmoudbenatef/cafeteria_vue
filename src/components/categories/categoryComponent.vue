<template>
  <AddCategoryComponent
    v-bind:errors="addCategoryErrors"
    v-bind:category="category"
    @addCategory="addCategory"
  ></AddCategoryComponent>
  <table class="table table-borderd">
    <thead>
      <tr>
        <th>category name</th>
        <th colspan="1">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="category in categories.data" :key="category.id">
        <td>{{ category.name }}</td>
        <td>
          <button class="btn btn-link" @click="deleteCategory(category.id)">
            delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li
        v-for="page in categories['links']"
        :key="page.label"
        :class="[
          'page-item',
          page.active ? 'active' : '',
          page.url == null ? 'disabled' : '',
        ]"
      >
        <a
          class="page-link"
          @click.prevent="getAllCategories(page.url.split('=')[1])"
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
import services from "../services/category.js";
import AddCategoryComponent from "@/components/categories/AddCategoryComponent";
// import EditRoomComponent from "@/components/rooms/EditRoomComponent";
import categoryServices from "@/components/services/category";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      categories: {},
      category: "",
      addCategoryErrors: [],
    };
  },
  methods: {
    getAllCategories(page) {
      categoryServices.getAllCategories(page).then((json) => {
        console.log(json.data.data);
        this.categories = json.data.data;
        console.log(this.categories.data);
      });
    },
    async addCategory(category) {
      this.addCategoryErrors = [];
      services
        .createCategory(category)
        .then((json) => {
          if (json.data.status == "success") {
            this.getAllCategories();
          } else {
            console.log("howwwwwwwwwwww");
          }
        })
        .catch((err) => {
          this.addCategoryErrors = err.response.data.message;
        });
    },
    async deleteCategory(id) {
      const res = await services.deleteCategory(id);
      if (res.data.status == "success") {
        this.getAllCategories();
      }
    },
  },
  created() {
    this.getAllCategories();
  },
  components: {
    // EditRoomComponent,
    AddCategoryComponent,
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* h3 {
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
} */
</style>
