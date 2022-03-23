import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("../views/front/IndexView.vue"),
    meta: {
      breadcrumb: [
        {
          name: "ホームページ",
        },
      ],
    },
  },
  {
    path: "/",
    component: () => import("../views/FrontView.vue"),
    children: [
      {
        path: "products",
        component: () => import("@/views/front/ProductsView.vue"),
        meta: {
          breadcrumb: [
            {
              name: "ホームページ",
              link: "/",
            },
            {
              name: "お寿司",
            },
          ],
        },
      },
      {
        path: "prod/:id",
        component: () => import("@/views/front/ProdView.vue"),
        meta: {
          breadcrumb: [
            {
              name: "ホームページ",
              link: "/",
            },
            {
              name: "お寿司",
              link: "/products",
            },
          ],
        },
      },
      {
        path: "myOrders",
        component: () => import("@/views/front/MyOrdersView.vue"),
        meta: {
          breadcrumb: [
            {
              name: "ホームページ",
              link: "/",
            },
            {
              name: "私の注文",
            },
          ],
        },
      },
      {
        path: "cart",
        component: () => import("@/views/front/CartView.vue"),
        meta: {
          breadcrumb: [
            {
              name: "ホームページ",
              link: "/",
            },
            {
              name: "ショッピングカート",
            },
          ],
        },
      },
      {
        path: "favorite",
        component: () => import("@/views/front/FavoriteView.vue"),
      },
    ],
  },
  {
    path: "/checkout",
    component: () => import("@/views/CheckOutView.vue"),
    children: [
      {
        path: "",
        components: {
          left: () => import("@/views/front/CartContentView.vue"),
          right: () => import("@/views/front/FormView.vue"),
        },
      },
      {
        path: "pay/:id",
        components: {
          left: () => import("@/views/front/OrderCartContentView.vue"),
          right: () => import("@/views/front/ConfirmFormView.vue"),
        },
      },
    ],
  },
  {
    path: "/finished/:id",
    component: () => import("@/views/front/FinishedView.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/views/NotFound.vue"),
  },
  {
    path: "/login",
    component: () => import("@/views/LoginView.vue"),
  },
  {
    path: "/admin",
    component: () => import("@/views/DashboardView.vue"),
    children: [
      {
        path: "",
        component: () => import("@/views/end/AdminProdsView.vue"),
      },
      {
        path: "/admin-orders",
        component: () => import("@/views/end/AdminOrdersView.vue"),
      },
      {
        path: "/admin-coupons",
        component: () => import("@/views/end/AdminCouponsView.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "active",
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: to.meta.savedPosition || 0 };
    }
  },
});

export default router;
