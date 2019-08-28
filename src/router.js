import Vue from "vue"
import Router from "vue-router"
import EventList from "./views/EventList.vue"
import EventShow from "./views/EventShow.vue"
import EventCreate from "./views/EventCreate.vue"
import NotFound from "@/components/NotFound.vue"
import NetworkIssue from "@/components/NetworkIssue.vue"
import ExampleForm from "@/views/ExampleForm.vue"
import NProgress from "nprogress"
import store from "@/store/store"
Vue.use(Router)

//export default new Router({
const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "event-list",
      component: EventList,
      props: true
    },
    {
      path: "/create",
      name: "event-create",
      component: EventCreate
    },
    {
      path: "/event/:id",
      name: "event-show",
      component: EventShow,
      props: true,
      beforeEnter(routeTo, routefrom, next) {
        store
          .dispatch("event/fetchShowEvent", routeTo.params.id)
          .then(event => {
            routeTo.params.event = event
            next()
          })
          .catch(error => {
            if (error.response && error.response.status === 404) {
              next({
                name: "404",
                params: { resource: "event" }
              })
            } else {
              next({ name: "network-issue" })
            }
          })
      }
    },
    {
      path: "/exampleform",
      name: "example-form",
      component: ExampleForm
    },
    {
      path: "/404",
      name: "404",
      component: NotFound,
      props: true
    },
    {
      path: "/network-issue",
      name: "network-issue",
      component: NetworkIssue
    },
    {
      path: "*",
      redirect: { name: "404", params: { resource: "page" } }
    }
  ]
})
router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start()
  next()
})
router.afterEach(() => {
  NProgress.done()
})

export default router
