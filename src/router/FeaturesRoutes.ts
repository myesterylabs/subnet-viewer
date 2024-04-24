export default [
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
