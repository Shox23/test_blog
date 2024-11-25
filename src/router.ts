import { createRouter, createWebHistory } from "vue-router";
import Home from "./pages/Home.vue";

const routes = [
  {
    name: "Home",
    path: "/",
    component: Home,
  },
  {
    name: "Post",
    path: "/post/:id",
    component: () => import("./pages/Post.vue"),
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
