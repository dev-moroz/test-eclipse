import { createRouter, createWebHashHistory } from "vue-router"

import converterPage from "@/components/converterPage.vue"
import сurrenciesList from "@/components/сurrenciesList.vue"

const routes = [
  {
    name: "converter",
    path: "/converter/",
    component: converterPage,
  },
  {
    name: "home",
    path: "/",
    component: сurrenciesList,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
