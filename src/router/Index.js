// import { createRouter, createWebHistory } from "vue-router";
// import Home from "../views/Home.vue";
// import Login from "../views/Login.vue";
// import CreatePost from "../views/CreatePost.vue";
// import PostDetail from "../views/PostDetail.vue";

// const routes = [
//   { path: "/", component: Home },
//   { path: "/Login", component: Login },
//   { path: "/Create", component: CreatePost },
//   { path: "/Post/:id", component: PostDetail },
// ];

// export default createRouter({
//   history: createWebHistory(),
//   routes,
// });
import { createRouter, createWebHistory } from "vue-router";
import DailyBlogHomePage from "../components/DailyBlogHomePage.vue";
import Posts from "../components/Posts.vue";
import Login from "../components/Login.vue";

const routes = [
  {
    path: "/home",
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
