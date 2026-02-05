import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("../views/front/IndexView.vue"),
    meta: {
      breadcrumb: [
        {
          name: "ホーム"
        }
      ]
    }
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
              name: "ホーム",
              link: "/"
            },
            {
              name: "お寿司のメニュー"
            }
          ]
        }
      },
      {
        path: "prod/:id",
        component: () => import("@/views/front/ProdView.vue"),
        meta: {
          breadcrumb: [
            {
              name: "ホーム",
              link: "/"
            },
            {
              name: "お寿司のメニュー",
              link: "/products"
            }
          ]
        }
      },
      {
        path: "myOrders",
        component: () => import("@/views/front/MyOrdersView.vue"),
        meta: {
          breadcrumb: [
            {
              name: "ホーム",
              link: "/"
            },
            {
              name: "注文履歴"
            }
          ]
        }
      },
      {
        path: "favorite",
        component: () => import("@/views/front/FavoriteView.vue")
      },
      {
        path: "cart",
        component: () => import("@/views/front/CartView.vue"),
        meta: {
          breadcrumb: [
            {
              name: "ホーム",
              link: "/"
            },
            {
              name: "カート"
            }
          ]
        }
      },
      {
        path: "privacy",
        component: () => import("@/views/front/PrivacyView.vue"),
        meta: {
          breadcrumb: [
            {
              name: "ホーム",
              link: "/"
            },
            {
              name: "プライバシーポリシー"
            }
          ]
        }
      },
      {
        path: "service",
        component: () => import("@/views/front/ServiceView.vue"),
        meta: {
          breadcrumb: [
            {
              name: "ホーム",
              link: "/"
            },
            {
              name: "利用規約"
            }
          ]
        }
      },
      {
        path: "questions",
        component: () => import("@/views/front/QuestionsView.vue"),
        meta: {
          breadcrumb: [
            {
              name: "ホーム",
              link: "/"
            },
            {
              name: "よくあるご質問"
            }
          ]
        }
      }
    ]
  },
  {
    path: "/checkout",
    component: () => import("@/views/CheckOutView.vue"),
    children: [
      {
        path: "",
        components: {
          left: () => import("@/views/front/CartContentView.vue"),
          right: () => import("@/views/front/FormView.vue")
        }
      },
      {
        path: "pay/:id",
        components: {
          left: () => import("@/views/front/OrderCartContentView.vue"),
          right: () => import("@/views/front/ConfirmFormView.vue")
        }
      }
    ]
  },
  {
    path: "/finished/:id",
    component: () => import("@/views/front/FinishedView.vue")
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/views/NotFound.vue")
  },
  {
    path: "/login",
    component: () => import("@/views/LoginView.vue")
  },
  {
    path: "/admin",
    component: () => import("@/views/DashboardView.vue"),
    children: [
      {
        path: "",
        component: () => import("@/views/end/AdminProdsView.vue")
      },
      {
        path: "/admin-orders",
        component: () => import("@/views/end/AdminOrdersView.vue")
      },
      {
        path: "/admin-coupons",
        component: () => import("@/views/end/AdminCouponsView.vue")
      }
    ]
  }
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
      return { left: 0, top: to.meta.savedPosition || 0 };
    }
  }
});

export default router;
