import { createRouter, createWebHistory } from "vue-router";

import type { RouteRecordRaw } from "vue-router";
import adminRoutes from "./adminRoutes";
import authRoutes from "./authRoutes";
import store from "@/vuex/store";

const stores: any = store;
const routes: Array<RouteRecordRaw> = [
  {
    name: "Admin",
    path: "/",
    component: () => import("../layout/AdminLayout.vue"),
    children: [...adminRoutes],
    meta: { requiresAuth: true },
  },
  {
    name: "Auth",
    path: "/auth",
    component: () => import("../layout/AuthLayout.vue"),
    children: [...authRoutes],
    meta: { requiresAuth: false },
  },
];

const router = createRouter({
  history: createWebHistory(),
  linkExactActiveClass: "active",
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !stores.state.auth.account) {
    next({ name: "login" });
  }
  //  redirect logged in user from open route to dashboard
  else if (!to.meta.requiresAuth && stores.state.auth.account) {
    next({ name: "dashboard" });
  } else {
    next();
  }
  window.scrollTo(0, 0); // reset scroll position to top of page
});

export default router;
