<template>
  <div>
    <sidebar />
    <div class="relative md:ml-64 bg-blueGray-100">
      <div class="bg-emerald-600">
        <admin-navbar />
        <header-stats />
      </div>

      <div class="px-10">
        <Nuxt/>
        <Footer />
      </div>
    </div>
  </div>
</template>
<script>
import AdminNavbar from "@/components/Navbars/AdminNavbar.vue";
import Sidebar from "@/components/Sidebar/Sidebar_admin.vue";
import Footer from "@/components/Partials/Footer.vue";
import HeaderStats from "@/components/Partials/HeaderStats.vue";
export default {
  components: {
    AdminNavbar,
    Sidebar,
    Footer,
    HeaderStats
  },
};
</script>
<style scoped>
.bg-emerald-600 {
    --tw-bg-opacity: 1;
    background-color: rgba(5,150,105,var(--tw-bg-opacity));
}
</style>
