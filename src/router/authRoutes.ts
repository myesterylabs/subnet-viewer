const routes = [
  {
    path: 'login',
    name: 'login',
    component: () => import('@/views/authentication/SignIn.vue'),
  },
  {
    path: 'register',
    name: 'register',
    component: () => import('@/views/authentication/Signup.vue'),
  }
];

export default routes;
