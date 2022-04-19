<template>
  <div>
    <sidebar />
    <div class="relative md:ml-64 bg-blueGray-100">
      <admin-navbar />

      <div class="px-10">
        <Nuxt/>
      </div>
    </div>
  </div>
</template>
<script>
import AdminNavbar from "@/components/Navbars/AdminNavbar.vue";
import Sidebar from "@/components/Sidebar/Sidebar.vue";
export default {
  components: {
    AdminNavbar,
    Sidebar,
  },
};
</script>
