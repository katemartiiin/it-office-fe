<template>
  <!-- Navbar -->
  <nav
    class="top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4"
  >
    <div
      class="w-full mx-auto justify-between items-center flex md:flex-nowrap flex-wrap md:px-10 px-4"
    >
      <!--   -->
      <!-- Brand -->
      <div class="flex flex-row">
        <h1 v-if="title" class="text-3xl font-bold text-slate-600 mt-5">
          Dashboard
        </h1>
      </div>

      <div class="justify-items-end">
        <div><span></span></div>
      </div>
      <!-- Form -->
      <!-- <form
        class="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3"
      >
        <div class="relative flex w-full flex-wrap items-stretch">
          <span
            class="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3"
          >
            <i class="fas fa-search"></i>
          </span>
          <input
            type="text"
            placeholder="Search here..."
            class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
          />
        </div>
      </form> -->

      <ul class="flex-col md:flex-row list-none items-center hidden md:flex">
        <template v-if="$nuxt.$route.path == '/dashboard'">
          <notification-dropdown :notification_rows="notification_rows" />
        </template>
        <span class="font-semibold text-slate-600 py-2 px-4">
          Hi, <span class="font-bold text-red-800">{{ $auth.user['email'] }}</span>
        </span>
        <user-dropdown />
      </ul>
    </div>
  </nav>
  <!-- End Navbar -->
</template>

<script>
import UserDropdown from '@/components/Dropdowns/UserDropdown.vue'
import NotificationDropdown from '@/components/Dropdowns/NotificationDropdown.vue'

export default {
  props: ['notification_rows', 'title'],
  components: {
    UserDropdown,
    NotificationDropdown,
  },
}
</script>
