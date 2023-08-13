import { createRouter, createWebHistory } from "vue-router";
import App from "../App.vue";
import StartView from "../views/StartView.vue";
import UserView from "../views/UserView.vue";
import EntryPage from "../pages/EntryPage.vue";
import RegPage from "../pages/RegPage.vue";
import MessPage from "../pages/MessPage.vue";
import SearchPage from "../pages/SearchPage.vue";
import SettPage from "../pages/SettPage.vue";
import DialogPage from "../pages/DialogPage.vue";

const routes = [
  {
    path: "/",
    name: "app",
    component: App,
  },
  {
    path: "/start",
    name: "start",
    component: StartView,
    children: [
      {
        path: "entry",
        name: "entry",
        component: EntryPage,
      },
      {
        path: "registration",
        name: "reg",
        component: RegPage,
      },
    ],
  },
  {
    path: "/user",
    name: "user",
    component: UserView,
    children: [
      {
        path: "messages",
        name: "mess",
        component: MessPage,
      },
      {
        path: "settings",
        name: "sett",
        component: SettPage,
      },
      {
        path: "search",
        name: "search",
        component: SearchPage,
      },
      {
        path: "dialog&id=:id",
        name: "dialog",
        component: DialogPage,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
