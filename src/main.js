import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { createWebHistory, createRouter } from "vue-router";
import RegisterComponent from "@/components/Authentication/RegisterComponent";
import Container from "@/components/Container";
import Handler from "@/components/Handler";
import HelloWorld from "@/components/HelloWorld";
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import LoginComponent from "@/components/Authentication/LoginComponent";
import ProductsComponent from "@/components/products/ProductsComponent";
import EditProductComponent from "@/components/products/EditProductComponent";
import ManualOrderComponent from "@/components/orders/ManualOrderComponent";
import CurrentOrdersComponent from "@/components/CurrentOrdersComponent";
import MyOrdersComponent from "@/components/user/MyOrdersComponent";
import UserOrderComponent from "@/components/orders/UserOrderComponent";
import RoomComponent from "@/components/rooms/RoomComponent";

const user = localStorage.getItem("user");
const routes = [
  { path: "/", name: "/", component: HelloWorld },
  { path: "/register", name: "register", component: RegisterComponent },
  { path: "/login", name: "login", component: LoginComponent },
  { path: "/products", name: "products", component: ProductsComponent },
  {
    path: "/product/:id",
    name: "editproduct",
    component: EditProductComponent,
  },
  {
    path: "/room/:id",
    name: "editromm",
    component: EditProductComponent,
  },

  {
    path: "/my-orders",
    component: MyOrdersComponent,
  },
  { path: "/orders", component: CurrentOrdersComponent },

  {
    path: "/manualOrder",
    component: ManualOrderComponent,
    beforeEnter: (to, from) => {
      if (user)
        if (JSON.parse(user)["isAdmin"] == 1) return true;
        else return false;
    },
  },

  { path: "/userOrder", component: UserOrderComponent,},
  { path: "/room", component: RoomComponent,},
  { path: "/:catchAll(.*)", component: Handler },
];
const router = createRouter({ history: createWebHistory(), routes });

// router.beforeEach((to, from, next) => {
//   console.log("inside middleware");
//   if (user !== null) {
//     if (typeof JSON.parse(user)["token"] !== "undefined") {
//       console.log(JSON.parse(user)["token"]);
//       console.log("token existed");
//       if (to.name !== "register" && to.name !== "login") next();
//       else next({ name: "/" });
//     } else if (to.name !== "register" && to.name !== "login") {
//       console.log(to.name);
//       console.log("test");
//       next({ name: "login" });
//     } else {
//       console.log("how comes");
//       next();
//     }
//   } else {
//     localStorage.setItem("user", JSON.stringify([]));
//     next({ name: "login" });
//   }
// });

const app = createApp(Container);
app.use(VueAxios, axios); // 👈
app.use(router).mount("#app");
