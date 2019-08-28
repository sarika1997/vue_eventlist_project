<template>
  <div>
    <p>Event List of {{user.user.name}}</p>
    <EventCard v-for="event in event.events" :key="event.id" :event="event" />
    <template v-if="page != 1">
      <router-link :to="{name:'event-list', query:{page:page - 1}}" rel="prev">prev</router-link>
      <template v-if="nextPage">|</template>
    </template>
    <template v-if="nextPage">
      <router-link :to="{name:'event-list', query:{page:page + 1}}" rel="next">next</router-link>
    </template>
  </div>
</template>
<script>
import EventCard from "@/components/EventCard.vue"
import { mapState } from "vuex"
import store from "@/store/store"

function getEventsPage(routeTo, next) {
  const currPage = parseInt(routeTo.query.page) || 1
  store
    .dispatch("event/fetchEvent", {
      page: currPage
    })
    .then(() => {
      routeTo.params.page = currPage
      next()
    })
}
export default {
  props: {
    page: {
      type: Number,
      required: true
    }
  },
  components: {
    EventCard
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    getEventsPage(routeTo, next)
  },
  beforeRouteUpdate(routeTo, routeFrom, next) {
    getEventsPage(routeTo, next)
  },
  /*created() {
    this.perPage = 3
    this.$store.dispatch("event/fetchEvent", {
      perPage: this.perPage,
      page: this.page
    })
  },*/
  computed: {
    /* page() {
      return parseInt(this.$route.query.page) || 1
    },*/
    nextPage() {
      return this.event.eventsTotal > this.page * this.event.perPage
    },
    ...mapState(["event", "user"])
  }
}
</script>