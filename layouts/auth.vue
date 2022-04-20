<template>
  <div class="h-screen md:flex">
    <Header />
    <Nuxt/>
  </div>
</template>

<script>
import Header from '@/components/Partials/Header.vue'
export default {
  components: {
    Header,
  },
}
</script>
