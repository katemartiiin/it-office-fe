<template>
  <div>
    <sidebar />
    <div class="relative md:ml-64 bg-blueGray-100">
      <admin-navbar />

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
    Footer
  },
};
</script>
