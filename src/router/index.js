import Vue from "vue";
import VueRouter from "vue-router";

const Home = () => import("../views/Home.vue");
const About = () => import("../views/About.vue");
const Cart = () => import("../views/Cart.vue");
const Me = () => import("../views/Me.vue");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    component: About
  },
  {
    path: "/cart",
    name: "cart",
    component: Cart
  },
  {
    path: "/me",
    name: "me",
    component: Me
  }
];

const router = new VueRouter({
  routes
});

export default router;
