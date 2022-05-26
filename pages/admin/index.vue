<template>
  <div>
    <!-- <h1 class="text-3xl font-bold">Dashboard</h1> -->
    <!-- <header-stats /> -->
  </div>
</template>
<script>
// import HeaderStats from "@/components/Partials/HeaderStats.vue";
export default {
  head() {
    return {
      title: 'Admin',
      meta: [
        {
          hid: '',
          name: '',
          content: '',
        },
      ],
    }
  },
  data: () => ({}),
  middleware: 'auth',

  layout: 'admininistrator',
}
</script>
