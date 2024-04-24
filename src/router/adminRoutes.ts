import Apps from './Applications';
import Features from './FeaturesRoutes';

const routes = [
  {
    path: '',
    name: 'dashboard',
    component:  () => import('@/views/dashboard/Overview.vue'),
  },
  ...Apps,
  ...Features,
];

export default routes;
