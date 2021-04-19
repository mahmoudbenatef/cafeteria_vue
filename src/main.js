import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { createWebHistory, createRouter } from "vue-router";
import RegisterComponent from "@/components/RegisterComponent";
import Container from "@/components/Container";
import Handler from "@/components/Handler";
import HelloWorld from "@/components/HelloWorld";
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import LoginComponent from "@/components/LoginComponent";
import ManualOrderComponent from "@/components/ManualOrderComponent";

// Vue.use(VueAxios, axios)
const routes=[
     {path:'/',name: '/',component:HelloWorld},
    {path:'/register',name: 'register',component:RegisterComponent},
    {path:'/login',  name: 'login', component:LoginComponent},
    {path:'/manualOrder',component:ManualOrderComponent},
    {path:'/:catchAll(.*)',component:Handler}
];

const router = createRouter({history:createWebHistory(),routes});
const app = createApp(Container)
app.use(VueAxios, axios) // 👈
app.use(router).mount('#app')

// createApp(Container).use(router).mount('#app')