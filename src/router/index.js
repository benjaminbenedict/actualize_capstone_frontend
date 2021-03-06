import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import UserPlants from "../views/UserPlants.vue";
import PlantsShow from "../views/PlantsShow.vue";
import UserPlantsShow from "../views/UserPlantsShow.vue";
import Tables from "../views/Tables.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  { path: "/signup", name: "signup", component: Signup },
  { path: "/login", name: "login", component: Login },
  { path: "/logout", name: "logout", component: Logout },
  { path: "/userplants", name: "UserPlants", component: UserPlants },
  { path: "/plants/:id", name: "plants-show", component: PlantsShow },
  { path: "/userplants/:id", name: "userplants-show", component: UserPlantsShow },
  { path: "/tables", name: "tables", component: Tables },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
