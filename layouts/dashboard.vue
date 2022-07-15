<template>
  <div>
    <sidebar />
    <div class="relative md:ml-64 bg-blueGray-100">
      <div class="bg-slate-200">
        <admin-navbar :title="false" />
      </div>
      <div class="px-2 2xl:px-10 xl:px-5 lg:px-5 md:px-5 sm:px-5">
        <Nuxt />
        <Footer />
      </div>
    </div>
  </div>
</template>
<script>
import AdminNavbar from '@/components/Navbars/AdminNavbar.vue'
import Sidebar from '@/components/Sidebar/Sidebar.vue'
import Footer from '@/components/Partials/Footer.vue'
export default {
  head: () => ({
    titleTemplate: '%s - Financial Assistance',
    meta: [{ hid: 'description', name: 'description', content: 'Content' }],
  }),
  components: {
    AdminNavbar,
    Sidebar,
    Footer,
  },
}
</script>
<style scoped>
.bg-emerald-300 {
  --tw-bg-opacity: 0.15;
  background-color: rgba(51, 65, 85, var(--tw-bg-opacity));
}
</style>
