import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/login",
    name: "Login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue")
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue")
  },
  {
    path: "/bootcamps",
    name: "bootcamps",
    component: () => import("../views/bootcamp/Bootcamps.vue")
  },
  {
    path: "/bootcamps/:id",
    name: "view-bootcamp",
    component: () => import("../views/bootcamp/Bootcamp.vue")
  },
  {
    path: "/review/add",
    name: "add-review",
    component: () => import("../views/review/AddReview.vue")
  },
  {
    path: "/reviews",
    name: "reviews",
    component: () => import("../views/review/Reviews.vue")
  },
  {
    path: "/password/reset",
    name: "reset-password",
    component: () => import("../views/ResetPassword.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
