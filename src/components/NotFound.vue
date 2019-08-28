<template>
  <div>
    <h1>Ooops!</h1>
    <h3>the {{resource}} you are searching for doesn't exist</h3>
    <router-link :to="{name:'event-list'}">Back to home page</router-link>
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

<style>
</style>