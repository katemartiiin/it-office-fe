<template>
  <div>
    <sidebar />
    <div class="relative md:ml-64 bg-blueGray-100">
      <div class="bg-emerald-300">
        <admin-navbar :title="false"/>
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
import Sidebar from "@/components/Sidebar/Sidebar.vue";
import Footer from "@/components/Partials/Footer.vue";
export default {
  components: {
    AdminNavbar,
    Sidebar,
    Footer,
  },
};
</script>
<style scoped>
.bg-emerald-300 {
    --tw-bg-opacity: 0.15;
    background-color: rgba(51, 65, 85,var(--tw-bg-opacity));
}
</style>