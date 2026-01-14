import { createRouter, createWebHistory } from "vue-router";
import DailyBlogHomePage from "../components/DailyBlogHomePage.vue";
import Posts from "../components/Posts.vue";
import Login from "../components/Login.vue";

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
