<template>
  <div class="h-screen md:flex">
    <Header />
    <Nuxt />
  </div>
</template>

<script>
import Header from '@/components/Partials/Header.vue'
export default {
  head: () => ({
    titleTemplate: '%s -  Financial Assistance',
    meta: [{ hid: 'description', name: 'description', content: 'Content' }],
  }),
  components: {
    Header,
  },
}
</script>
