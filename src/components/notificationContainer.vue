<template>
  <div class="notification-container">
    <notificationBar
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
    />
  </div>
</template>

<script>
import notificationBar from "@/components/notificationBar.vue"
import { mapState } from "vuex"
export default {
  components: {
    notificationBar
  },
  computed: mapState("notification", ["notifications"])
}
</script>

<style scoped>
.notification-container {
  position: fixed;
  bottom: 0;
  right: 0;
  padding-right: 40px;
}
</style>