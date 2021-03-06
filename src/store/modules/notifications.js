export const namespaced = true
export const state = {
  notifications: []
}

let nextId = 1

export const mutations = {
  PUSH(state, notification) {
    state.notifications.push({
      ...notification,
      id: nextId++
    })
  },
  DELETE(state, notificationToremove) {
    state.notifications = state.notifications.filter(
      notification => notification.id !== notificationToremove.id
    )
  }
}

export const actions = {
  add({ commit }, notification) {
    commit("PUSH", notification)
  },
  remove({ commit }, notificationToremove) {
    commit("DELETE", notificationToremove)
  }
}
