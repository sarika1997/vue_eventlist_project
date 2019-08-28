import EventService from "@/services/EventService.js"

export const namespaced = true

export const state = {
  events: [],
  eventsTotal: 0,
  event: {},
  perPage: 3
}
export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event)
  },
  SET_EVENT(state, events) {
    state.events = events
  },
  SET_EVENT_TOTAL(state, eventsTotal) {
    state.eventsTotal = eventsTotal
  },
  SET_SHOW_EVENT(state, event) {
    state.event = event
  }
}
export const actions = {
  createEvent({ commit, dispatch }, event) {
    return EventService.postEvent(event)
      .then(() => {
        commit("ADD_EVENT", event)
        const notification = {
          type: "success",
          message: "your event has been created!"
        }
        dispatch("notification/add", notification, { root: true })
      })
      .catch(error => {
        const notification = {
          type: "error",
          message: "there's a problem creating event: " + error.message
        }
        dispatch("notification/add", notification, { root: true })
        throw error
      })
  },
  fetchEvent({ commit, dispatch, state }, { /*perPage,*/ page }) {
    return EventService.getEvents(state.perPage, page)
      .then(response => {
        commit("SET_EVENT_TOTAL", parseInt(response.headers["x-total-count"]))
        commit("SET_EVENT", response.data)
      })
      .catch(error => {
        const notification = {
          type: "error",
          message: "there was a prpoblem in fetching events:" + error.message
        }
        dispatch("notification/add", notification, { root: true })
      })
  },
  fetchShowEvent({ commit, getters /* dispatch */ }, id) {
    var event = getters.getEventById(id)
    if (event) {
      commit("SET_SHOW_EVENT", event)
      return event
    } else {
      return EventService.getEvent(id).then(response => {
        commit("SET_SHOW_EVENT", response.data)
        return response.data
      })
      /*.catch(error => {
        const notification = {
          type: "error",
          message: "there was a prpoblem in fetching event:" + error.message
        }
        dispatch("notification/add", notification, { root: true })
      })*/
    }
  }
}

export const getters = {
  getEventById: state => id => {
    return state.events.find(event => event.id === id)
  }
}
