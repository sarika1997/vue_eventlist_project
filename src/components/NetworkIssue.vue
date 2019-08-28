<template>
  <div>
    <h1>Uh-Oh!</h1>
    <h3>It looks like you're experiencing some network issues, please click back and try again</h3>
    <router-link :to="{name:'event-list'}">Back to all events</router-link>
  </div>
</template>
    <script>
export default {
  props: {
    resource: {
      type: String,
      required: true
    }
  }
}
</script>