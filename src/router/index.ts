import { createRouter, createWebHistory } from "vue-router";

import type { RouteRecordRaw } from "vue-router";
import adminRoutes from "./adminRoutes";
import authRoutes from "./authRoutes";
import store from "@/vuex/store";

//@ts-ignore

const stores: any = store;
const routes: Array<RouteRecordRaw> = [
  {
    name: "App",
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

router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth && !stores.state.auth.account) {
    // @ts-ignore
    next({ name: "login" });
  }
  //  redirect logged in user from open route to dashboard
  else if (!to.meta.requiresAuth && stores.state.auth.account) {
    // @ts-ignore
    next({ name: "dashboard" });
  } else {
    // @ts-ignore
    next();
  }
  window.scrollTo(0, 0); // reset scroll position to top of page
});

export default router;
