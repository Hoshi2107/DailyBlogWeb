import { createRouter, createWebHistory } from "vue-router";
import DailyBlogHomePage from "../components/DailyBlogHomePage.vue";
import Login from "../components/Login.vue";
import Account from "../components/Account.vue";
import Register from "../components/Register.vue";
import EditPost from "../components/EditPost.vue";
import NewPost from "../components/NewPost.vue";
import PostDetail from "../components/PostDetail.vue";
import AdminLayout from "../components/admin/AdminLayout.vue";
import DashboardView from "../components/admin/DashboardView.vue";
import ManageComments from "../components/admin/ManageComments.vue";
import ManagePosts from "../components/admin/ManagePosts.vue";
import ManageUsers from "../components/admin/ManageUsers.vue";

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
  {
    path: "/posts/:id",
    name: "PostDetail",
    component: () => import("../components/PostDetail.vue"),
    scrollBehavior() {
      return { top: 0 };
    },
  },
  {
    path: "/dashboard",
    component: () => import("../components/admin/AdminLayout.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition; // khi bấm back sẽ giữ vị trí cũ
    }
    return { top: 0 }; // khi chuyển page mới thì lên đầu trang
  },
});

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
