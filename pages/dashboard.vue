<template>
  <div>
    <h1>Dashboard</h1>
    <button v-if="$auth.loggedIn" @click.prevent="logout()">logout</button>
  </div>
</template>
<script>
export default {
  data: () => ({}),
  mounted() {
    console.log(this.$auth.$storage.getCookies()['XSRF-TOKEN'])
  },
}
</script>
