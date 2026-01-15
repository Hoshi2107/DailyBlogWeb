import { createRouter, createWebHistory } from "vue-router";
import DailyBlogHomePage from "../components/DailyBlogHomePage.vue";
import Login from "../components/Login.vue";
import Account from "../components/Account.vue";
import Register from "../components/Register.vue";
import EditPost from "../components/EditPost.vue";
import NewPost from "../components/NewPost.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: DailyBlogHomePage,
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
  {
    path: "/edit-post/:id",
    name: "EditPost",
    component: () => import("../components/EditPost.vue"),
    props: true,
  },
  {
    path: "/new-post",
    name: "NewPost",
    component: () => import("../components/NewPost.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach((to, from, next) => {
//   const user = localStorage.getItem("user");

//   if (to.path === "/new-post" && !user) {
//     alert("Bạn cần đăng nhập để tạo bài viết");
//     next("/login");
//   } else {
//     next();
//   }
// });

router.beforeEach((to, from, next) => {
  const user = localStorage.getItem("user");

  if (to.path === "/new-post" && !user) {
    next({
      path: "/login",
      query: { reason: "needLogin" },
    });
  } else {
    next();
  }
});

export default router;
