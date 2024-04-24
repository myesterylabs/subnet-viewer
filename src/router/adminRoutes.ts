
const routes = [
  {
    path: '',
    name: 'dashboard',
    component:  () => import('@/views/dashboard/Overview.vue'),
  },
  {
    path: '/subnets',
    name: 'subnets',
    component:  () => import('@/views/subnets/All.vue'),
  },
  {
    name: "ecommerce",
    path: "/app",
    component: () => import('@/views/apps/ecommerce/Index.vue'),
    children: [
      {
        path: "ecommerce",
        name: "ecommerce-product",
        component: () => import("@/views/apps/ecommerce/product/Products.vue"),
        children: [
          {
            name: "product",
            path: "product",
            component: () =>
              import("@/views/apps/ecommerce/product/Products.vue"),
          },
          {
            name: "pro-grid",
            path: "product/grid",
            components: {
              default: () =>
                import("../views/apps/ecommerce/product/Products.vue"),
              grid: () =>
                import("../views/apps/ecommerce/product/overview/Grid.vue"),
            },
          },
          {
            name: "pro-list",
            path: "product/list",
            components: {
              default: () =>
                import("../views/apps/ecommerce/product/Products.vue"),
              grid: () =>
                import("../views/apps/ecommerce/product/overview/List.vue"),
            },
          },
        ],
      },
      {
        name: "detail",
        path: "ecommerce/productDetails/:id",
        component: () =>
          import("../views/apps/ecommerce/product/ProductDetails.vue"),
      },
      {
        name: "add-product",
        path: "ecommerce/add-product",
        component: () =>
          import("../views/apps/ecommerce/product/AddProduct.vue"),
      },
      {
        name: "edit-product",
        path: "ecommerce/edit-product",
        component: () =>
          import("../views/apps/ecommerce/product/EditProduct.vue"),
      },
      {
        name: "orders",
        path: "ecommerce/orders",
        component: () => import("../views/apps/ecommerce/Orders.vue"),
      },
    ],
  },
  {
    path: '/chart',
    name: 'charts',
    component: () => import('@/views/charts/Index.vue'),
    children: [
      {
        path: 'google-chart',
        name: 'googleChart',
        component: () => import('@/views/charts/GoogleCharts.vue'),
      },
      {
        path: 'chart-js',
        name: 'chart-js',
        component: () => import('@/views/charts/ChartJs.vue'),
      },
    ],
  },
];

export default routes;
