import { createRouter, createWebHistory } from "vue-router";
import DailyBlogHomePage from "../components/DailyBlogHomePage.vue";
import Posts from "../components/Posts.vue";
import Login from "../components/Login.vue";
import Account from "../components/Account.vue";
import Register from "../components/Register.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: DailyBlogHomePage,
  },
  {
    path: "/posts",
    name: "Posts",
    component: Posts,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/account",
    name: "Account",
    component: () => import("../components/Account.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../components/Register.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
