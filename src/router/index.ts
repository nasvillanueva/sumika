import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: async () => import("@/views/Top/TopView.vue"),
    },
  ],
});

export default router;
